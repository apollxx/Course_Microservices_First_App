const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios')

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};


app.get('/posts', (req,res) => {
    res.send(posts);
});

const handleEvent = (type, data) => {
    console.log("Received Event", type);
    if(type === 'PostCreated'){
        const {id, title} = data;

        posts[id] = {id, title, comments: []};
    };

    if(type === 'CommentCreated'){
        const {id, content, postId, status} = data;

        const post = posts[postId];
        post.comments.push({id, content, status});
    };

    if(type === 'CommentUpdated'){
        const { id, postId, comment } = data;
        const commentIndex = posts[postId].comments.findIndex(c => c.id === id);
        posts[postId].comments[commentIndex]=comment
    }

}

app.post('/events', (req,res) => {
    const {type, data} = req.body;

    handleEvent(type,data);

    res.send({});
});

app.listen(4002, async () => {
    console.log("Listening on Port: 4002");

    try{
        const res = await axios.get('http://event-bus-srv:4005/events');
  
        for (let event of res.data){
            console.log("Processing event:", event.type);
    
            handleEvent(event.type, event.data);
        }
    }catch(e){
        console.log(e)
    }

});
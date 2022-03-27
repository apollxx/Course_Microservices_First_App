import React, {useState, useEffect} from 'react'
import axios from 'axios'


function CommentList({comments}){
 /*    const [postComments, setPostComments] = useState([])

    useEffect(() => {
        fetchComments()
    }, [])

    async function fetchComments(){
        const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
        setPostComments(res.data);
    } */

    function renderComments(){
        return <ul>{comments.map(c => <li key={c.id}>{c.content}</li>)}</ul>
    }

    return (
        <div>
            <i><span>{comments.length} comments</span></i>
            {renderComments()}
        </div>
    )
};

export default CommentList;
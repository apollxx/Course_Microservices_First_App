import React from 'react'

function CommentList({comments}){

    function renderComments(){
        return <ul>{comments.map(c => <li key={c.id}>{moderateComment(c)}</li>)}</ul>
    }

    function moderateComment(c){
        if(c.status === "aproved") return c.content;
        if(c.status === "rejected") return <b>"Blocked Comment (violation of the rules -#1234)"</b>;
        if(c.status === "pending") return "Comment Awaiting Moderation";
    }

    return (
        <div>
            <i><span>{comments.length} comments</span></i>
            {renderComments()}
        </div>
    )
};

export default CommentList;
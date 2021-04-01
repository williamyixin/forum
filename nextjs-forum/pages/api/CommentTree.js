import React from "react";
import Comment from "./Comment";

export default class CommentTree extends React.Component {
  constructor(props) {
    super(props);
    this.testVarible= "This is where a comment will go. This is just a placeholder. This is where a comment will go. This is just a placeholder. This is where a comment will go. This is just a placeholder. This is where a comment will go. This is just a placeholder. This is where a comment will go. This is just a placeholder. This is where a comment will go. This is just a placeholder. This is where a comment will go. This is just a placeholder. This is where a comment will go. This is just a placeholder. This is where a comment will go. This is just a placeholder.";
    this.contenttest1= "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway"
    
    this.testjson = {
      "creator": "happybanditman",
      "path": "",
      "upvotes": 2500,
      "downvotes": 100,
      "score": 2400,
      "content": "That moment when they realize that the person who died on the water planet had probably only died minutes ago, that was something I had never considered until I heard them say it. That was a big oh shit moment for me",
    }
  }

  render() {
    return <div>
            <Comment creator={this.testjson.creator} path={this.testjson.path} upvotes={this.testjson.upvotes} downvotes={this.testjson.downvotes} score={this.testjson.score} content={this.testjson.content}/>
            <Comment creator="Oski da Bear" content={this.contenttest1} upvotes={5} downvotes={10}/>
            <div style={{marginLeft: '100px'}}>
              <Comment creator="Me" content={this.testVarible}/>
              <Comment creator="Me" content={this.testVarible}/>
            </div>
          </div>
  }z
}

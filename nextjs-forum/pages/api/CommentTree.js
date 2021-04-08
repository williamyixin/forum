import React from "react";
import Comment from "./Comment";

export default class CommentTree extends React.Component {
  constructor(props) {
    super(props);
  }

  // Recursion heals the soul - Takes in 1 prop: this.props.json (array type)
  render() {
    return <div>
        {this.props.json && this.props.json.map(block => (
          <div>
            <Comment topic={block.topic} creator={block.creator} path={block.path} upvotes={block.upvotes} downvotes={block.downvotes} score={block.score} content={block.content}/>
            <div style={{marginLeft: '100px'}}>
              <CommentTree json={block.comments} />
            </div>
          </div>
        ))}
          </div>
  }
}

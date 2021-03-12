import React from "react";
import Header from "./Header";
import Title from "./Title";
import CommentTree from "./CommentTree";
import StartPost from "./StartPost";

export default class Page extends React.Component {
  render() {
    return (
      <div className="background">
        <Header />
        <Title />
        <StartPost />
        <CommentTree />
      </div>
    );
  }
}

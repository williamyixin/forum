import React from "react";
import Header from "./Header";
import Title from "./Title";
import CommentTree from "./CommentTree";

export default class Page extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Title />
        <CommentTree />
      </div>
    );
  }
}

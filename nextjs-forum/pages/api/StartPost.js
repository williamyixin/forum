import React from "react";
import { Form } from "react-bootstrap";

export default class StartPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }

  updateText = (e, val) => {
    this.setState({ text: val });
  };

  render() {
    return (
      <div
        style={{
          borderRadius: 5,
          width: "50vw",
          backgroundColor: "#FFFFFF",
          padding: "10px",
          margin: "30px",
        }}
      >
        <h3>YourUserNameHere</h3>
        <Form.Control
          onChange={this.updateText}
          val={this.state.text}
          style={{ backgroundColor: "#F0F0F0" }}
          placeholder="What's new? Start a new post!"
        />
      </div>
    );
  }
}

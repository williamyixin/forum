import React from "react";
import Image from "next/image";
import { Button, Row, Col, Form } from "react-bootstrap";

export default class StartPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }

  /* Updates the text in the state. */
  updateText = (e) => {
    this.setState({ text: e.target.value });
  };

  /* Sends a request to the backend. */
  sendPost = () => {
    console.log(this.state.text);

    /* UNCOMMENT BELOW */

    // fetch("http://localhost:3000/postMessage", {
    //   method: "post",
    //   body: JSON.stringify({text: this.state.text}), //replace with schema
    // }).then(function (response) {
    //   console.log(response.json());
    // });
  };

  render() {
    return (
      <div
        style={{
          padding: "15px",
          borderRadius: 5,
          backgroundColor: "#FFFFFF",
          maxWidth: "74vw",
          marginLeft: "40px",
          marginTop: "25px",
        }}
      >
        <Col>
          <Row>
            <Image src="/prof-pic.png" width={35} height={10} />
            <h4 style={{ marginLeft: "15px" }}>YourUserNameHere</h4>
          </Row>
          <Row style={{ height: "5px" }} />
          <Row>
            <Form.Control
              onChange={this.updateText}
              val={this.state.text}
              style={{
                backgroundColor: "#E5EBEB",
                marginRight: "15px",
                width: "85%",
                marginTop: "10px",
              }}
              placeholder="What's new? Start a new post!"
            />
            <Button
              onClick={this.sendPost}
              style={{
                height: "50%",
                marginTop: "10px",
              }}
            >
              Post
            </Button>
          </Row>
        </Col>
      </div>
    );
  }
}

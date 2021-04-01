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

    // fetch("http://localhost:3000/", {
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
          maxWidth: "75vw",
        }}
      >
        <Col>
          <Row>
            <Image src="/prof-pic.png" width={40} height={30} />
            <h3 style={{ marginLeft: "20px" }}>YourUserNameHere</h3>
          </Row>

          <Form.Control
            onChange={this.updateText}
            val={this.state.text}
            style={{ backgroundColor: "#F0F0F0", margin: "15px 0 15px 0" }}
            placeholder="What's new? Start a new post!"
            rows="5"
          />
          <Row>
            <Button onClick={this.sendPost}>Post</Button>
          </Row>
        </Col>
      </div>
    );
  }
}

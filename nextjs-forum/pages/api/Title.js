import React from "react";
import Image from "next/image";
import { Button, Row, Col, Form } from "react-bootstrap";

export default class Title extends React.Component {
  constructor(props) {
    super(props);
    this.title = {
      "topic": "Interstellar",
      "description": "In Earth's future, a global crop blight and second Dust Bowl are slowly rendering the planet uninhabitable. Professor Brand (Michael Caine), a brilliant NASA physicist, is working on plans to save mankind by transporting Earth's population to a new home via a wormhole. But first, Brand must send former NASA pilot Cooper (Matthew McConaughey) and a team of researchers through the wormhole and across the galaxy to find out which of three planets could be mankind's new home."
    }
  }


  render() {
    return (
      <div
        style={{
          display: "inline-block",
          maxWidth: "75vw",
          height: "230px",
          background: "white",
          marginTop: "30px",
          marginLeft: "40px",
          borderRadius: 5,
        }}
      >
        <div style={{marginLeft: "15px", marginTop: "15px"}}>
          <div style={{color: "#617A93", fontWeight: "bold",}}>
            <h1>{this.title.topic}</h1>
          </div>
          <div style={{color: "#5888B7",}}>
            <p>{this.title.description}</p>
          </div>
          <div style={{color: "#0B76E0"}}>
            <h4>121 comments</h4>
          </div>
        </div>
      </div>
    );
  }
}

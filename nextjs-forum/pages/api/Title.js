import React from "react";
import Image from "next/image";
import { Button, Row, Col, Form } from "react-bootstrap";

export default class StartPost extends React.Component {
  render() {
    return (
      <div
        style={{
          display: "inline-block",
          maxWidth: "75vw",
          height: "220px",
          background: "white",
          marginTop: "30px",
          borderRadius: 5,
        }}
      >
        <div style={{marginLeft: "15px", marginTop: "15px"}}>
          <div style={{color: "#617A93", fontWeight: "bold",}}>
            <h1>Movie Title Here: The Movie</h1>
          </div>
          <div style={{color: "#5888B7",}}>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
          </div>
          <div style={{color: "#0B76E0"}}>
            <h4>121 comments</h4>
          </div>
        </div>
      </div>
    );
  }
}

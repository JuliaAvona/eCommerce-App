import './Error.module.css';
import {Nav} from "react-bootstrap";
import {Pages} from "../../types/enums";
import React from "react";

const Error = () => {
  return (
      <>
        <div className="mt=20">Error Page 404</div>;
        <Nav className="me-auto">
          <Nav.Link href={Pages.main}>Home</Nav.Link>
        </Nav>
      </>
      )
};

export default Error;

import React from "react";
import Button from 'react-bootstrap/Button';
import "./ConnectMetamask.css";

const ConnectMetamask = (props) => {
  return (
    <div className="connect-container">
      <div className="not-connected-text">
        You are not connected to Metamask. Please connect to use the application
      </div>
      <Button variant="primary" className="connect-button" onClick={props.onClick}>
        Connect to Metamask
      </Button>
    </div>
  );
};

export default ConnectMetamask;

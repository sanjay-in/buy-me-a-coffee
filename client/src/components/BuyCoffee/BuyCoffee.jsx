import React, { useState } from "react";
import { ethers } from "ethers";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { Table } from "react-bootstrap";
import "./BuyCoffee.css";

const BuyCoffee = ({ isBuyingCoffee, onClick }) => {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [amount, setAmount] = useState(null);
  return (
    <div>
      <Form className="buy-coffee-container" onSubmit={onClick}>
        <Form.Control
          type="text"
          className="name-text field"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <Form.Control
          type="number"
          className="eth-amount field"
          min={0}
          placeholder="ETH Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <br />
        <Form.Control
          as="textarea"
          className="textarea field"
          rows={2}
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <br />
        <button
          className="buy-coffee-button"
          type="submit"
          disabled={isBuyingCoffee}
        >
          {isBuyingCoffee ? (
            <Spinner animation="border" role="status" size="sm" ></Spinner>
          ) : (
            <div>
              {" "}
              Buy Coffee
              <i className="fa fa-coffee" aria-hidden="true"></i>
            </div>
          )}
        </button>
      </Form>
      <div className="history-table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Message</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td colSpan={2}>Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
        <button className="view-messages">
          <i className="fa fa-expand" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
};

export default BuyCoffee;

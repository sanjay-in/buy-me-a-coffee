import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ethers } from "ethers";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { Table } from "react-bootstrap";
import "./BuyCoffee.css";

const BuyCoffee = ({ isBuyingCoffee, onClick, memos }) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState("");

  const copyText = (text) => {
    navigator;
    toast.success("Copied address to clipboard", { id: "clipboard" });
  };

  return (
    <div>
      <Form className="buy-coffee-container" onSubmit={(e) => onClick(e, name, message, amount)}>
        <Form.Control type="text" className="name-text field" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <br />
        <Form.Control
          type="number"
          className="eth-amount field"
          min={0}
          placeholder="ETH Amount"
          value={amount}
          step={0.00001}
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
        <button className="buy-coffee-button" type="submit" disabled={isBuyingCoffee}>
          {isBuyingCoffee ? (
            <Spinner animation="border" role="status" size="sm"></Spinner>
          ) : (
            <div>
              {" "}
              Buy Coffee
              <i className="fa fa-coffee" aria-hidden="true"></i>
            </div>
          )}
        </button>
      </Form>
      {memos && memos.length ? (
        <div className="history-table">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th colSpan={2}>Message</th>
                <th>Amount</th>
                <th>Sender Address</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {memos.map((memo, index) => {
                console.log(typeof memo, index + 1);
                let [address, name, message, amount, timestamp] = memo;
                const maskedAddress = address.substring(0, 8) + "..." + address.substring(address.length - 5, address.length);
                timestamp = new Date(Number(timestamp) * 1000).toLocaleString();
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{name}</td>
                    <td colSpan={2}>{message}</td>
                    <td>{ethers.formatEther(amount)} ETH</td>
                    <td>
                      {maskedAddress} <i className="fa fa-clipboard" aria-hidden="true" onClick={() => copyText(address)} />
                    </td>
                    <td>{timestamp}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          {memos.length > 3 ? (
            <button className="view-messages">
              <i className="fa fa-expand" aria-hidden="true"></i>
            </button>
          ) : null}
        </div>
      ) : memos && memos.length === 0 ? (
        <div className="no-history-message">No transaction history available.</div>
      ) : (
        <div className="loading-table">
          <Spinner animation="border" variant="secondary"></Spinner>
          <div className="loading-history-message">Loading transaction history</div>
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default BuyCoffee;

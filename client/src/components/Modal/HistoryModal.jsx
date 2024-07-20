import React from "react";
import { Modal, Table, Button } from "react-bootstrap";
import { ethers } from "ethers";

const HistoryModal = ({ memos, copyText, show, setOpenHistoryModal }) => {
  return (
    <Modal show={show} scrollable={true} onHide={() => setOpenHistoryModal(false)} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Transaction History</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th colSpan={2}>Message</th>
              <th>Amount</th>
              <th>Sender Address</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {memos &&
              memos.map((memo, index) => {
                let { address, name, message, amount, timestamp } = memo;
                const maskedAddress = address.substring(0, 8) + "..." + address.substring(address.length - 5, address.length);
                timestamp = new Date(Number(timestamp) * 1000).toLocaleString();
                return (
                  <tr key={index}>
                    <td>{name}</td>
                    <td colSpan={2}>{message}</td>
                    <td>{ethers.formatEther(amount)} ETH</td>
                    <td>
                      {maskedAddress} <i className="fa fa-clipboard" aria-hidden="true" onClick={() => copyText()} />
                    </td>
                    <td>{timestamp}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setOpenHistoryModal(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default HistoryModal;

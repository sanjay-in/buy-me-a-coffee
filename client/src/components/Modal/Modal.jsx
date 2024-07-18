import React from 'react'
import Button from "react-bootstrap/Button";
import { Modal } from 'react-bootstrap'

const CustomModal = ({onClose, title, message, show, type}) => {
  return (
    <Modal
          show={show}
          onHide={() => onClose(type)}
          centered
        >
          <Modal.Header>
          <Modal.Title className="install-metamask-title">{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{message}</Modal.Body>
          <Modal.Footer>
        <Button onClick={() => onClose(type)}>Close</Button>
      </Modal.Footer>
        </Modal>
  )
}

export default CustomModal
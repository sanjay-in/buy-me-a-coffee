import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Table } from 'react-bootstrap';
import "./BuyCoffee.css"

const BuyCoffee = () => {
  return (
    <div>
    <Form className='buy-coffee-container'>
        <Form.Control type="text" className='name-text field' placeholder="Name" />
        <br />
        <Form.Control type="number" className='eth-amount field' min={0} placeholder="ETH Amount" />
        <br />
        <Form.Control as="textarea" className='textarea field' rows={2} placeholder="Message" />
        <br />
       <button className='buy-coffee-button' type="submit">
        Buy Coffee
        <i className="fa fa-coffee" aria-hidden="true"></i>
      </button>
    </Form>
    <div className='history-table'>
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
    <button className='view-messages'><i className="fa fa-expand" aria-hidden="true"></i></button>
    </div>

    </div>
  )
}

export default BuyCoffee
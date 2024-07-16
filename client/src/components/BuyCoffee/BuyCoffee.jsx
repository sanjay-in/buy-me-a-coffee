import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./BuyCoffee.css"

const BuyCoffee = () => {
  return (
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
  )
}

export default BuyCoffee
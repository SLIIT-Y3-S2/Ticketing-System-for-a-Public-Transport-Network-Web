import React from 'react'
import { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/form";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CampaignIcon from '@mui/icons-material/Campaign';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #0d316b',
    boxShadow: 24,
    p: 4,
  };
  

const Payment = () => {
  const [validated, setvalidated] = useState(false);
  const [hname, setHolderName] = useState("");
  const [cno, setCardNo] = useState("");
  const [expdate, setExpireDate] = useState("");
  const [cvc, setcvc] = useState("");
  const [amount, setAmount] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (event) => {
    const newPayment = {
      holderName: hname,
      cardNo: cno,
      expireDate: expdate,
      cvc: cvc,
      amount: amount,
    };

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();

    } else {
      
        axios
          .post("http://localhost:5000/payment", newPayment)
          .then(() => alert("Successfully Added"))
          .catch((err) => alert("Error"));
      
    }
    setvalidated(true);
  };

const Resetform = () => {
    setHolderName(null);
    setCardNo(null);
    setExpireDate(null);
    setcvc(null);
    setAmount(null);
};

const disablePastMonths = () => {
    const today = new Date();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm;
  };


  return (
    <div>
        <hr style={{marginTop:'60px'}} />
        <div className="pic"></div>
        <div className='form'>
            <center>
                <h2 style={{color:"#0d316b"}}><b>Recharge Card</b></h2>
                <br/>
                <h4 style={{color:'#4287f5'}}>Credit Balance: LKR 450.00</h4>
            </center>
            <br />
            <div className='form-in'>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>

                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label><b>Card Holder's Name</b></Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Your Name"
                        value={hname}
                        onChange={(e) => setHolderName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCno">
                    <Form.Label><b>Card Number</b></Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="xxxx xxxx xxxx xxxx"
                        pattern="[0-9]{16}"
                        value={cno}
                        onChange={(e) => setCardNo(e.target.value)}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Please Insert Valid Number
                    </Form.Control.Feedback>
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridDate">
                        <Form.Label><b>Expiry Date</b></Form.Label>
                        <Form.Control
                             type="month" 
                             value={expdate}
                             min={disablePastMonths()}
                             onChange={(e) => setExpireDate(e.target.value)}
                             required
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCvc">
                        <Form.Label><b>CVC</b>&nbsp;<InfoOutlinedIcon onClick={handleOpen} /></Form.Label>
                        <Form.Control 
                            type="password"
                            value={cvc}
                            pattern="[0-9]{3}"
                            onChange={(e) => setcvc(e.target.value)}
                            required
                        />
                        
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formAmount">
                    <Form.Label><b>Amount</b></Form.Label>
                    <Form.Control 
                        type="text"
                        value={amount}
                        placeholder="LKR 0.00"
                        onChange={(e) => setAmount(e.target.value)}
                        required
                     />
                </Form.Group>
                    
                <br />

                <center>
                    <button className='btn1' type='submit'>PAY</button>
                </center>


            </Form>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{color:'#0d316b'}}>
                        <b>Info</b> <CampaignIcon />
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{color:'#4287f5'}}>
                        <b>Enter the last 3 digits of the number printed on the back of your credit/debit card.</b>
                    </Typography>
                </Box>
            </Modal>
            </div>

        </div>
    </div>
  )
}

export default Payment
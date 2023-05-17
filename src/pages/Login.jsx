import axios from "axios";
import React, { useRef, useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";
import { SHA3 } from 'crypto-js';
import Alert from "../components/Alert";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const Navigate = useNavigate();
  const cookies = new Cookies();
  const handleSubmit = (e) => {
    e.preventDefault();
    var email = emailRef.current.value
    var password = passwordRef.current.value

    const sql_inj = (word) => {
      return word.includes('*') || word.includes('-') || word.includes('/');
    }

    async function foundUser() {
      var encrypted_password = SHA3(password).toString()
      
      let valid = await axios.post(process.env.REACT_APP_API + 'Login.php', {
        email: email,
        password: encrypted_password
      })

      if (valid.data.length === 1) {
        cookies.set('ID', valid.data[0]["ID"]);
        cookies.set('Name', valid.data[0]["Name"]);
        Alert('Login Success!', "Login Success!", true)
        Navigate("/hw4/Home")
      }
      else {
        Alert("Login errors!", "Email or password is wrong", false)
      }
    }

    if (sql_inj(email) || sql_inj(password)) {
      Alert("Login errors!", "SQL injection problems.", false)
    }
    foundUser()
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#f2f2f2]">
      <div className="w-96 rounded" style={{
        boxShadow: "rgba(0,0,0,0.1) 0px 5px 10px 0px"
      }}>
        <div className="py-5 bg-white w-100 flex flex-col justify-center items-center">
          <h2>Login</h2>
          <Form className="flex flex-col justify-center items-center" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formUser">
              <Form.Label>Email</Form.Label>
              <Form.Control required ref={emailRef} className="max-w-xl" type="Text" placeholder="Email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control required ref={passwordRef} type="password" placeholder="Password" />
            </Form.Group>
            <Link to="/hw4/Reg"><h2 className="text-sm">Register a new membership</h2></Link>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login;

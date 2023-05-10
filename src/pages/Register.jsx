import axios from "axios";
import React, { useState, useRef } from "react";
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { SHA3 } from 'crypto-js';
import Alert from "../components/Alert";

const Register = () => {
  const Navigate = useNavigate()
  const userRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const conPasswordRef = useRef();
  function password_weak(password) {
    var hasNumber = false
    var hasUpper = false
    var hasLower = false
    for (var i = 0; i < password.length; i++) {
      if (isNaN(parseInt(password[i])) && password[i] === password[i].toLowerCase())
        hasLower = true
      else if (isNaN(parseInt(password[i])) && password[i] === password[i].toUpperCase())
        hasUpper = true
      else if (!isNaN(parseInt(password[i])))
        hasNumber = true
    }
    return !(hasLower && hasUpper && hasNumber && password.length >= 8);
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    var user = userRef.current.value
    var email = emailRef.current.value
    var password = passwordRef.current.value
    var conPassword = conPasswordRef.current.value

    const sql_inj = (word) => {
      return word.includes('*') || word.includes('-') || word.includes('/');
    }

    async function duplicate() {
      let count = await axios.get(process.env.REACT_APP_API + 'getUserNumberbyEmail.php', { params: { "email": email } })
      let data = parseInt(count.data[0]["Size"])
      return data >= 1;
    }

    if (password_weak(password)) {
      Alert('Registeration errors!', "The length of password should be at least 8 and include at least a capital letter, a lowercase letter, and a number.", false)
    }
    else if (password !== conPassword) {
      Alert('Registeration errors!', "Password and Confirm password fields were not matched.", false)
    }
    else if (sql_inj(user) || sql_inj(password) || sql_inj(email)) {
      Alert('Registeration errors!', "SQL injection Problem.", false)
    }
    else if (await duplicate()) {
      Alert('Registeration errors!', "The email already exists.", false)
    }
    // pass all constraints
    else {
      let encryped_password = SHA3(password).toString()
      await axios.post(process.env.REACT_APP_API + 'Register.php', {
        name: user,
        email: email,
        password: encryped_password
      }).then(() => {
        Alert('Registeration Success!', "Registeration success", true)
        Navigate("/hw4")
      })
    }
  }
  return (
    <div className="min-h-screen flex justify-center items-center bg-[#f2f2f2]">
      <div className="w-96 rounded" style={{
        boxShadow: "rgba(0,0,0,0.1) 0px 5px 10px 0px"
      }}>
        <div className="py-5 bg-white w-100 flex flex-col justify-center items-center">
          <h2>Register</h2>
          <Form className="flex flex-col justify-center items-center" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formUser">
              <Form.Label>User</Form.Label>
              <Form.Control required ref={userRef} className="max-w-xl" type="Text" placeholder="User" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control required ref={emailRef} type="email" placeholder="name@example.com" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label >Password</Form.Label>
              <Form.Control required ref={passwordRef} type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label  >Confirm password</Form.Label>
              <Form.Control required ref={conPasswordRef} type="password" placeholder="Confirm Password" />
            </Form.Group>
            <Link to="/hw4"><h2 className="text-sm">I already have an account!</h2></Link>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Register;

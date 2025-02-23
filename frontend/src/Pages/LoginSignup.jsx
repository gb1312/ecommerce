import React, { useState } from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {

  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  })

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const login = async () => {
    console.log("Login Function Executed", formData);
    let responseData;
    await fetch('https://ecommerce-backend-g21q.onrender.com/login', {
      method: 'POST',
      headers: {
        Accept: 'application/JSON',
        'Content-Type': 'application/JSON',
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data)

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      localStorage.setItem('user-id', responseData.userId);
      window.location.replace("/");
    }
    else {
      alert(responseData.errors)
    }
  }

  const signup = async () => {
    console.log("Signup Function Executed", formData);
    let responseData;
    await fetch('https://ecommerce-backend-g21q.onrender.com/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/JSON',
        'Content-Type': 'application/JSON',
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data)

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      localStorage.setItem('user-id', responseData.userId);
      window.location.replace("/");
    }
    else {
      alert(responseData.errors)
    }
  }

  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <h1>{state}</h1>
        <div className='loginsignup-fields'>
          {state === "Sign Up" ? <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' /> : <></>}
          <input name='email' value={formData.email} onChange={changeHandler} type='email' placeholder='Email Address' />
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
        </div>
        <button onClick={() => { state === "Login" ? login() : signup() }}>Continue</button>
        {state === "Sign Up"
          ? <p className='loginsignup-login'>Already have an account? <span onClick={() => { setState("Login") }}> Login here</span></p>
          : <p className='loginsignup-login'>New Here?<span onClick={() => { setState("Sign Up") }}> Create an account</span></p>}
        <div className='loginsignup-agree'>
          <input type='checkbox' name='' id='' />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup

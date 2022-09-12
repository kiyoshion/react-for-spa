import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import utilStyles from '../styles/util.module.scss'

export default function Register() {
  const [ name, setName ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ passwordConfirmation, setPasswordConfirmation ] = useState("")
  const tokenURL = 'http://localhost:8000/sanctum/csrf-cookie'
  const registerURL = 'http://localhost:8000/register'
  const navigate = useNavigate()

  const Register = () => {
    try {
      console.log(name, email, password, passwordConfirmation)
      axios.get(tokenURL, {
        withCredentials: true
      })
      .then(() => {
        axios.post(registerURL, {
          "name": name,
          "email": email,
          "password": password,
          "password_confirmation": passwordConfirmation
        }, { withCredentials: true
        })
        .then(() => {
          navigate('/')
        })
      })
    } catch (e) {}
  }

  return (
    <div className={utilStyles.container}>
      <div className={utilStyles.formContainer}>
        <div>
          <label htmlFor="name">name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => {setName(e.target.value)}}
          />
        </div>
        <div>
          <label htmlFor="email">email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {setEmail(e.target.value)}}
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => {setPassword(e.target.value)}}
          />
        </div>
        <div>
          <label htmlFor="passwordConfirmation">passwordConfirmation</label>
          <input
            id="passwordConfirmation"
            type="password"
            value={passwordConfirmation}
            onChange={(e) => {setPasswordConfirmation(e.target.value)}}
          />
        </div>
        <div>
          <button
            className={`${utilStyles.btn} ${utilStyles.btn_black}`}
            onClick={Register}
          >Register</button>
        </div>
        <div>
          <p>Do you have an account?</p>
          <Link to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

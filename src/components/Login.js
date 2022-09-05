import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import utilStyles from '../styles/util.module.scss'

export default function Login() {
  // const [ name, setName ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  // const [ passwordConfirmation, setPasswordConfirmation ] = useState("")
  const tokenURL = 'http://localhost:8000/sanctum/csrf-cookie'
  const loginURL = 'http://localhost:8000/login'
  const navigate = useNavigate()

  const Login = () => {
    try {
      axios.get(tokenURL, {
        withCredentials: true
      })
      .then(() => {
        axios.post(loginURL, {
          "email": email,
          "password": password,
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
        {/* <div>
          <label htmlFor="name">name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => {setName(e.target.value)}}
          />
        </div> */}
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
          <button
            className={`${utilStyles.btn} ${utilStyles.btn_black}`}
            onClick={Login}
          >Login</button>
        </div>
      </div>
    </div>
  )
}

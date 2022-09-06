import axios from "../lib/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import utilStyles from '../styles/util.module.scss'

export default function Login() {
  // const [ name, setName ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  // const [ passwordConfirmation, setPasswordConfirmation ] = useState("")
  const csrfURL = '/sanctum/csrf-cookie'
  const loginURL = '/login'
  const navigate = useNavigate()

  const Login = async () => {
    await axios.get(csrfURL)

    axios
      .post(loginURL, {
        "email": email,
        "password": password,
      })
      .then(() => {
        axios.get('/api/user')
          .then((res) => {
            console.log(res.data)
          })
        navigate('/')
      })
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

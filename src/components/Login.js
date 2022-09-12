import axios from "../lib/axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import utilStyles from '../styles/util.module.scss'
import { csrf } from '../store/userSlice'
import { useDispatch } from "react-redux";

export default function Login() {
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const loginURL = '/login'
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const Login = async () => {
    await dispatch(csrf())
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
        <div>
          <p>You don't have an account?</p>
          <Link to="/register">
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}

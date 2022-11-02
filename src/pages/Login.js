import axios from "../lib/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import utilStyles from '../styles/util.module.scss'
import { csrf, setIsLogined } from '../store/userSlice'
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { CONSTS } from "../Consts";

export default function Login() {
  const [ loginForm, setLoginForm ] = useState({email: "", password: ""})
  const [ registerForm, setRegisterForm ] = useState({email: "", password: ""})
  const [ currentType, setCurrentType ] = useState("login")
  const loginURL = '/login'
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const Login = async () => {
    await dispatch(csrf())
    axios
      .post(loginURL, {
        "email": loginForm.email,
        "password": loginForm.password,
      })
      .then(() => {
        axios.get('/api/user')
          .then((res) => {
            dispatch(setUser({ id: res.data.id, name: res.data.name, avatar: res.data.avatar }))
            dispatch(setIsLogined(true))
          })
        navigate('/mypage')
      })
  }

  const getHashedName = () => {
    return (registerForm.email).slice(0, 2) + ("0000000" + Math.floor(Math.random() * 10000000)).slice(-7)
  }

  const Register = () => {
    try {
      axios.get(CONSTS.TOKEN_URL, {
        withCredentials: true
      })
      .then(() => {
        axios.post(CONSTS.POST_REGISTER_URL, {
          "name": getHashedName(),
          "email": registerForm.email,
          "password": registerForm.password,
          "password_confirmation": registerForm.password
        }, { withCredentials: true
        })
        .then(() => {
          navigate('/login')
        })
      })
    } catch (e) {}
  }

  return (
    <>
      <div className={utilStyles.container}>
        <div style={{display:'flex'}}>
          <div className={`${utilStyles.tagButtonWhite} ${utilStyles.tagButton}`} onClick={() => setCurrentType("login")}>ログイン</div>
          <div className={`${utilStyles.tagButtonWhite} ${utilStyles.tagButton}`} onClick={() => setCurrentType("register")}>新規登録</div>
        </div>
        {currentType === "login" ?
          <>
            <div className={utilStyles.formContainer}>
              <div>
                <label htmlFor="email">email</label>
                <input
                  id="email"
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => {setLoginForm({...loginForm, email: e.target.value, password: loginForm.password})}}
                />
              </div>
              <div>
                <label htmlFor="password">password</label>
                <input
                  id="password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => {setLoginForm({...loginForm, email: loginForm.email, password: e.target.value})}}
                />
              </div>
              <div>
                <button
                  className={`${utilStyles.btn} ${utilStyles.btn_black}`}
                  onClick={Login}
                >Login</button>
              </div>
            </div>
          </>
        :
          <>
            <div className={utilStyles.formContainer}>
              <div>
                <label htmlFor="email">email</label>
                <input
                  id="email"
                  type="email"
                  value={registerForm.email}
                  onChange={(e) => {setRegisterForm({...registerForm, email: e.target.value})}}
                />
              </div>
              <div>
                <label htmlFor="password">password</label>
                <input
                  id="password"
                  type="password"
                  value={registerForm.password}
                  onChange={(e) => {setRegisterForm({...registerForm, password: e.target.value})}}
                />
              </div>
              <div>
                <button
                  className={`${utilStyles.btn} ${utilStyles.btn_black}`}
                  onClick={Register}
                >Register</button>
              </div>
            </div>
          </>
        }

      </div>
    </>
  )
}

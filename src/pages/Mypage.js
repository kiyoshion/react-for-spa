import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { setUser, logout } from '../store/userSlice'
import { CONSTS } from '../Consts'
import { useDispatch, useSelector } from "react-redux";
import { setAvatarModal } from "../store/modalSlice";
import axios from '../lib/axios'
import Avatar from "../components/common/Avatar";
import UserWordbook from "../components/common/UserWordbook";
import JoinedMaterialCard from "../components/common/JoinedMaterialCard";
import mypageStyles from './Mypage.module.scss'

export default function Mypage() {
  const navigate = useNavigate();
  const user = useSelector(state => state.root.user.data)
  const [ joinedMaterials, setJoinedMaterials ] = useState([])
  const [ wordbooks, setWordbooks ] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    axios.get(CONSTS.GET_USER_URL)
      .then(res => {
        dispatch(setUser({ id: res.data.id, name: res.data.name, avatar: res.data.avatar}))
        axios
          .get(CONSTS.GET_HOME_URL)
            .then(res => {
              setJoinedMaterials(res.data.materials)
              setWordbooks(res.data.wordbook_materials)
            })
      })

  }, [])

  const handleLogout = () => {
    axios
      .post(CONSTS.POST_LOGOUT_URL)
      .then(res => {
        dispatch(setUser({ id: 0, name: "", avatar: "" }))
        dispatch(logout())
        navigate('/login')
      })
  }

  return (
    <>
    <div className={mypageStyles.userContainer} style={{ backgroundImage: `url(${CONSTS.IMAGE_BASE64 + user.avatar}` }}>
      <div className={mypageStyles.userInner}>
        <div className={mypageStyles.userHeader}>
          <div className={mypageStyles.userHeaderInner}>
            <div onClick={() => dispatch(setAvatarModal(true))}>
              <Avatar user={user} size="72" />
            </div>
            <div>
              <h1>{user.name}</h1>
              <p>{ user.profile && user.profile }</p>
            </div>
          </div>
        </div>
        <div className={mypageStyles.logout}>
          <span onClick={handleLogout} >ログアウト</span>
        </div>
        <div className={mypageStyles.joinedMaterialContainer}>
          <h2>マイ学習 ({joinedMaterials.length})</h2>
          <div className={mypageStyles.joinedMaterialList}>
            {joinedMaterials.map((material) => {
              return (
                <JoinedMaterialCard key={material.id} material={material} />
              )
            })}
          </div>
        </div>
        <div className={mypageStyles.section}>
          <div className={mypageStyles.sectionHeader}>
            <h2>マイ単語帳 {wordbooks.length}</h2>
          </div>
          <div className={mypageStyles.wordbookContainer}>
            {wordbooks && wordbooks.map((wordbook) => (
              <UserWordbook key={wordbook.id} material={wordbook} author={user} />
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { setUser } from '../store/userSlice'
import axios from '../lib/axios'
import { CONSTS } from '../Consts'
import { useDispatch, useSelector } from "react-redux";
import { setAvatarModal, setCroppedModal } from "../store/modalSlice";
import AvatarModalStyles from '../components/modals/AvatarModal.module.scss'
import Avatar from "./common/Avatar";
import mypageStyles from './Maypage.module.scss'
import JoinTopicModalStyles from './modals/JoinTopicModal.module.scss'
import JoinedMaterialCard from "./common/JoinedMaterialCard";
import AvatarModal from "./modals/AvatarModal";

export default function Mypage() {
  const getUserURL = '/api/user'
  const navigate = useNavigate();
  const user = useSelector(state => state.user.user)
  const avatarModal = useSelector(state => state.modal.avatarModal)
  const [ joinedMaterials, setJoinedMaterials ] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    axios.get(getUserURL)
      .then(res => {
        dispatch(setUser({ id: res.data.id, name: res.data.name, avatar: res.data.avatar}))
        axios
          .get(CONSTS.GET_HOME_URL)
            .then(res => {
              setJoinedMaterials(res.data.materials)
            })
      })

  }, [])

  const handleLogout = () => {
    axios
      .post(CONSTS.POST_LOGOUT)
      .then(res => {
        dispatch(setUser({ id: 0, name: "", avatar: "" }))
        navigate('/')
      })
  }

  return (
    <div className={mypageStyles.userContainer} style={{ backgroundImage: `url(${CONSTS.BACKEND_HOST_STORAGE + user.avatar}` }}>
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
        <h2>My Sensei ({joinedMaterials.length})</h2>
        <div className={mypageStyles.joinedMaterialList}>
          {joinedMaterials.map((material) => {
            return (
              <JoinedMaterialCard key={material.id} material={material} />
            )
          })}
        </div>
      </div>
      </div>
    </div>
  )
}

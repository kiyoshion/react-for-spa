import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from '../lib/axios'
import MypageStyles from './Maypage.module.scss'
import ReactCrop from 'react-image-crop'

export default function Mypage() {
  const getUserURL = '/api/user'
  const navigate = useNavigate();
  const [ user, setUser ] = useState({
    name: ""
  })
  const [ avatarModal, setAvatarModal ] = useState(false)

  const handleAvatarModal = () => {
    setAvatarModal(!avatarModal)
  }

  // const cropDemo = ({ src }) => {
  //   const [ crop, setCrop ] = useState()
  //   return (
  //     <ReactCrop >

  //     </ReactCrop>
  //   )
  // }

  useEffect(() => {
    axios.get(getUserURL)
      .then(res => {
        setUser({ name: res.data.name })
      })
  })

  return (
    <>
      <div>
        <div>
          <span onClick={handleAvatarModal}>+</span>
        </div>
        <h1>{user.name}</h1>
      </div>
      {avatarModal ? (
        <div className={MypageStyles.avatarModal}>
          <div className={MypageStyles.inner}>

          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  )
}

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Cropper from 'react-cropper'
import "cropperjs/dist/cropper.css";
import { setAvatarModal } from "../../store/modalSlice";
import { setUser } from "../../store/userSlice";
import AvatarModalStyles from './AvatarModal.module.scss'
import { CONSTS } from '../../Consts';
import axios from '../../lib/axios';

export default function AvatarModal() {
  const [ image, setImage ] = useState("")
  const [ cropper, setCropper ] = useState(null)
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()

  const onClickUploadButton = (e) => {
    onFileChange(e)
  }

  const onFileChange = (e) => {
    e.preventDefault()
    let files
    if (e.dataTransfer) {
      files = e.dataTransfer.files
    } else if (e.target) {
      files = e.target.files
    }
    const reader = new FileReader()
    reader.onload = () => {
      setImage(reader.result)
    }
    reader.readAsDataURL(files[0])
  }

  const handleUpdateAvatar = () => {
    let canvasData = ""
    axios
      .get('/api/user')
        .then(() => {
          canvasData = cropper.getCroppedCanvas().toDataURL("image/jpeg")
        })
        .then(() => {
          const params = new FormData()
          params.append("avatar", canvasData)
          params.append("user_id", user.id)
          axios
            .post(`${CONSTS.UPDATE_USER_URL}${user.id}`, params, { headers: {
              'Content-Type': 'multipart/form-data',
              'X-HTTP-Method-Override': 'PUT'
            }})
            .then((res) => {
              dispatch(setUser(res.data.user))
              setImage(null)
              dispatch(setAvatarModal(false))
            })
          })
  }

  return (
    <div className={AvatarModalStyles.container}>
      <div className={AvatarModalStyles.inner}>
        <h2>プロフィール画像を編集</h2>
        <div className={AvatarModalStyles.uploadButton}>
          <button onClick={onClickUploadButton}>up</button>
          <input type="file" accept="image/*" onChange={onFileChange} />
        </div>
        <Cropper
          style={{ height: "75vh", width: "100%" }}
          zoomTo={0.5}
          dragMode={'move'}
          initialAspectRatio={1}
          preview=".img-preview"
          src={image}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
          cropBoxResizable={false}
          onInitialized={(instance) => {
            setCropper(instance);
          }}
          guides={true}
        />
        <div className={AvatarModalStyles.footerButtonContainer}>
          <div>
            <button
              className={AvatarModalStyles.primaryButton}
              onClick={handleUpdateAvatar}
            >保存</button>
          </div>
          <div>
            <button
              className={AvatarModalStyles.secondaryButton}
              onClick={() => dispatch(setAvatarModal(false))}
            >キャンセル</button>
          </div>
        </div>
      </div>
    </div>
  )
}

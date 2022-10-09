import { useEffect, useState, useCallback } from "react"
import { useNavigate } from "react-router-dom";
import axios from '../lib/axios'
import Crop from '../lib/Crop'
import MypageStyles from './Maypage.module.scss'
import Cropper from 'react-easy-crop'
import "react-image-crop/dist/ReactCrop.css"
import ReactCrop from 'react-image-crop'
export const ASPECT_RATIO = 1/ 1
export const CROP_WIDTH = 400

export default function Mypage() {
  const getUserURL = '/api/user'
  const navigate = useNavigate();
  const [ user, setUser ] = useState({
    name: ""
  })
  const [ avatarModal, setAvatarModal ] = useState(false)
  const [ crop, setCrop ] = useState({
    unit: 'px',
    x: 25,
    y: 25,
    width: 300,
    height: 300
  })
  const [ zoom, setZoom ] = useState(1)
  const [ src, setSrc ] = useState(null)
  const [ imgSrc, setImgSrc ] = useState(null)
  const [ isOpen, setIsOpen ] = useState(false)
  const [ croppedImgSrc, seCroppedImgSrc ] = useState("")
  const [ image, setImage ] = useState(null)
  const [ result, setResult ] = useState(null)

  const handleAvatarModal = () => {
    setAvatarModal(!avatarModal)
  }

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels)
  }, [])

  // const setImgSrc = (e) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     const reader = new FileReader()
  //     reader.addEventListener('load', () => {
  //       setSrc(reader.result)
  //     })
  //     reader.readAsDataURL(e.target.files[0])
  //   }
  // }

  // const onChangeFile = useCallback(
  //   async (e) => {
  //     if (e.target.files && e.target.files.length > 0) {
  //       const reader = new FileReader()
  //       reader.addEventListener('load', () => {
  //         if (reader.result) {
  //           setImgSrc(reader.result.toString() || "")
  //           setIsOpen(true)
  //         }
  //       })
  //       reader.readAsDataURL(e.target.files[0])
  //     }
  //   }, []
  // )

  // const onMediaLoaded = useCallback((mediaSize: MediaSize) => {
  //   const { width, height } = mediaSize
  //   const mediaAspectRadio = width / height
  //   if (mediaAspectRadio > ASPECT_RATIO) {
  //     const result = CROP_WIDTH / ASPECT_RATIO / height
  //     setZoom(result)
  //     setMinZoom(result)
  //     return
  //   }
  // })

  useEffect(() => {
    axios.get(getUserURL)
      .then(res => {
        setUser({ name: res.data.name })
      })
  }, [])

  const handleImage = async (e) => {
    setImgSrc(URL.createObjectURL(e.target.files[0]))
  }

  const style = {
    height: '50vh'
  }

  const getCroppedImg = async () => {
    try {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        const base64Image = canvas.toDataURL("image/jpeg", 1);
        setResult(base64Image);
        console.log(result);
    } catch (e) {
        console.log("crop the image");
    }
};

  return (
    <>
      <div>
        <div>
          <span onClick={handleAvatarModal}>+</span>
        </div>
        <h1>{user.name}</h1>
      </div>
      <input type="file" accept="image/*" onChange={handleImage} />
      <div>
        {imgSrc && (
          <div>
            <button onClick={getCroppedImg}>crop</button>
            <ReactCrop
              style={{ maxWIdth: "50%" }}
              src={imgSrc}
              onImageLoaded={setImage}
              crop={crop}
              onChange={c => setCrop(c)}
            >
              <img src={imgSrc} alt="image" />
            </ReactCrop>
          </div>
        )}
        {result && (
          <div>
            <img alt="cropped" src={result} />
          </div>
        )}
      </div>

      {/* <div >
        <div className={MypageStyles.inner}>
          <input type="file" accept="image/*" onChange={onChangeFile} />
          <div>
            {croppedImgSrc ? (
              <img src={croppedImgSrc} alt="Cropped" />
            ): (
              <p>Cropped img is here</p>
            )}
          </div>
          <Cropper
            style={style}
            image={imgSrc}
            crop={crop}
            zoom={zoom}
            open={isOpen}
            aspect={4 / 3}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
      </div> */}
      {/* {avatarModal ? (
        <div className={MypageStyles.avatarModal}>
          <div className={MypageStyles.inner}>
            <input type="file" onChange={onChangeFile} />
          <Cropper
            image={imgSrc}
            crop={crop}
            zoom={zoom}
            open={isOpen}
            aspect={4 / 3}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
          </div>
        </div>
      ) : (
        <div></div>
      )} */}
    </>
  )
}

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cropper from 'react-cropper'
import "cropperjs/dist/cropper.css";
import flashFormStyles from './FlashForm.module.scss'
import axios from '../../lib/axios';
import { CONSTS } from '../../Consts';
import { setOpenOutputModal } from '../../store/modalSlice';
import { setCurrentMaterial } from '../../store/materialSlice';

export default function FlashForm() {
  const currentMaterial = useSelector(state => state.material.currentMaterial)
  const currentChapter = useSelector(state => state.chapter.currentChapter)
  const [ flash, setFlash ] = useState(
    {
      frontTitle: "",
      frontDescription: "",
      backTitle: "",
      backDescription: ""
    }
  )
  const [ cropper, setCropper ] = useState(null)
  const [ cropperBack, setCropperBack ] = useState(null)
  const [ frontCropData, setFrontCropData ] = useState(null)
  const [ backCropData, setBackCropData ] = useState(null)
  const [ frontImage, setFrontImage ] = useState(null)
  const [ backImage, setBackImage ] = useState(null)
  const [ frontImageData, setFrontImageData ] = useState(null)
  const [ backImageData, setBackImageData ] = useState(null)
  const [ showFrontCropper, setShowFrontCropper ] = useState(false)
  const [ showBackCropper, setShowBackCropper ] = useState(false)

  const dispatch = useDispatch()

  const handleChangeFile = (e, side) => {
    e.preventDefault()
    let files
    if (e.dataTransfer) {
      files = e.dataTransfer.files
    } else if (e.target) {
      files = e.target.files
    }
    const reader = new FileReader()
    reader.onload = () => {
      if (side === "front") {
        setFrontImage(reader.result)
        setShowFrontCropper(true)
      } else {
        setBackImage(reader.result)
        setShowBackCropper(true)
      }
    }
    reader.readAsDataURL(files[0])
  }

  const handleFrontCropImage = async () => {
    if (typeof cropper !== "undefined") {
      setFrontCropData(cropper.getCroppedCanvas().toDataURL())
      await setFrontImageData(cropper.getCroppedCanvas().toDataURL("image/jpeg"))
      setShowFrontCropper(false)
    }
  }

  const handleBackCropImage = async () => {
    if (typeof cropperBack !== "undefined") {
      setBackCropData(cropperBack.getCroppedCanvas().toDataURL())
      await setBackImageData(cropperBack.getCroppedCanvas().toDataURL("image/jpeg"))
      setShowBackCropper(false)
    }
  }

  const storeFlash = async () => {
    let canvasFrontData = ""
    let canvasBackData = ""
    await axios
      .get('/api/user')
        .then(() => {
          if (frontImage) {
            canvasFrontData = cropper.getCroppedCanvas().toDataURL("image/jpeg")
          }
          if (backImage) {
            canvasBackData = cropperBack.getCroppedCanvas().toDataURL("image/jpeg")
          }
        })
        .then(() => {
          const params = new FormData()
          params.append("material_id", currentMaterial.id)
          params.append("chapter_id", currentChapter.id)
          params.append("front_title", flash.frontTitle)
          params.append("front_description", flash.frontDescription)
          frontImage && params.append("front_image", canvasFrontData)
          params.append("back_title", flash.backTitle)
          params.append("back_description", flash.backDescription)
          backImage && params.append("back_image", canvasBackData)
          axios
            .post(CONSTS.STORE_FLASH_URL, params, { headers: {
              'Content-Type': 'multipart/form-data',
            }})
            .then((res) => {
              dispatch(setCurrentMaterial(res.data.material))
              dispatch(setOpenOutputModal(false))
            })
        })
  }

  return (
    <div>
      <h3 className={flashFormStyles.headline}>表</h3>
      <div className={flashFormStyles.flashcard}>
        <input
          type="text"
          className={flashFormStyles.frontTitle}
          placeholder="word..."
          value={flash.frontTitle}
          onChange={(e) => setFlash({...flash, frontTitle: e.target.value })}
        />
        <textarea
          type="text"
          placeholder="description..."
          className={flashFormStyles.frontDescription}
          value={flash.frontDescription}
          rows="2"
          onChange={(e) => setFlash({...flash, frontDescription: e.target.value })}
        ></textarea>
        <div>
          {frontImageData && <img width="90" height="40" src={frontImageData} alt="cropped image" />}
        </div>
      </div>
      <div>
        <input
          type="file"
          onChange={(e) => handleChangeFile(e, "front")}
        />
      </div>
      { showFrontCropper && <>
        <div>
          <Cropper
            style={{ height: "50vh", width: "100%" }}
            dragMode={'move'}
            zoomTo={0.5}
            initialAspectRatio={1}
            preview=".img-preview"
            src={frontImage}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            cropBoxResizable={true}
            onInitialized={(instance) => {
              setCropper(instance);
            }}
            guides={true}
          />
        </div>
        <button onClick={handleFrontCropImage}>CROP</button>
        </>
      }
      <div>
        <h3 className={flashFormStyles.headline}>裏</h3>
        <div className={flashFormStyles.flashcard}>
          <input
            type="text"
            className={flashFormStyles.backTitle}
            placeholder="word..."
            value={flash.backTitle}
            onChange={(e) => setFlash({...flash, backTitle: e.target.value })}
          />
          <textarea
            type="text"
            className={flashFormStyles.backDescription}
            placeholder="description..."
            value={flash.backDescription}
            rows="2"
            onChange={(e) => setFlash({...flash, backDescription: e.target.value })}
          ></textarea>
          <div>
            {backImageData && <img width="90" height="40" src={backImageData} alt="cropped image" />}
          </div>
        </div>
        <div>
          <input
            type="file"
            onChange={(e) => handleChangeFile(e, "back")}
          />
        </div>
        { showBackCropper && <>
          <div>
            <Cropper
              style={{ height: "50vh", width: "100%" }}
              dragMode={'move'}
              zoomTo={0.5}
              initialAspectRatio={1}
              preview=".img-preview"
              src={backImage}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false}
              cropBoxResizable={true}
              onInitialized={(instance) => {
                setCropperBack(instance);
              }}
              guides={true}
            />
          </div>
          <button onClick={handleBackCropImage}>CROP</button>
          </>
        }
      </div>
      <div>
        <button
          className={flashFormStyles.button}
          onClick={storeFlash}
        >送信</button>
        <button
          className={flashFormStyles.button}
          onClick={() => dispatch(setOpenOutputModal(false))}
        >閉じる</button>
      </div>
    </div>
  )
}

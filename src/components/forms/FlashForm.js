import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CONSTS } from '../../Consts';
import { setOpenOutputModal } from '../../store/modalSlice';
import { setCurrentMaterial } from '../../store/materialSlice';
import axios from '../../lib/axios';
import Cropper from 'react-cropper'
import "cropperjs/dist/cropper.css";
import flashFormStyles from './FlashForm.module.scss'

export default function FlashForm() {
  const currentMaterial = useSelector(state => state.root.material.currentMaterial)
  const currentChapter = useSelector(state => state.root.chapter.currentChapter)
  const [ frontAspect, setFrontAspect ] = useState("1/1")
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

  const handleFrontAspect = (aspect) => {
    let obj = cropper.getContainerData()
    let w = obj.width
    if (aspect === '1/1') {
      cropper.setCropBoxData({left: 0, top: 0, width: w, height: w})
    } else if (aspect === '3/4') {
      cropper.setCropBoxData({left: 0, top: 0, width: (w * 3 / 4), height: w})
    } else if (aspect === '4/3') {
      cropper.setCropBoxData({left: 0, top: 0, width: w, height: (w * 3 / 4)})
    } else if (aspect === '16/9') {
      cropper.setCropBoxData({left: 0, top: 0, width: w, height: (w * 9 / 16)})
    }
    setFrontAspect(aspect)
  }

  const handleFrontCropChancel = () => {
    cropper.destroy()
    setFrontAspect('1/1')
    setShowFrontCropper(false)
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
          params.append("topic_id", currentMaterial.joinsCurrentUserTopic.topic_id)
          params.append("front_title", flash.frontTitle)
          params.append("front_description", flash.frontDescription)
          params.append("back_title", flash.backTitle)
          params.append("back_description", flash.backDescription)

          frontImage && params.append("front_image", canvasFrontData)
          params.append("front_aspect", frontAspect)

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
    <div className={flashFormStyles.container}>
      <div className={flashFormStyles.inner}>
        <div className={flashFormStyles.card}>
          <div className={flashFormStyles.cardFront}>
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
                {frontImageData && <img width="40" height="40" src={frontImageData} alt="cropped" />}
              </div>
            </div>
            <div>
              <input
                type="file"
                onChange={(e) => handleChangeFile(e, "front")}
              />
            </div>
          </div>
          {showFrontCropper &&
            <>
              <div className={flashFormStyles.cropperContainer}>
                <div className={flashFormStyles.cropperInner}>
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
                    cropBoxResizable={false}
                    onInitialized={(instance) => {
                      setCropper(instance);
                    }}
                    guides={true}
                  />
                </div>
                <div className={flashFormStyles.cropperButtons}>
                  <button
                    className={`${flashFormStyles.cropperButtonsAspect} ${frontAspect === '1/1' && flashFormStyles.cropperButtonsAspectSelected}`}
                    onClick={() => handleFrontAspect('1/1')}
                  >1:1</button>
                  <button
                    className={`${flashFormStyles.cropperButtonsAspect} ${frontAspect === '3/4' && flashFormStyles.cropperButtonsAspectSelected}`}
                    onClick={() => handleFrontAspect('3/4')}
                  >3:4</button>
                  <button
                    className={`${flashFormStyles.cropperButtonsAspect} ${frontAspect === '4/3' && flashFormStyles.cropperButtonsAspectSelected}`}
                    onClick={() => handleFrontAspect('4/3')}
                  >4:3</button>
                  <button
                    className={`${flashFormStyles.cropperButtonsAspect} ${frontAspect === '16/9' && flashFormStyles.cropperButtonsAspectSelected}`}
                    onClick={() => handleFrontAspect('16/9')}
                  >16:9</button>
                </div>
                <div className={flashFormStyles.cropperButtonsSubmit}>
                  <button
                    className={flashFormStyles.cropperButtonsPrimary}
                    onClick={handleFrontCropImage}
                  >切り抜き</button>
                  <button
                    className={flashFormStyles.cropperButtonsChancel}
                    onClick={handleFrontCropChancel}
                  >キャンセル</button>
                </div>
              </div>
            </>
          }
          <div className={flashFormStyles.cardBack}>
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
                {backImageData && <img width="40" height="40" src={backImageData} alt="cropped" />}
              </div>
            </div>
            <div>
              <input
                type="file"
                onChange={(e) => handleChangeFile(e, "back")}
              />
            </div>
          </div>
        </div>
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
      {showBackCropper &&
        <>
          <div className={flashFormStyles.cropperContainer}>
            <div className={flashFormStyles.cropperInner}>
              <h3>画像をトリミング</h3>
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
            <div>
              <button onClick={handleBackCropImage}>CROP</button>
            </div>
          </div>
        </>
      }
    </div>
  )
}

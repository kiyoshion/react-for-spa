import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../../lib/axios'
import { CONSTS } from '../../Consts'
import { setCurrentMaterial } from '../../store/materialSlice'
import { setOpenOutputModal } from '../../store/modalSlice'
import outputFormStyles from './OutputForm.module.scss'
import Cropper from 'react-cropper'
import "cropperjs/dist/cropper.css";

export default function OutputModal(props) {
  const [ output, setOutput ] = useState("")
  const [ currentOutputType, setCurrentOutputType ] = useState("output")
  const [ flash, setFlash ] = useState(
    {
      frontTitle: "",
      frontDescription: "",
      backTitle: "",
      backDescription: ""
    }
  )
  const [ frontImage, setFrontImage ] = useState(null)
  const [ backImage, setBackImage ] = useState(null)
  const [ cropper, setCropper ] = useState(null)
  const [ cropperBack, setCropperBack ] = useState(null)
  const [ frontCropData, setFrontCropData ] = useState(null)
  const [ backCropData, setBackCropData ] = useState(null)
  const [ frontImageData, setFrontImageData ] = useState(null)
  const [ backImageData, setBackImageData ] = useState(null)
  const [ showFrontCropper, setShowFrontCropper ] = useState(false)
  const [ showBackCropper, setShowBackCropper ] = useState(false)
  const user = useSelector(state => state.user.user)
  const currentSection = useSelector(state => state.section.currentSection)
  const dispatch = useDispatch()

  const toggleOutput = (type) => {
    setCurrentOutputType(type)
  }

  const storeOutput = async () => {
    await axios
      .get('/api/user')
      .then(res => {
        axios.post(CONSTS.STORE_OUTPUT_URL, {
          body: output,
          material_id: props.material.id,
          section_id: currentSection.id,
          user_id: res.data.id
        })
        .then((res) => {
          dispatch(setCurrentMaterial(res.data.material))
          dispatch(setOpenOutputModal(false))
        })
      })
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
        .then(res => {
          const params = new FormData()
          params.append("material_id", props.material.id)
          params.append("section_id", currentSection.id)
          params.append("front_title", flash.frontTitle)
          params.append("front_description", flash.frontDescription)
          frontImage && params.append("front_image", canvasFrontData)
          params.append("back_title", flash.backTitle)
          params.append("back_description", flash.backDescription)
          backImage && params.append("back_image", canvasBackData)
          params.append("user_id", user.id)
          axios
            .post(CONSTS.STORE_FLASH_URL, params, { headers: {
              'Content-Type': 'multipart/form-data',
            }})
        })
        .then(() => {
          dispatch(setOpenOutputModal(false))
        })
  }

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

  return (
    <div className={outputFormStyles.container}>
      <h3 className={outputFormStyles.headline}>{props.material.title} - {currentSection.parentTitle} - {currentSection.title}</h3>
      <div className={outputFormStyles.buttonContainer}>
        <button
          className={`${outputFormStyles.button} ${currentOutputType === "output" ? outputFormStyles.currentType : ""}`}
          onClick={() => toggleOutput("output")}
        >output</button>
        <button
          className={`${outputFormStyles.button} ${currentOutputType === "flash" ? outputFormStyles.currentType : ""}`}
          onClick={() => toggleOutput("flash")}
        >flash</button>
      </div>
      {currentOutputType === "output" ?
        <div className={outputFormStyles.containerOutput}>
          <textarea
            row="2"
            className={outputFormStyles.formText}
            value={output}
            onChange={(e) => setOutput(e.target.value)}
          ></textarea>
          <button
            className={outputFormStyles.buttonSend}
            onClick={storeOutput}
          >→</button>
        </div>
      :
        <div>
          <h3 className={outputFormStyles.headline}>表</h3>
          <div className={outputFormStyles.flashcard}>
            <input
              type="text"
              className={outputFormStyles.frontTitle}
              placeholder="word..."
              value={flash.frontTitle}
              onChange={(e) => setFlash({...flash, frontTitle: e.target.value })}
            />
            <textarea
              type="text"
              placeholder="description..."
              className={outputFormStyles.frontDescription}
              value={flash.frontDescription}
              rows="2"
              onChange={(e) => setFlash({...flash, frontDescription: e.target.value })}
            ></textarea>
            <div>
              { frontImageData ? <img width="90" height="40" src={frontImageData} alt="cropped image" /> : <></>}
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
            <h3 className={outputFormStyles.headline}>裏</h3>
            <div className={outputFormStyles.flashcard}>
              <input
                type="text"
                className={outputFormStyles.backTitle}
                placeholder="word..."
                value={flash.backTitle}
                onChange={(e) => setFlash({...flash, backTitle: e.target.value })}
              />
              <textarea
                type="text"
                className={outputFormStyles.backDescription}
                placeholder="description..."
                value={flash.backDescription}
                rows="2"
                onChange={(e) => setFlash({...flash, backDescription: e.target.value })}
              ></textarea>
              <div>
                { backImageData ? <img width="90" height="40" src={backImageData} alt="cropped image" /> : <></>}
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
              className={outputFormStyles.button}
              onClick={storeFlash}
            >送信</button>
            <button
              className={outputFormStyles.button}
              onClick={() => dispatch(setOpenOutputModal(false))}
            >閉じる</button>
          </div>
        </div>
      }
    </div>
  )
}

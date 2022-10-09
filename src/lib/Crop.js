import React, { useState } from 'react'
import 'react-image-crop/dist/ReactCrop.css'
import ReactCrop from 'react-image-crop'

export default function Crop() {
  const [ state, setState ] = useState({
    src: null,
    crop: {
      unit: '%',
      width: 50,
      aspect: 1 / 1
    },
    imgPath: ""
  })
  const [ imageRef, setImageRef ] = useState()

  const onImgChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        setState({ ...state, src: reader.result })
      })
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const onFileLoaded = (image) => {
    setImageRef(image)
  }

  const onImgCropComp = (crop) => {
    makeClientCrop(crop)
  }

  const onImgCropChange = (crop, percentCrop) => {
    setState({ ...state, crop })
  }

  const makeClientCrop = async (crop) => {
    if (imageRef && crop.width && crop.height) {
      const imgPath = await getResizeImage(
        imageRef,
        crop,
        'newFile.jpg'
      )
      setState({ ...state, imgPath })
    }
  }

  const getResizeImage = (image, crop, fileName) => {
    const canvas = document.createElement('canvas')
    const pixelRatio = window.devicePixelRatio
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    const ctx = canvas.getContext('2d')

    canvas.width = crop.width * pixelRatio * scaleX
    canvas.height = crop.height * pixelRatio * scaleY

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    ctx.imageSmoothingQuality = 'high'

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    )

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            return
          }
          blob.name = fileName
          window.URL.revokeObjectURL(this.fileUrl)
          this.fileUrl = window.URL.createObjectURL(blob)
          resolve(this.fileUrl)
        },
        'image/jpeg',
        1
      )
    })
  }

  return (
    <div className="App">
      <div>
        <input type="file" accept="image/*" onChange={onImgChange} />
      </div>
      {state.src && (
        <ReactCrop
          src={state.src}
          ruleOfThirds
          crop={state.crop}
          onImageLoaded={onFileLoaded}
          onChange={onImgCropChange}
          onComplete={onImgCropComp}
        />
      )}
      {state.imgPath && (
        <img alt="Crop" style={{ maxWidth: '400px' }} src={state.imgPath} />
      )}
    </div>
  )

}

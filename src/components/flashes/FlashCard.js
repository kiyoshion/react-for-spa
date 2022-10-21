import { useEffect, useState } from 'react'
import flashStyles from './FlashCard.module.scss'
import ReactCardFlip from 'react-card-flip'
import { CONSTS } from '../../Consts'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { useDispatch, useSelector } from 'react-redux'
import { setFlashModal } from '../../store/modalSlice'

export default function FlashCard({flash}) {
  const [ isFlipped, setIsFlipped ] = useState(false)
  const [ currentFlash, setCurrentFlash ] = useState({})
  const flashModal = useSelector(state => state.modal.flashModal)
  const dispatch = useDispatch()

  useEffect(() => {
    setCurrentFlash(flash)
  }, [])

  const speechTitle = (e, side) => {
    e.stopPropagation()
    if (side === 'front') {
      const uttr = new SpeechSynthesisUtterance(flash.front_title)
          uttr.lang = "en-US"
          speechSynthesis.speak(uttr)
    } else {
      const uttr = new SpeechSynthesisUtterance(flash.back_title)
          uttr.lang = "ja-JP"
          speechSynthesis.speak(uttr)
     }
  }

  const flipCard = (e) => {
    e.preventDefault()
    setIsFlipped(!isFlipped)
  }

  const handleFlashModal = (e, bool, side) => {
    e.stopPropagation()
    dispatch(setFlashModal({ isOpen: bool, side: side, flash: flash }))
  }

  const handleFlashModalFlip = (e, side, flash) => {
    e.stopPropagation()
    side === 'front' ?
      dispatch(setFlashModal({ isOpen: true, side: 'back', flash: flash}))
    :
      dispatch(setFlashModal({ isOpen: true, side: 'front', flash: flash}))
  }

  return (
    <>
    <ReactCardFlip
      isFlipped={isFlipped}
      flipDirection="horizontal"
      flipSpeedBackToFront="0.3"
      flipSpeedFrontToBack="0.3"
    >
      <div onClick={flipCard} className={`${flashStyles.card}`}>
        <div className={flashStyles.cardContent}>
          <h2>{flash.front_title}</h2>
          <p>{flash.front_description}</p>
        </div>
        { flash.front_image_small && (
          <div className={flashStyles.cardFooter}>
            <div className={flashStyles.zoomContainer} onClick={(e) => handleFlashModal(e, true, 'front')}>
              <img src={`${CONSTS.BACKEND_HOST_STORAGE}${flash.front_image_small}`} alt={flash.front_title} />
            </div>
            <div
            className={flashStyles.speechButton}
            onClick={(e) => speechTitle(e, 'front')}
            >
              <span>S</span>
            </div>
          </div>)
        }
      </div>
      <div onClick={flipCard} className={`${flashStyles.card} ${flashStyles.back}`}>
        <div className={flashStyles.cardContent}>
          <h2>{flash.back_title}</h2>
          <p>{flash.back_description}</p>
        </div>
        { flash.back_image_small && (
          <div className={flashStyles.cardFooter}>
            <div className={flashStyles.zoomContainer} onClick={(e) => handleFlashModal(e, true, 'back')}>
              <img src={`${CONSTS.BACKEND_HOST_STORAGE}${flash.back_image_small}`} alt={flash.back_title} />
            </div>
            <div
            className={flashStyles.speechButton}
            onClick={(e) => speechTitle(e, 'back')}
            >
              <span>S</span>
            </div>
          </div>)
        }
      </div>
    </ReactCardFlip>
    { flashModal.isOpen &&
      <div className={flashStyles.flashModalContainer}>
        <div
          className={flashStyles.flipButton}
          onClick={(e) => handleFlashModalFlip(e, flashModal.side, flashModal.flash)}
        >⇆
        </div>
        <div className={flashStyles.flashModalInner}>
          { flashModal.side === 'front' ?
            <>
              <div className={flashStyles.flashModalHeader}>
                <h2>{flashModal.flash.front_title}</h2>
                {flashModal.flash.front_description &&
                  <p>{flashModal.flash.front_description}</p>
                }
              </div>
              { flashModal.flash.front_image_large &&
                <img src={`${CONSTS.BACKEND_HOST_STORAGE}${flashModal.flash.front_image_large}`} alt={flashModal.flash.front_title} />
              }
            </>
          :
            <>
              <div className={flashStyles.flashModalHeader}>
                <h2>{flashModal.flash.back_title}</h2>
                {flashModal.flash.back_description &&
                  <p>{flashModal.flash.back_description}</p>
                }
              </div>
              { flashModal.flash.back_image_large &&
                <img src={`${CONSTS.BACKEND_HOST_STORAGE}${flashModal.flash.back_image_large}`} alt={flashModal.flash.back_title} />
              }
            </>
          }
        </div>
        <div>
          <button onClick={(e) => handleFlashModal(e, false, '')}>CLOSE</button>
        </div>
      </div>
    }
    </>
  )
}

import { useEffect, useState } from 'react'
import flashStyles from './FlashCard.module.scss'
import ReactCardFlip from 'react-card-flip'

export default function FlashCard({flash}) {
  const [ display, setDisplay ] = useState({
    title: "", description: ""
  })
  const [ isFlipped, setIsFlipped ] = useState(false)

  useEffect(() => {
    setDisplay({ title: flash.front_title, description: flash.front_description })
  }, [])

  const speechTitle = (e) => {
    e.stopPropagation()
    const uttr = new SpeechSynthesisUtterance(display.title)
        uttr.lang = "en-US"
        speechSynthesis.speak(uttr)
  }

  const flipCard = (e) => {
    e.preventDefault()
    setIsFlipped(!isFlipped)
  }

  return (
    <ReactCardFlip
      isFlipped={isFlipped}
      flipDirection="horizontal"
      flipSpeedBackToFront="0.3"
      flipSpeedFrontToBack="0.3"
    >
      <div onClick={flipCard} className={flashStyles.card}>
        <div
          className={flashStyles.speechButton}
          onClick={speechTitle}
        >
          <span>S</span>
        </div>
        <h2>{flash.front_title}</h2>
        <p>{flash.front_description}</p>
      </div>
      <div onClick={flipCard} className={`${flashStyles.card} ${flashStyles.back}`}>
        <h2>{flash.back_title}</h2>
        <p>{flash.back_description}</p>
      </div>
    </ReactCardFlip>
  )
}

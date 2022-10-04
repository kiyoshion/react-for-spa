import { useEffect, useState } from 'react'
import flashStyles from './FlashCard.module.scss'

export default function FlashCard({flash}) {
  const [ status, setStatus ] = useState("front")
  const [ display, setDisplay ] = useState({
    title: "", description: ""
  })

  useEffect(() => {
    setDisplay({ title: flash.front_title, description: flash.front_description })
  }, [])

  const speechTitle = (e) => {
    e.stopPropagation()
    const uttr = new SpeechSynthesisUtterance(display.title)
        uttr.lang = "en-US"
        speechSynthesis.speak(uttr)
  }

  const flipCard = () => {
    if (status === "front") {
      setDisplay({ title: flash.back_title, description: flash.back_description })
      setStatus("back")
    } else {
      setDisplay({ title: flash.front_title, description: flash.front_description })
      setStatus("front")
    }
  }

  return (
    <div
      className={flashStyles.card}
      onClick={flipCard}
    >
      <div
        className={flashStyles.speechButton}
        onClick={speechTitle}
      >
        <span>S</span>
      </div>
      <h2>{display.title}</h2>
      <p>{display.description}</p>
    </div>
  )
}

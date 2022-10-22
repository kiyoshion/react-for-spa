import { useState } from 'react'
import { useSelector } from 'react-redux'
import outputFormStyles from './OutputForm.module.scss'
import MemoForm from '../forms/MemoForm'
import FlashForm from '../forms/FlashForm'

export default function OutputModal(props) {
  const [ currentOutputType, setCurrentOutputType ] = useState("memo")
  const currentChapter = useSelector(state => state.chapter.currentChapter)

  const toggleOutput = (type) => {
    setCurrentOutputType(type)
  }

  return (
    <div className={outputFormStyles.container}>
      <h3 className={outputFormStyles.headline}>{props.material.title} - {currentChapter.contentTitle} - {currentChapter.title}</h3>
      <div className={outputFormStyles.buttonContainer}>
        <button
          className={`${outputFormStyles.button} ${currentOutputType === "memo" ? outputFormStyles.currentType : ""}`}
          onClick={() => toggleOutput("memo")}
        >memo</button>
        <button
          className={`${outputFormStyles.button} ${currentOutputType === "flash" ? outputFormStyles.currentType : ""}`}
          onClick={() => toggleOutput("flash")}
        >flash</button>
      </div>
      {currentOutputType === "memo" ?
        <MemoForm />
      :
        <FlashForm />
      }
    </div>
  )
}

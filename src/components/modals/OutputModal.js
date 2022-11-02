import { useState } from 'react'
import { useSelector } from 'react-redux'
import outputModalStyles from './OutputModal.module.scss'
import MemoForm from '../forms/MemoForm'
import FlashForm from '../forms/FlashForm'

export default function OutputModal(props) {
  const OUTPUT_TYPES = [ 'Memo', 'Flash' ]
  const [ currentOutputType, setCurrentOutputType ] = useState(OUTPUT_TYPES[0])
  const currentChapter = useSelector(state => state.root.chapter.currentChapter)

  const toggleOutput = (type) => {
    setCurrentOutputType(type)
  }

  const renderOutputForm = () => {
    switch (currentOutputType) {
      case 'Memo':
        return <MemoForm />
      case 'Flash':
        return <FlashForm />
      default:
        return <MemoForm />
    }
  }

  return (
    <div className={outputModalStyles.container}>
      <h3 className={outputModalStyles.headline}>{props.material.title} - {currentChapter.contentTitle} - {currentChapter.title}</h3>
      <div className={outputModalStyles.buttonContainer}>
        {OUTPUT_TYPES.map((type) => (
          <button
            key={type}
            className={`${outputModalStyles.button} ${currentOutputType === type ? outputModalStyles.currentType : ""}`}
            onClick={() => toggleOutput(type)}
          >{type}</button>
        ))}
      </div>
      {renderOutputForm()}
    </div>
  )
}

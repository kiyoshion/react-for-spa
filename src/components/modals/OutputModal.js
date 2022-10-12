import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../../lib/axios'
import { CONSTS } from '../../Consts'
import { setOpenOutputModal } from '../../store/modalSlice'
import utilStyles from '../../styles/util.module.scss'
import outputFormStyles from './OutputForm.module.scss'

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
        .then(() => {
          dispatch(setOpenOutputModal(false))
        })
      })
  }

  const storeFlash = async () => {
    await axios
      .get('/api/user')
      .then(res => {
        axios.post(CONSTS.STORE_FLASH_URL, {
          body: output,
          material_id: props.material.id,
          section_id: currentSection.id,
          front_title: flash.frontTitle,
          front_description: flash.frontDescription,
          back_title: flash.backTitle,
          back_description: flash.backDescription,
          user_id: res.data.id
        })
        .then(() => {
          dispatch(setOpenOutputModal(false))
        })
      })
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
        <div>
          {currentOutputType === "output" ?
            (<>
              <input
                type="text"
                className={utilStyles.formText}
                value={output}
                onChange={(e) => setOutput(e.target.value)}
              />
              <div className={outputFormStyles.formContainer}>
                <button
                  className={outputFormStyles.button}
                  onClick={storeOutput}
                >送信</button>
              </div>
            </>) : (<>
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
              </div>
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
              </div>
              <div>
                <input
                  type="file"
                />
              </div>
              <div>
                <button
                  className={outputFormStyles.button}
                  onClick={storeFlash}
                >送信</button>
              </div>
              <div>
                <button
                  className={outputFormStyles.button}
                  onClick={() => dispatch(setOpenOutputModal(false))}
                >閉じる</button>
              </div>
            </>)
        }
        </div>
      </div>
  )
}

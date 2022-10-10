import axios from "../../lib/axios"
import { useEffect, useState } from "react"
import { Link, useParams } from 'react-router-dom'
import { format } from 'date-fns'
import utilStyles from '../../styles/util.module.scss'
import outputFormStyles from './OutputForm.module.scss'
import { useDispatch } from 'react-redux'
import { getUser } from '../../store/userSlice'
import MaterialStyles from './Material.module.scss'

export default function Material() {
  const [ room, setRoom ] = useState({
    title: "", description: "", materials: []
  })
  const [ output, setOutput ] = useState("")
  const [ flash, setFlash ] = useState({
    frontTitle: "", frontDescription: "", backTitle: "", backDescription: ""
  })
  const [ currentSection, setCurrentSection ] = useState({ title: "", id: 0, parent: "" })
  const [ currentOutputType, setCurrentOutputType ] = useState("output")
  const [ openOutputModal, setOpenOutputModal ] = useState(false)
  const [ sections, setSections ] = useState([])
  const getRoomURL = '/api/rooms/'
  const storeOutputURL = '/api/outputs/'
  const storeFlashURL = '/api/flashes/'
  const params = useParams()
  const dispatch = useDispatch()

  const groupBy = (xs, key) => {
    return xs.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x)
      return rv
    }, {})
  }

  useEffect(() => {
    dispatch(getUser())
    axios
        .get(getRoomURL + params.id)
        .then((res) => {
          const date = format(new Date(res.data.room.created_at), 'yy/MM/dd HH:mm')
          setRoom({
            ...res.data.room,
            "created_at": date
          })
          res.data.room.materials.map((m) => {
            console.log(m)
            setSections((prev) => [...prev, m.sections])
          })
        })
    }, [])

  const handleOpenOutput = (title, id, parentId) => {
    // const parent = material.sections.filter(section =>
    //   section.level === 0 && section.parent_id === parentId
    // )
    setCurrentSection({
      title: title,
      id: id,
      // parentTitle: parent[0].title
    })
    setOpenOutputModal(!openOutputModal)
  }

  // const storeOutput = async () => {
  //   await axios
  //     .get('/api/user')
  //     .then(res => {
  //       axios.post(storeOutputURL, {
  //         body: output,
  //         material_id: material.id,
  //         section_id: currentSection.id,
  //         user_id: res.data.id
  //       })
  //       .then(res => {
  //         setOpenOutputModal(false)
  //       })
  //     })
  // }

  // const storeFlash = async () => {
  //   await axios
  //     .get('/api/user')
  //     .then(res => {
  //       axios.post(storeFlashURL, {
  //         body: output,
  //         material_id: material.id,
  //         section_id: currentSection.id,
  //         front_title: flash.frontTitle,
  //         front_description: flash.frontDescription,
  //         back_title: flash.backTitle,
  //         back_description: flash.backDescription,
  //         user_id: res.data.id
  //       })
  //       .then(res => {
  //         setOpenOutputModal(false)
  //       })
  //     })
  // }

  const toggleOutput = (type) => {
    setCurrentOutputType(type)
  }

  return (
    <>
    <div className={utilStyles.container}>
      <h1>{room.title}</h1>
        {sections.map((s, index) => (
          <div className={MaterialStyles.container} key={index}>
            {Object.entries(s).map((section) => {
              return (
                section[1].level === 0 ?
                  (
                    <h2 key={section[1].id}>{section[1].title}</h2>
                  ) : (
                    <div key={section[1].id} className={MaterialStyles.section}>
                      <Link to={`/sections/${section[1].id}`}></Link>
                      <h3>{section[1].title} ({`${section[1].outputCount + section[1].flashCount}`})</h3>
                      <p>Just a small town girl...</p>
                      <span
                        className={MaterialStyles.outputButton}
                        onClick={() => handleOpenOutput(section[1].title, section[1].id, section[1].parent_id)}
                      >out</span>
                    </div>
                  )
              )
            })}
          </div>
              ))}

      {/* <div className={MaterialStyles.container}>
        {room.materials?.map((section) => (
            section.level === 0 ?
              (
                <h2 key={section.id}>{section.title}</h2>
              ) : (
                <div key={section.id} className={MaterialStyles.section}>
                  <Link to={`/sections/${section.id}`}></Link>
                  <h3>{section.title} ({`${section.outputCount + section.flashCount}`})</h3>
                  <p>Just a small town girl...</p>
                  <span
                    className={MaterialStyles.outputButton}
                    onClick={() => handleOpenOutput(section.title, section.id, section.parent_id)}
                  >out</span>
                </div>
              )
          )
        )}
      </div> */}
      {/* {openOutputModal ?
      (<div className={outputFormStyles.container}>
        <h3 className={outputFormStyles.headline}>{material.title} - {currentSection.parentTitle} - {currentSection.title}</h3>
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
                <button
                  className={outputFormStyles.button}
                  onClick={storeFlash}
                >送信</button>
              </div>
            </>)
        }
        </div>
      </div>) : (
        <div></div>
      )} */}
    </div>
    </>
  )
}

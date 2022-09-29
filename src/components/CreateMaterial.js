import axios from "../lib/axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import utilStyles from '../styles/util.module.scss'

export default function CreateItem() {
  const [ title, setTitle ] = useState("")
  const [ sections, setSections ] = useState([
    { title: "シーズン", level: 0 },
    { title: "エピソード", level: 1 },
  ])
  const updateMaterialURL = '/api/materials'
  const navigate = useNavigate();

  const StorePost = () => {
    axios
      .get('/api/user')
      .then(res => {
        axios
          .post(updateMaterialURL, {
            "title": title,
            "user_id": res.data.id,
            "sections": sections,
          })
          .then(() => {
            navigate(`/materials/`)
          })
      })
  }

  const addSection = () => {
    setSections(() => [...sections, { title: "", level: 0 }])
  }

  const addSectionChildren = () => {
    setSections(() => [...sections, { title: "", level: 1 }])
  }

  const updateSections = (index, newData) => {
    setSections(
      sections.map((section, i) => (i === index ? { title: newData, level: section.level }: section))
    )
  }

  return (
    <div className={utilStyles.container}>
      <h1>教材を登録</h1>
      <div className={utilStyles.formContainer}>
        <div>
          <input
            type="text"
            id="title"
            key="title"
            className={utilStyles.bigInput}
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {/* <div>
          <input
            type="text"
            value={sectionTitle}
            onChange={(e) => setSectionTitle(e.target.value)}
          />
        </div> */}
        {/* <div>
          {secs.map((section, i) => {
            (<div key={i}>{section.title}</div>)
          })}
        </div> */}
        <div>
          {sections.map((section, index) =>
            ( <input
                type="text"
                id={index}
                key={index}
                value={section.title}
                onChange={(e) => updateSections(index, e.target.value )}
                // onChange={(e) => updateSecs(index, e.target.value)}
              />)
          )}
        </div>
        <button onClick={addSection}>シーズンを追加</button>
        <button onClick={addSectionChildren}>エピソードを追加</button>
        {/* <button onClick={addSectionTitle}>セクションを追加</button> */}
        <div>
          <button
            className={`${utilStyles.btn} ${utilStyles.btn_black}`}
            onClick={StorePost}
          >作成</button>
        </div>
      </div>
    </div>
  )
}

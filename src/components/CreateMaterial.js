import axios from "../lib/axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import utilStyles from '../styles/util.module.scss'

export default function CreateItem() {
  const [ title, setTitle ] = useState("")
  const updateMaterialURL = '/api/materials'
  const navigate = useNavigate();

  const StorePost = () => {
    axios
      .get('/api/user')
      .then(res => {
        axios
          .post(updateMaterialURL, {
            "title": title,
            "user_id": res.data.id
          })
          .then(() => {
            navigate(`/materials/`)
          })
      })
  }

  return (
    <div className={utilStyles.container}>
      <h1>教材を登録</h1>
      <div className={utilStyles.formContainer}>
        <div>
          <input
            type="text"
            id="title"
            className={utilStyles.bigInput}
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
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

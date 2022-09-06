import axios from "../lib/axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import utilStyles from '../styles/util.module.scss'

export default function CreatePost() {
  const [ title, setTitle ] = useState("")
  const [ body, setBody ] = useState("")
  const [ userId, setUserId ] = useState(0)
  const createItemURL = '/api/items'
  const navigate = useNavigate();

  const getUserId = async () => {
    await axios
      .get('/api/user')
      .then(res => {
        setUserId(res.data.id)
      })
  }

  const StorePost = async () => {
    await axios
      .get('/api/user')
      .then(res => {
        axios
          .post(createItemURL, {
            "title": title,
            "body": body,
            "user_id": res.data.id
          })
          .then(() => {
            navigate(`/items/`)
          })
      })
  }

  return (
    <div className={utilStyles.container}>
      <h1>記事を投稿</h1>
      <div className={utilStyles.formContainer}>
        <div>
          <label htmlFor="title">タイトル</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="body">本文</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
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

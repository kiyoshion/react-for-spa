import axios from "../lib/axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import utilStyles from '../styles/util.module.scss'
import { useSelector } from "react-redux"

export default function EditItem() {
  const [ title, setTitle ] = useState("")
  const [ body, setBody ] = useState("")
  const updateItemURL = '/api/items/'
  const navigate = useNavigate();
  const params = useParams()
  const { user } = useSelector(state => state.user)

  useEffect(() => {
    axios
      .get(updateItemURL + params.id)
      .then(res => {
        setTitle(res.data.item.title)
        setBody(res.data.item.body)
      })
  }, [])

  const UpdateItem = async () => {
    await axios
      .put(updateItemURL + params.id, {
        "title": title,
        "body": body,
        "user_id": user.id
      })
      .then(() => {
        navigate(`/items/`)
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
            rows="30"
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>
        <div>
          <button
            className={`${utilStyles.btn} ${utilStyles.btn_black}`}
            onClick={UpdateItem}
          >Update</button>
        </div>
      </div>
    </div>
  )
}

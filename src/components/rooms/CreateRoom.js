import axios from "../../lib/axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import utilStyles from '../../styles/util.module.scss'

export default function CreateItem() {
  const [ form, setForm ] = useState({
    title: "", description: ""
  })
  const updateRoomURL = '/api/rooms'
  const searchMaterialURL = '/api/materials?key='
  const navigate = useNavigate();

  const StoreRoom = () => {
    axios
      .get('/api/user')
      .then(res => {
        axios
          .post(updateRoomURL, {
            "title": form.title,
            "description": form.description,
            "user_id": res.data.id,
          })
          .then(() => {
            navigate(`/rooms/`)
          })
      })
  }

  return (
    <div className={utilStyles.container}>
      <h1>クラスをつくる</h1>
      <div className={utilStyles.formContainer}>
        <div>
          <input
            type="text"
            id="title"
            key="title"
            className={utilStyles.bigInput}
            value={form.title}
            placeholder="Title"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>
        <div>
          <textarea
            id="description"
            key="description"
            value={form.description}
            placeholder="description"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          ></textarea>
        </div>
        <div>
          <button
            className={`${utilStyles.btn} ${utilStyles.btn_black}`}
            onClick={StoreRoom}
          >作成</button>
        </div>
      </div>
    </div>
  )
}

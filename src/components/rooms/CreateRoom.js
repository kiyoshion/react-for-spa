import axios from "../../lib/axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import utilStyles from '../../styles/util.module.scss'
import { CONSTS } from '../../Consts'
import RoomStyles from './Room.module.scss'

export default function CreateRoom() {
  const [ form, setForm ] = useState({
    title: "", description: ""
  })
  const [ searchMaterialStr, setSearchMaterialStr ] = useState("")
  const [ searchResults, setSearchResutls ] = useState([])
  const [ selectedMaterials, setSelectedMaterials ] = useState([])
  const [ materialIds, setMaterialIds ] = useState([])
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
            "materials": materialIds
          })
          .then(() => {
            navigate(`/rooms/`)
          })
      })
  }

  const searchMaterials = async (str) => {
    setSearchMaterialStr(str)
    await axios
      .get(searchMaterialURL + str)
      .then(res => {
        setSearchResutls(res.data.materials)
      })
  }

  const handleSelectMaterial = (id, thumbnail, title) => {
    setSelectedMaterials((prev) => [...prev, { id: id, thumbnail: thumbnail, title: title}])
    setMaterialIds((prev) => ([...prev, id]))
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
        <div className={RoomStyles.searchResultsContainer}>
          {selectedMaterials.length > 0 ? (
            selectedMaterials?.map((material) => {
              return (
                <div
                  key={material.id}
                  className={RoomStyles.searchResultMaterial}
                >
                  {material.thumbnail ? (
                    <img alt={material.title} src={`${CONSTS.BACKEND_HOST_STORAGE}${material.thumbnail}`} />
                  ) : (
                    <div className={RoomStyles.noimage}>{material.title}</div>
                  )}
                  <p>{material.title}</p>
                </div>
              )
            })
          ) : (
            <div></div>
          )}
        </div>
        <div>
          <input
            type="text"
            value={searchMaterialStr}
            onChange={(e) => searchMaterials(e.target.value)}
          />
        </div>
        <div className={RoomStyles.searchResultsContainer}>
          {searchResults.length > 0 ? (
            searchResults.map((material) => {
              return (
                <div
                  key={material.id}
                  className={RoomStyles.searchResultMaterial}
                  onClick={() => handleSelectMaterial(material.id, material.thumbnail, material.title)}
                >
                  {material.thumbnail ? (
                    <img alt={material.title} src={`${CONSTS.BACKEND_HOST_STORAGE}${material.thumbnail}`} />
                  ) : (
                    <div className={RoomStyles.noimage}>{material.title}</div>
                  )}
                  <p>{material.title}</p>
                </div>
              )
            })
          ) : (<>
            <p>検索結果がありません</p>
          </>)}
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

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { CONSTS } from "../../../Consts"
import axios from "../../../lib/axios"
import userWordStyles from './UserWord.module.scss'
import UserWordbook from "../../../components/common/UserWordbook"

export default function UserWordIndex() {
  const [ author, setAuthor ] = useState({})
  const [ flashMaterials, setFlashMaterials ] = useState([])
  const params = useParams()

  useEffect(() => {
    axios
      .get(CONSTS.GET_USERS_URL + params.name + '/words/')
      .then(res => {
        setAuthor(res.data.user)
        setFlashMaterials(res.data.materials)
      })
  }, [])

  return (
    <div className={userWordStyles.wordbookContainer}>
      {flashMaterials.map((material) => (
        <UserWordbook material={material} author={author} />
      ))}
    </div>
  )
}

import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { CONSTS } from "../../../Consts"
import { getDateAgo } from '../../../lib/dateFns'
import axios from "../../../lib/axios"
import FlashCard from "../../../components/flashes/FlashCard"
import utilStyles from '../../../styles/util.module.scss'
import userWordStyles from './UserWord.module.scss'
import Avatar from "../../../components/common/Avatar"

export default function UserWordShow() {
  const params = useParams()
  const [ user, setUser ] = useState({})
  const [ words, setWords ] = useState([])
  const [ material, setMaterial ] = useState({})
  const [ createdDate, setCreatedDate ] = useState("")

  useEffect(() => {
    axios
      .get(CONSTS.GET_USERS_URL + params.name + '/words/' + params.id)
      .then(res => {
        setUser(res.data.user)
        setWords(res.data.flashes)
        setMaterial(res.data.material)
        setCreatedDate(getDateAgo(res.data.flashes[0].created_at))
      })
  }, [])

  return (
    <div className={utilStyles.container}>
      <h1 className={userWordStyles.sectionHeadline}>
        <Link to={`/materials/${material.id}`}><img src={`${CONSTS.IMAGE_BASE64}${material.thumbnail}`} alt={material.title} />{material.title}</Link>
      </h1>
      <div className={userWordStyles.authorContainer}>
        <Link to={`/users/${user.name}/words`}>
        </Link>
        <div className={userWordStyles.authorAvatar}>
          <Avatar user={user} size="48" />
        </div>
        <div className={userWordStyles.authorMeta}>
          <h2>{user.name}</h2>
          <span>{createdDate}</span>
        </div>
      </div>
      <div>
        {words.map((word) => (
          <div key={word.id} className={userWordStyles.flashContainer}>
            <FlashCard flash={word} />
          </div>
        ))}
      </div>
    </div>
  )
}

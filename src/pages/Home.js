import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { CONSTS } from "../Consts"
import axios from "../lib/axios"
import JoinedMaterialCard from "../components/common/JoinedMaterialCard"
import homeStyles from './Home.module.scss'

export default function Home() {
  const user = useSelector(state => state.root.user.data)
  const [ joinedMaterials, setJoinedMaterials ] = useState([])
  const [ popularTopics, setPopularTopics ] = useState([])

  useEffect(() => {
    axios
      .get(CONSTS.GET_HOME_URL)
      .then(res => {
        setJoinedMaterials(res.data.materials)
      })
      .then(
        axios
          .get(CONSTS.GET_TOPICS_URL)
          .then(res => {
            let sort = res.data.topics
            sort.sort((a, b) => b.joinsCount - a.joinsCount)
            setPopularTopics(sort)
          })
      )
  }, [])

  return (
    <div>
      <div>
        { user.name ? (
          <>
          <h2>学習を続ける</h2>
          <div className={homeStyles.joinedMaterialContainer}>
            <div className={homeStyles.joinedMaterialList}>
              {joinedMaterials.map((material) => {
                return (
                  <JoinedMaterialCard key={material.id} material={material} />
                )
              })}
            </div>
          </div>
          </>
        )
      :
        (<>
          <h2>ログインして学習をはじめる</h2>
        </>)
      }
      </div>
      <div>
        <h2>人気のTopic</h2>

      </div>
    </div>
  )
}

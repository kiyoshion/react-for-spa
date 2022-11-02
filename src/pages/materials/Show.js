import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../store/userSlice'
import { CONSTS } from '../../Consts'
import { setCurrentMaterial } from "../../store/materialSlice"
import axios from "../../lib/axios"
import utilStyles from '../../styles/util.module.scss'
import materialStyles from './Material.module.scss'
import MaterialHeader from '../../components/materials/MaterialHeader'
import MaterialContents from '../../components/materials/MaterialContents'
import MaterialJoinsUser from "../../components/materials/MaterialJoinsUser"

export default function MaterialShow() {
  const [ progress, setProgress ] = useState({ done: 0, chapters: 0, value: 0 })
  const [ isLoaded, setIsLoaded ] = useState(false)
  const currentMaterial = useSelector(state => state.root.material.currentMaterial)
  const params = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser())
    axios
      .get(CONSTS.GET_MATERIALS_URL + params.id)
      .then((res) => {
        dispatch(setCurrentMaterial(res.data.material))
      })
      .then(() => {
        setProgress({
          done: currentMaterial.currentUserStatusDoneCount,
          chapters: currentMaterial.contentsChaptersCount,
          value: currentMaterial.currentUserStatusDoneCount / currentMaterial.contentsChaptersCount * 100
        })
        setIsLoaded(true)
      })
    }, [])

  return (
    <>
    {isLoaded ?
      <div>
        <MaterialHeader />
        {!currentMaterial.currentUserIsJoined ?
          <MaterialJoinsUser />
        :
          (
          <>
          <div className={materialStyles.sectionHeader}>
            <h2 style={{paddingLeft:'1rem'}}>スコア</h2>
          </div>
          <div className={materialStyles.scoreContainer}>
            <div className={materialStyles.scoreCard}>
              <span className={materialStyles.scoreLabel}>進捗</span>
              <span className={materialStyles.scoreValue}>{Math.trunc(currentMaterial.currentUserStatusDoneCount / currentMaterial.contentsChaptersCount * 100)}<span className={materialStyles.scoreValueLabel}>%</span></span>
            </div>
            <div className={materialStyles.scoreCard}>
              <span className={materialStyles.scoreLabel}>インプット</span>
              <span className={materialStyles.scoreValue}>{currentMaterial.currentUserStatusDoneCount}</span>
            </div>
            <div className={materialStyles.scoreCard}>
              <span className={materialStyles.scoreLabel}>アウトプット</span>
              <span className={materialStyles.scoreValue}>{currentMaterial.currentUserOutputCount}</span>
            </div>
          </div>
          </>
          )
        }
        <div className={utilStyles.container}>
          <MaterialContents />
        </div>
      </div>
    :
      <div>Loading...</div>
    }
    </>
  )
}

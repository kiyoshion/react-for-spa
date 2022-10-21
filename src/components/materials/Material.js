import axios from "../../lib/axios"
import { useCallback, useEffect, useState } from "react"
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../store/userSlice'
import { CONSTS } from '../../Consts'
import { getDateAgo } from '../../lib/dateFns'
import { setCurrentMaterial } from "../../store/materialSlice"
import MaterialHeader from './MaterialHeader'
import MaterialSections from './MaterialSections'
import OutputModal from '../modals/OutputModal'
import utilStyles from '../../styles/util.module.scss'
import MaterialStyles from './Material.module.scss'
import { setJoinTopicModal } from "../../store/modalSlice"
import Avatar from "../common/Avatar"

export default function Material() {
  const [ isLoaded, setIsLoaded ] = useState(false)
  const [ sectionArray, setSectionArray ] = useState([])
  const [ calcStatus, setCalcStatus ] = useState([
    { id: "", total: 0}
  ])
  const params = useParams()
  const dispatch = useDispatch()

  const currentSection = useSelector(state => state.section.currentSection)
  const currentMaterial = useSelector(state => state.material.currentMaterial)

  const groupBy = (xs, key) => {
    return xs.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x)
      return rv
    }, {})
  }

  useEffect(() => {
      dispatch(getUser())
      axios
          .get(CONSTS.GET_MATERIALS_URL + params.id)
          .then((res) => {
            dispatch(setCurrentMaterial(res.data.material))
            let groups = groupBy(res.data.material.sections, 'parent_id')
            const arr = Object.entries(groups)
            setSectionArray(arr)
          })
          .then(res => {
            setIsLoaded(true)
          })
      }, [])

  const handleJoinTopicModal = (bool) => {
    dispatch(setJoinTopicModal(bool))
  }

  return (
    <>
    { isLoaded ?
      <div>
        <MaterialHeader material={currentMaterial} />
        <div className={MaterialStyles.joinedUserContainer}>
          <div className={MaterialStyles.buttonCircleContainer}>
            <div className={`${MaterialStyles.buttonCircleLarge} ${MaterialStyles.anime}`}></div>
            <div className={`${MaterialStyles.buttonCircle} ${MaterialStyles.animeSmall}`} onClick={() => handleJoinTopicModal(true)}>
              <span>+</span>
            </div>
            <span>Join!</span>
          </div>
          { currentMaterial.joins?.map((join) => {
            return (
              <div key={join.user.id} className={MaterialStyles.joinedUserList}>
                <div className={MaterialStyles.joinedUserInner}>
                  <Avatar user={join.user} size="48" />
                  <span>{getDateAgo(join.created_at)}</span>
                </div>
              </div>
            )
          })}
        </div>
        <div className={utilStyles.container}>
          <MaterialSections material={currentMaterial} sectionArray={sectionArray} />
        </div>
      </div>
    :
      <div>Loading...</div>
    }
    </>
  )
}

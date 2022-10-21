import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setOpenOutputModal } from '../../store/modalSlice'
import { setCurrentSection } from '../../store/sectionSlice'
import materialStyles from './Material.module.scss'
import { CONSTS } from '../../Consts'
import axios from '../../lib/axios'
import { setCurrentMaterial } from '../../store/materialSlice'

export default function MaterialSections(props) {
  const dispatch = useDispatch()
  const openOutputModal = useSelector(state => state.modal.openOutputModal)
  const currentMaterial = useSelector(state => state.material.currentMaterial)
  const [ percent, setPercent ] = useState(0)

  const handleOpenOutput = (title, id, parentId) => {
    const parent = props.material.sections.filter(section =>
      section.level === 0 && section.parent_id === parentId
    )
    dispatch(setCurrentSection({
      title: title,
      id: id,
      parentTitle: parent[0].title
    }))
    dispatch(setOpenOutputModal(!openOutputModal))
  }

  const checkPercent = () => {
    let parent = currentMaterial.sectionsChildrenCount
    let children = 0
    currentMaterial.sections.map((section) => {
      if (section.currentUserStatus && section.currentUserStatus === 'done') {
        children++
      }
    })
    let result = 125 - (125 * (children / parent * 100) / 100)
    if (result === 125) { result = 126 }
    // console.log(result)
    // calc(125 - (125 * 75) / 100)
    setPercent(result)
  }

  const handleChangeStatus = (sid, value) => {
    let result = value === 'now' ? 'done' : 'now'

    axios
      .post(CONSTS.STORE_STATUS_URL, {
        value: result,
        section_id: sid,
        material_id: currentMaterial.id
      })
      .then(res => {
        dispatch(setCurrentMaterial(res.data.material))
        checkPercent()
      })
  }

  useEffect(() => {
    checkPercent()
  })

  return (
    <>
    {props.sectionArray.map((section) => (
      <div key={section[0]} className={materialStyles.sectionContainer}>
        {section[1].map((section, i, el) => (
          section.level === 0 ?
            (
              <div key={section.id} className={materialStyles.flexbox}>
                <div className={materialStyles.percentContainer}>
                  <div className={materialStyles.percent}>
                    <svg className={materialStyles.svg}>
                      <circle className={materialStyles.base} cx="20" cy="20" r="16"></circle>
                      <circle className={materialStyles.line} cx="20" cy="20" r="16" style={{ strokeDashoffset: percent }}></circle>
                    </svg>
                  </div>
                  <div className={materialStyles.borderContainer}>
                    <svg>
                      <line className={materialStyles.border} x1="0" y1="0" x2="0" y2="50" />
                    </svg>
                  </div>
                </div>
                <h2>{section.title}</h2>
              </div>
            )
          :
            (
              <div key={section.id} className={materialStyles.flexbox}>
                <div className={`${materialStyles.statusContainer} ${(section[i+1] && section[i+1].level === 1) && materialStyles.end}`} onClick={() => handleChangeStatus(section.id, section.statuses[0]?.value)}>
                  { section.statuses.length === 0 && <div className={materialStyles.statusNoneContainer}><span></span></div> }
                  { section.statuses[0]?.value === 'now' && <><div className={materialStyles.statusNowContainer}><span className={`${materialStyles.statusNowLarge} ${materialStyles.animeScaleUp}`}></span><span className={materialStyles.statusNow}></span></div></> }
                  { section.statuses[0]?.value === 'done' && <div className={materialStyles.check}>
                    <svg x="0px" y="0px" viewBox="0 0 32 32" style={{ enableBackground: 'new 0 0 32 32' }}>
                      <g>
                        <g id="check">
                          <g>
                            <polygon points="11.941,28.877 0,16.935 5.695,11.24 11.941,17.486 26.305,3.123 32,8.818 			"/>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div> }
                  <div className={materialStyles.borderContainer}>
                    <svg>
                      <line className={materialStyles.border} x1="0" y1="0" x2="0" y2="50" />
                    </svg>
                  </div>
                </div>
                <div className={materialStyles.section}>
                  <Link to={`/sections/${section.id}`}></Link>
                  <h3>{section.title} ({`${section.outputCount + section.flashCount}`})</h3>
                  <p>{ section.currentUserOutputs && section.currentUserOutputs.body }</p>
                  <span
                    className={materialStyles.outputButton}
                    onClick={() => handleOpenOutput(section.title, section.id, section.parent_id)}
                  >out</span>
                </div>
              </div>
            )
          )
        )}
      </div>
    ))}
    </>
  )
}

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setOpenOutputModal } from '../../store/modalSlice'
import materialStyles from './Material.module.scss'
import { CONSTS } from '../../Consts'
import axios from '../../lib/axios'
import { setCurrentMaterial } from '../../store/materialSlice'
import { setCurrentChapter } from '../../store/chapterSlice'

export default function MaterialContents() {
  const [ toggleIsOpenAllContent, setToggleIsOpenAllContent ] = useState(true)
  const [ isOpenContent, setIsOpenContent ] = useState([true])
  const dispatch = useDispatch()
  const openOutputModal = useSelector(state => state.modal.openOutputModal)
  const currentMaterial = useSelector(state => state.material.currentMaterial)

  const handleOpenOutput = (title, id, contentId) => {
    const parent = currentMaterial.contents.filter(content => content.id === contentId)
    dispatch(setCurrentChapter({
      title: title,
      id: id,
      contentTitle: parent[0].title
    }))
    dispatch(setOpenOutputModal(!openOutputModal))
  }

  const handleChangeStatus = (cid, value) => {
    let result = value === 'now' ? 'done' : 'now'

    axios
      .post(CONSTS.STORE_STATUS_URL, {
        value: result,
        chapter_id: cid,
        material_id: currentMaterial.id
      })
      .then(res => {
        dispatch(setCurrentMaterial(res.data.material))
      })
  }

  const toggleIsOpenContent = (i) => {
    setIsOpenContent(
      isOpenContent.map((val, index) => (index === i ? !val : val))
    )
  }

  const toggleAll = () => {
    toggleIsOpenAllContent ? setIsOpenContent(isOpenContent.map(() => (false))) : setIsOpenContent(isOpenContent.map(() => (true)))
    setToggleIsOpenAllContent(!toggleIsOpenAllContent)
  }

  const getProgress = (content) => {
    return 100 - ( 100 * ( content.currentUserStatusDoneCount / content.chaptersCount ) )
  }

  useEffect(() => {
    currentMaterial.contents.map(() => {
      setIsOpenContent((prev) => [...prev, true])
    })
  }, [])

  return (
    <div className={materialStyles.contentList}>
      <div className={materialStyles.sectionHeader}>
        <h2>レクチャー</h2>
        <span onClick={toggleAll}>すべて{toggleIsOpenAllContent ? '非表示' : '表示'}</span>
      </div>
      {currentMaterial.contents.map((content, i) => (
        <div
          key={content.id}
          className={`${materialStyles.sectionContainer} ${!isOpenContent[i+1] && materialStyles.hideChapter}`}
        >
          <div
            className={`${materialStyles.flexbox} ${materialStyles.contentContainer}`}
            onClick={() => toggleIsOpenContent(i+1)}
          >
            <div className={materialStyles.percentContainer}>
              <div className={materialStyles.percent}>
                <svg className={materialStyles.svg}>
                  <circle className={materialStyles.base} cx="20" cy="20" r="16"></circle>
                  <circle className={materialStyles.line} cx="20" cy="20" r="16" style={{ strokeDashoffset: getProgress(content) }}></circle>
                </svg>
              </div>
              <div className={materialStyles.borderContainer}>
                <svg>
                  <line className={materialStyles.border} x1="0" y1="0" x2="0" y2="50" />
                </svg>
              </div>
            </div>
            <h2>{content.title}</h2>
            <div className={materialStyles.contentToggleArrow}>
              <svg viewBox="0 0 512 512">
                <polygon points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 "/>
              </svg>
            </div>
          </div>
          {content.chapters.map((chapter, i, el) => (
            (
              <div
                key={chapter.id}
                className={`${materialStyles.flexbox} ${materialStyles.chapterContainer}`}
              >
                <div
                  className={`${materialStyles.statusContainer} ${(chapter[i+1] && chapter[i+1] === 1) && materialStyles.end}`}
                  onClick={() => handleChangeStatus(chapter.id, chapter.statuses[0]?.value)}
                >
                  {chapter.statuses.length === 0 &&
                    <div className={materialStyles.statusNoneContainer}>
                      <span></span>
                    </div>
                  }
                  {chapter.statuses[0]?.value === 'now' &&
                    <div
                      className={materialStyles.statusNowContainer}
                    >
                      <span
                        className={`${materialStyles.statusNowLarge} ${materialStyles.animeScaleUp}`}
                      ></span>
                      <span
                        className={materialStyles.statusNow}></span>
                    </div>
                  }
                  {chapter.statuses[0]?.value === 'done' &&
                    <div className={materialStyles.check}>
                      <svg x="0px" y="0px" viewBox="0 0 32 32" style={{ enableBackground: 'new 0 0 32 32' }}>
                        <g id="check">
                          <polygon points="11.941,28.877 0,16.935 5.695,11.24 11.941,17.486 26.305,3.123 32,8.818"/>
                        </g>
                      </svg>
                    </div>
                  }
                  <div className={materialStyles.borderContainer}>
                    <svg>
                      <line className={materialStyles.border} x1="0" y1="0" x2="0" y2="50" />
                    </svg>
                  </div>
                </div>
                <div className={materialStyles.section}>
                  <Link to={`/chapters/${chapter.id}`}></Link>
                  <h3>{chapter.title}
                    ({`${chapter.memosCount + chapter.flashesCount}`})
                  </h3>
                  <p>{chapter.currentUserMemo ? chapter.currentUserMemo.body : '-'}</p>
                  <span
                    className={materialStyles.outputButton}
                    onClick={() => handleOpenOutput(chapter.title, chapter.id, chapter.content_id)}
                  >out</span>
                </div>
              </div>
            )
          ))}
        </div>
      ))}
    </div>
  )
}

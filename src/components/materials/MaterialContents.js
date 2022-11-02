import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setOpenOutputModal } from '../../store/modalSlice'
import { CONSTS } from '../../Consts'
import { setCurrentMaterial } from '../../store/materialSlice'
import { setCurrentChapter } from '../../store/chapterSlice'
import materialContentsStyle from './MaterialContents.module.scss'
import axios from '../../lib/axios'
import IconAvatarNoname from '../icons/IconAvatarNoname'
import IconOutput from '../icons/IconOutput'

export default function MaterialContents() {
  const [ toggleIsOpenAllContent, setToggleIsOpenAllContent ] = useState(false)
  const [ isOpenContent, setIsOpenContent ] = useState([false])
  const dispatch = useDispatch()
  const openOutputModal = useSelector(state => state.root.modal.openOutputModal)
  const currentMaterial = useSelector(state => state.root.material.currentMaterial)

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

  const getCurrentUserOutput = (chapter) => {
    if (chapter.currentUserMemo) {
      return chapter.currentUserMemo.body
    } else if (chapter.currentUserFlash) {
      return chapter.currentUserFlash.front_title
    } else {
      return '-'
    }
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
    let result = 100 - ( 100 * ( content.currentUserStatusDoneCount / content.chaptersCount ) )
    let color = result === 100 ? '#efefef' : 'rgb(85, 214, 212)'
    return { strokeDashoffset: result, stroke: color }
  }

  const getCurrentChapterURL = (id) => {
    return currentMaterial.joinsCurrentUserTopic ?
      `/chapters/${id}?topic=${currentMaterial.joinsCurrentUserTopic.topic_id}`
      : `/chapters/${id}`
  }

  useEffect(() => {
    currentMaterial.contents.map(() => {
      setIsOpenContent((prev) => [...prev, false])
    })
  }, [])

  return (
    <div className={materialContentsStyle.contentList}>
      <div className={materialContentsStyle.sectionHeader}>
        <h2>レクチャー</h2>
        <span onClick={toggleAll}>すべて{toggleIsOpenAllContent ? '非表示' : '表示'}</span>
      </div>
      {currentMaterial.contents.map((content, i) => (
        <div
          key={content.id}
          className={`${materialContentsStyle.sectionContainer} ${!isOpenContent[i+1] && materialContentsStyle.hideChapter}`}
        >
          <div
            className={`${materialContentsStyle.flexbox} ${materialContentsStyle.contentContainer}`}
            onClick={() => toggleIsOpenContent(i+1)}
          >
            <div className={materialContentsStyle.percentContainer}>
              <div className={materialContentsStyle.percent}>
                <svg className={materialContentsStyle.svg}>
                  <circle className={materialContentsStyle.base} cx="20" cy="20" r="16"></circle>
                  <circle className={materialContentsStyle.line} cx="20" cy="20" r="16" style={ getProgress(content)}></circle>
                </svg>
              </div>
              <div className={materialContentsStyle.borderContainer}>
                <svg>
                  <line className={materialContentsStyle.border} x1="0" y1="0" x2="0" y2="50" />
                </svg>
              </div>
            </div>
            <div className={materialContentsStyle.contentTitleContainer}>
              <h2>{content.title}</h2>
              <span>{content.currentUserStatusDoneCount} / {content.chaptersCount}</span>
            </div>
            <div className={materialContentsStyle.contentToggleArrow}>
              <svg viewBox="0 0 512 512">
                <polygon points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 "/>
              </svg>
            </div>
          </div>
          {content.chapters.map((chapter, j, el) => (
            (
              <div
                key={chapter.id}
                className={`${materialContentsStyle.flexbox} ${materialContentsStyle.chapterContainer}`}
              >
                <div
                  className={`${materialContentsStyle.statusContainer} ${(chapter[j+1] && chapter[j+1] === 1) && materialContentsStyle.end}`}
                  onClick={() => {handleChangeStatus(chapter.id, chapter.currentUserStatus?.value)}}
                >
                  {chapter.currentUserStatus === null &&
                    <div className={materialContentsStyle.statusNoneContainer}>
                      <span></span>
                    </div>
                  }
                  {chapter.currentUserStatus?.value === 'pause' &&
                    <div
                      className={materialContentsStyle.statusPauseContainer}
                    >
                      <div className={materialContentsStyle.statusPause}>
                        <svg x="12px" y="12px" viewBox="0 0 1000 1000">
                        <path d="M745,10c-69.6,0-126,21.4-126,91v798c0,69.6,56.4,91,126,91c69.6,0,126-21.4,126-91V101C871,31.4,814.6,10,745,10z"/><path d="M255,10c-69.6,0-126,21.4-126,91v798c0,69.6,56.4,91,126,91c69.6,0,126-21.4,126-91V101C381,31.4,324.6,10,255,10z"/>
                        </svg>
                      </div>
                    </div>
                  }
                  {chapter.currentUserStatus?.value === 'now' &&
                    <div
                      className={materialContentsStyle.statusNowContainer}
                    >
                      <span
                        className={`${materialContentsStyle.statusNowLarge} ${materialContentsStyle.animeScaleUp}`}
                      ></span>
                      <span
                        className={materialContentsStyle.statusNow}></span>
                    </div>
                  }
                  {chapter.currentUserStatus?.value === 'done' &&
                    <div className={materialContentsStyle.check}>
                      <svg x="0px" y="0px" viewBox="0 0 32 32" style={{ enableBackground: 'new 0 0 32 32' }}>
                        <g id="check">
                          <polygon points="11.941,28.877 0,16.935 5.695,11.24 11.941,17.486 26.305,3.123 32,8.818"/>
                        </g>
                      </svg>
                    </div>
                  }
                  <div className={materialContentsStyle.borderContainer}>
                    <svg>
                      <line className={materialContentsStyle.border} x1="0" y1="0" x2="0" y2="50" />
                    </svg>
                  </div>
                </div>
                <div className={materialContentsStyle.section}>
                  <Link to={getCurrentChapterURL(chapter.id)}></Link>
                  <h3>{chapter.title}</h3>
                  <p>{getCurrentUserOutput(chapter)}</p>
                  {/* <div style={{display:'flex',alignItems:'center', margin:'0.25rem 0 0'}}>
                    <div style={{display:'flex',alignItems:'center',marginRight:'1rem'}}>
                      <IconAvatarNoname size="14" />
                      <span style={{fontSize:'.8rem',marginLeft:'.5rem', color:'#aaa'}}>{chapter.statusesNowCount}</span>
                    </div>
                    <div style={{display:'flex',alignItems:'center'}}>
                      <IconOutput size="14" fill="#aaa" />
                      <span style={{fontSize:'.8rem',marginLeft:'.5rem', color:'#aaa'}}>{chapter.flashesCount + chapter.memosCount}</span>
                    </div>
                  </div> */}
                  <div
                    className={materialContentsStyle.outputButton}
                    style={{width:'24px', height:'24px',top: '1rem',right:'-.5rem'}}
                    onClick={() => {currentMaterial.currentUserIsJoined && handleOpenOutput(chapter.title, chapter.id, chapter.content_id)}}
                  >
                    <IconOutput size="24" fill="#bbb" />
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      ))}
    </div>
  )
}

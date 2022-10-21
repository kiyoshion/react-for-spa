import axios from "../../lib/axios"
import { useEffect, useState } from "react"
import { Link, useParams } from 'react-router-dom'
import { getDateAgo } from '../../lib/dateFns'
import utilStyles from '../../styles/util.module.scss'
import { useDispatch } from 'react-redux'
import { getUser } from '../../store/userSlice'
import FlashCard from '../flashes/FlashCard'
import sectionStyles from './Section.module.scss'
import { CONSTS } from "../../Consts"
import Avatar from "../common/Avatar"

export default function Section() {
  const [ section, setSection ] = useState({
    title: "",
    parentSection: {},
    material: {},
    outputs: [],
    flashes: [],
  })
  const [ isLoaded, setIsLoaded ] = useState(false)
  const [ feeds, setFeeds ] = useState([])
  const params = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser())
    const fetchData = async () => {
      await axios
        .get(CONSTS.GET_SECTION_URL + params.id)
        .then((res) => {
          setSection(res.data.section)

          let tmpFeeds = []
          let compFeeds = []
          let sort = ""

          if (res.data.section.level === 0) {
            let secs = res.data.section.material.sections
            secs.map((sec) => {
              if (sec.level !== 0) {
                sec.outputs.length > 0 && tmpFeeds.push(sec.outputs)
                sec.flashes.length > 0 && tmpFeeds.push(sec.flashes)
              }
            })
            tmpFeeds.map((feed) => {
              feed.map((f) => {
                compFeeds.push(f)
              })
            })
            sort = compFeeds.sort((a, b) => {
              return (a.created_at > b.created_at) ? -1 : 1
            })
          } else {
            tmpFeeds = res.data.section.flashes.concat(res.data.section.outputs)
            sort = tmpFeeds.sort((a, b) => {
              return (a.created_at > b.created_at) ? -1 : 1
            })
          }
          setFeeds(sort)
        })
        .then(() => {
          setIsLoaded(true)
        })
    }
    fetchData()
    }, [])

  return (
    <>
    { isLoaded ?
      (
        <div className={utilStyles.container}>
          <div className={sectionStyles.inlineHeadlineContainer}>
            <div className={sectionStyles.backLink}>
              <Link to={`/materials/${section.material.id}`}>←</Link>
            </div>
            <img width="20" src={`${CONSTS.BACKEND_HOST_STORAGE}${section.material.thumbnail}`} alt={section.material.title} />
            <h1 className={sectionStyles.inlineHeadline}>{section.material.title}
            <Link
              to={`/sections/${section.parentSection.id}`}
            ><span className={sectionStyles.subTitle}>{section.parentSection.title}</span></Link>
            { section.level !== 0 && (<span className={sectionStyles.subTitle}>{section.title}</span>) }
            </h1>
          </div>
          <div className={sectionStyles.filterContainer}>
            {section.material.topics.map((topic) => {
              return (
                <span key={topic.id}>{topic.name}</span>
              )
            })}
          </div>
          { feeds.map(feed => (
            <div key={feed.id}>
              <div className={sectionStyles.feedContainer}>
                <div className={sectionStyles.feedHeader}>
                  <div className={sectionStyles.feedHeaderLeft}>
                    <div className={sectionStyles.avatar}>
                      <Avatar user={feed.user} size="32" />
                    </div>
                    <div className={sectionStyles.feedmeta}>
                      <h3 className={sectionStyles.username}>
                        {feed.user.name}
                      </h3>
                      <span className={sectionStyles.date}>{getDateAgo(feed.created_at)}</span>
                    </div>
                  </div>
                </div>
                <div>
                  { feed.hasOwnProperty('body') ?
                    <div className={sectionStyles.outputCard}>
                      <p>{feed.body}</p>
                    </div>
                  :
                    <div>
                      <FlashCard key={feed.id} flash={feed} />
                    </div>
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
      )
    : (
      <>Loading...</>
    )}
    </>
  )
}

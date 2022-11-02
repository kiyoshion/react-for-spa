import { useEffect, useState } from "react"
import { Link, useParams } from 'react-router-dom'
import { getDateAgo } from '../../lib/dateFns'
import { CONSTS } from "../../Consts"
import axios from "../../lib/axios"
import Avatar from "../../components/common/Avatar"
import FlashCard from '../../components/flashes/FlashCard'
import utilStyles from '../../styles/util.module.scss'
import chapterStyles from './Chapter.module.scss'

export default function ChapterShow() {
  const [ chapter, setChapter ] = useState({})
  const [ isLoaded, setIsLoaded ] = useState(false)
  const [ feeds, setFeeds ] = useState([])
  const params = useParams()

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(CONSTS.GET_CHAPTER_URL + params.id)
        .then((res) => {
          setChapter(res.data.chapter)
          let tmpFeeds = []
          let sort = []

          tmpFeeds = res.data.chapter.flashes.concat(res.data.chapter.memos)
          sort = tmpFeeds.sort((a, b) => {
            return (a.created_at > b.created_at) ? -1 : 1
          })

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
          <div className={chapterStyles.inlineHeadlineContainer}>
            <h1 className={chapterStyles.inlineHeadline}>
              <Link to={`/materials/${chapter.content.material_id}`}>
                <img src={`${CONSTS.IMAGE_BASE64}${chapter.content.material.thumbnail}`} alt={chapter.content.material.title} />
                {chapter.content.material.title}
              </Link>
            <Link
              to={`/sections/${chapter.content.id}`}
            ><span className={chapterStyles.subTitle}>{chapter.content.title}</span></Link>
            <span className={chapterStyles.subTitle}>{chapter.title}</span>
            </h1>
          </div>
          <div className={chapterStyles.filterContainer}>
            {chapter.content.material.topics?.map((topic) => {
              return (
                <span key={topic.id} className={`${utilStyles.tagButton} ${utilStyles.tagButtonWhite}`}>{topic.name}</span>
              )
            })}
          </div>
          { feeds.map(feed => (
            <div key={feed.id}>
              <div className={chapterStyles.feedContainer}>
                <div className={chapterStyles.feedHeader}>
                  <div className={chapterStyles.feedHeaderLeft}>
                    <div className={chapterStyles.avatar}>
                      <Avatar user={feed.user} size="32" />
                    </div>
                    <div className={chapterStyles.feedmeta}>
                      <h3 className={chapterStyles.username}>
                        {feed.user.name}
                      </h3>
                      <span className={chapterStyles.date}>{getDateAgo(feed.created_at)}</span>
                    </div>
                  </div>
                </div>
                <div>
                  { feed.hasOwnProperty('body') ?
                    <div className={chapterStyles.outputCard}>
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

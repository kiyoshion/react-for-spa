import axios from "../../lib/axios"
import { useEffect, useState } from "react"
import { Link, useParams } from 'react-router-dom'
import { format } from 'date-fns'
import utilStyles from '../../styles/util.module.scss'
import { useDispatch } from 'react-redux'
import { getUser } from '../../store/userSlice'
import FlashCard from '../flashes/FlashCard'
import sectionStyles from './Section.module.scss'

export default function Section() {
  const [ section, setSection ] = useState({
    title: "",
    parentSection: {},
    material: {},
    outputs: [],
    flashes: [],
  })
  const [ feeds, setFeeds ] = useState([])
  const getSectionURL = '/api/sections/'
  const params = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser())
    const fetchData = async () => {
      await axios
          .get(getSectionURL + params.id)
          .then((res) => {
            setSection(res.data.section)
            const tmpFedds = res.data.section.flashes.concat(res.data.section.outputs)
            let sort = tmpFedds.sort((a, b) => {
              return (a.created_at > b.created_at) ? -1 : 1
            })
            // const parent = section.filter(section =>
            //   section.level === 0 && section.parent_id === parentId
            // )
            setFeeds(sort)
          })
    }
    fetchData()
    }, [])

  return (
    <div className={utilStyles.container}>
      <Link to={`/materials/${section.material.id}`}>←</Link>
      <h1 className={sectionStyles.inlineHeadline}>{section.material.title} - {section.parentSection.title} - {section.title}</h1>
      {feeds.map(feed => (
        <div key={feed.id}>
          {feed.hasOwnProperty('body') ? (
            <>
              <div className={sectionStyles.feedContainer}>
                <div>
                  {feed.user.name}
                </div>
                <span className={sectionStyles.date}>{format(new Date(feed.created_at), 'yy/MM/dd HH:mm')}</span>
              </div>
              <div className={sectionStyles.outputCard}>
                {feed.body}
              </div>
            </>
          ) : (
            <>
              <div className={sectionStyles.feedContainer}>
                <div>{feed.user.name}</div>
                <span className={sectionStyles.date}>{format(new Date(feed.created_at), 'yy/MM/dd HH:mm')}</span>
              </div>
              <FlashCard key={feed.id} flash={feed} />
            </>
          )}
        </div>
      ))}
      {/* <div>
        {section.outputs.map(output => (
          <div
            key={output.id}
          >
            <div className={sectionStyles.feedContainer}>
              <div>
                {output.user.name}
              </div>
              <span className={sectionStyles.date}>{format(new Date(output.created_at), 'yy/MM/dd HH:mm')}</span>
            </div>
            <div className={sectionStyles.outputCard}>
              {output.body}
            </div>
          </div>
        ))}
      </div>
      <div>
        {section.flashes.map(flash => (
          <div key={flash.id}>
            <div className={sectionStyles.feedContainer}>
              <div>{flash.user.name}</div>
              <span className={sectionStyles.date}>{format(new Date(flash.created_at), 'yy/MM/dd HH:mm')}</span>
            </div>
            <FlashCard key={flash.id} flash={flash} />
          </div>
        ))}
      </div> */}
    </div>
  )
}

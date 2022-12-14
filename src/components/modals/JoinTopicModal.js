import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CONSTS } from "../../Consts"
import axios from "../../lib/axios"
import { setCurrentMaterial } from "../../store/materialSlice"
import { setJoinTopicModal  } from "../../store/modalSlice"
import joinTopicModalStyles from './JoinTopicModal.module.scss'

export default function JoinTopicModal({ material }) {
  const [ inputTopic, setInputTopic ] = useState("")
  const [ selectedTopic, setSelectedTopic ] = useState(false)
  const [ joinTopics, setJoinTopics ] = useState([])
  const [ totalCount, setTotalCount ] = useState(0)
  const user = useSelector(state => state.root.user.data)
  const dispatch = useDispatch()

  const handleStoreTopic = () => {
    const params = {
      name: inputTopic,
      lang: 'ja',
      material_id: material.id,
      user_id: user.id
    }
    axios
      .post(CONSTS.STORE_TOPIC_URL, params)
      .then(res => {
        dispatch(setCurrentMaterial(res.data.material))
        dispatch(setJoinTopicModal(false))
      })
  }

  const getBarWidth = (count) => {
    return count / totalCount * 100 +'%'
  }

  const handleSelectName = (name) => {
    if (inputTopic === name) {
      setInputTopic("")
      setSelectedTopic(false)
    } else {
      setInputTopic(name)
      setSelectedTopic(true)
    }
  }

  useEffect(() => {
    let sort = []
    let total = 0
    let tmp = [...material.topicsUserCount]
    if (tmp.length > 0) {
      sort = tmp.sort((a, b) => {
        return (a.count > b.count) ? -1 : 1
      })
    }
    tmp?.map((t) => {
      total += t.count
    })
    setTotalCount(total)
    setJoinTopics(sort)
  }, [])

  return (
    <>
    <div className={`${joinTopicModalStyles.container}`}>
      <div className={joinTopicModalStyles.inner}>
        <div className={joinTopicModalStyles.headline}>
          <img
            className={joinTopicModalStyles.thumbnail}
            src={`${CONSTS.IMAGE_BASE64}${material.thumbnail}`}
            alt={material.title} />
          <span>{material.title}??????????????????????????????</span>
        </div>
        <div className={joinTopicModalStyles.topicChartContainer}>
          <div className={joinTopicModalStyles.topicChartHeadline}>
            <h3>?????????Topics</h3>
            <span>
              <span className={joinTopicModalStyles.topicChartHeadlineNumber}>{material.joinsUserCount}</span>
              ???????????????
            </span>
          </div>
          <div className={joinTopicModalStyles.topicValueList}>
            {joinTopics.length > 0 ?
              joinTopics.map((topic) => {
                return (
                  <div key={topic.id} className={joinTopicModalStyles.topicValueContainer}>
                    <div
                      className={`${joinTopicModalStyles.topicName} ${
                        inputTopic === topic.name && joinTopicModalStyles.selected
                      }`}
                      onClick={() => handleSelectName(topic.name)}
                    >
                      <div className={joinTopicModalStyles.check}>
                        <svg x="0px" y="0px" viewBox="0 0 32 32" style={{ enableBackground: 'new 0 0 32 32' }}>
                          <g>
                            <g id="check">
                              <g>
                                <polygon points="11.941,28.877 0,16.935 5.695,11.24 11.941,17.486 26.305,3.123 32,8.818 			"/>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </div>
                      <span>{topic.name}</span>
                    </div>
                    <div className={joinTopicModalStyles.topicBarContainer}>
                      <div
                        className={joinTopicModalStyles.topicBar}
                        style={{ width: getBarWidth(topic.count) }}
                      ></div>
                    </div>
                    <div className={joinTopicModalStyles.topicNumber}>
                      <span>{topic.count}</span>
                      <span>???</span></div>
                  </div>
                )
              })
              :
              (<div>??????Topic??????????????????</div>)
            }
          </div>
          <div className={`${joinTopicModalStyles.form}`}>
            <label htmlFor="newTopic">?????????Topic?????????</label>
            { selectedTopic && <span>{inputTopic}????????????</span>}
            <input
              id="newTopic"
              type="text"
              placeholder="Topic?????????"
              disabled={selectedTopic}
              value={inputTopic}
              onChange={(e) => setInputTopic(e.target.value)}
            />
          </div>
        </div>
        <div className={joinTopicModalStyles.footer}>
          <div className={joinTopicModalStyles.footerInner}>
            <button
              className={joinTopicModalStyles.buttonLarge}
              onClick={handleStoreTopic}
            >{inputTopic && `${inputTopic}???`}?????????????????????</button>
            <button
              className={joinTopicModalStyles.buttonCancel}
              onClick={() => dispatch(setJoinTopicModal(false))}
            >???????????????</button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

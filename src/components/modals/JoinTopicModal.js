import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CONSTS } from "../../Consts"
import axios from "../../lib/axios"
import { setCurrentMaterial } from "../../store/materialSlice"
import { setJoinTopicModal  } from "../../store/modalSlice"
import joinTopicModalStyles from './JoinTopicModal.module.scss'

export default function JoinTopicModal(props) {
  const [ inputTopic, setInputTopic ] = useState("")
  const [ selectedTopic, setSelectedTopic ] = useState(false)
  const [ joinTopics, setJoinTopics ] = useState([])
  const [ totalCount, setTotalCount ] = useState(0)
  const joinTopicModal = useSelector(state => state.modal.joinTopicModal)
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()

  const handleStoreTopic = () => {
    const params = {
      name: inputTopic,
      lang: 'ja',
      material_id: props.material.id,
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
    let tmp = [...props.material.topicsUserCount]
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
    <div className={joinTopicModalStyles.container}>
      <div className={joinTopicModalStyles.inner}>
        <div className={joinTopicModalStyles.headline}>
          <img
            className={joinTopicModalStyles.thumbnail}
            src={`${CONSTS.BACKEND_HOST_STORAGE}${props.material.thumbnail}`}
            alt={props.material.title} />
          <span>{props.material.title}で何を学習しますか？</span>
        </div>
        <div className={joinTopicModalStyles.topicChartContainer}>
          <div className={joinTopicModalStyles.topicChartHeadline}>
            <h3>人気のTopics</h3>
            <span>
              <span className={joinTopicModalStyles.topicChartHeadlineNumber}>{props.material.joinsUserCount}</span>
              人が参加中
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
                      <span>人</span></div>
                  </div>
                )
              })
              :
              (<div>まだTopicがありません</div>)
            }
          </div>
          <div className={`${joinTopicModalStyles.form}`}>
            <label htmlFor="newTopic">新しいTopicを追加</label>
            { selectedTopic && <span>{inputTopic}を選択中</span>}
            <input
              id="newTopic"
              type="text"
              placeholder="Topicの名前"
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
            >{inputTopic && `${inputTopic}の`}学習をはじめる</button>
            <button
              className={joinTopicModalStyles.buttonCancel}
              onClick={() => dispatch(setJoinTopicModal(false))}
            >キャンセル</button>
          </div>
        </div>
      </div>
    </div>
  )
}

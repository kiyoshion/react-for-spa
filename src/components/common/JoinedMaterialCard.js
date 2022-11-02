import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { CONSTS } from "../../Consts"
import joinedMaterialCardStyles from './JoinedMaterialCard.module.scss'

export default function JoinedMaterialCard({ material }) {
  const [ progress, setProgress ] = useState({ done: 0, chapters: 0, value: "" })

  useEffect(() => {
    let done = 0
    let chapters = 0
    material.contents.map((content) => {
      done += content.currentUserStatusDoneCount
      chapters += content.chaptersCount
    })
    setProgress({ done: done, chapters: chapters, value: done / chapters * 100 + '%'})
  }, [])

  return (
    <div key={material.id} className={joinedMaterialCardStyles.cardContainer}>
      <Link className={joinedMaterialCardStyles.link} to={`/materials/${material.id}`}></Link>
      <div className={joinedMaterialCardStyles.lapContainer}>
        <div className={joinedMaterialCardStyles.lapInner}>
          <span className={joinedMaterialCardStyles.lapValue}>1</span>
          <span>st</span>
        </div>
      </div>
      <div className={joinedMaterialCardStyles.cardInner}>
        <img
          className={joinedMaterialCardStyles.cardInnerImg}
          src={`${CONSTS.IMAGE_BASE64}${material.thumbnail}`} alt={material.title}
        />
        <div className={joinedMaterialCardStyles.cardInnerMeta}>
          <div className={joinedMaterialCardStyles.cardInnerMetaHeader}>
            <h3>{material.title}</h3>
            <span>{material.type.name}</span>
            <span>{material.joinsCurrentUserTopic.topic.name}</span>
          </div>
          <div className={joinedMaterialCardStyles.progressContainer}>
            <div className={joinedMaterialCardStyles.progressParentBarContainer}>
              <div className={joinedMaterialCardStyles.progressParentBar}></div>
            </div>
            <div className={joinedMaterialCardStyles.progressBarContainer}>
              <div className={joinedMaterialCardStyles.progressValue}>
                <span className={joinedMaterialCardStyles.progressValueDone}>{progress.done}</span>
                /
                <span className={joinedMaterialCardStyles.progressValueChapters}>{progress.chapters}</span>
              </div>
              <div
                className={joinedMaterialCardStyles.progressBar}
                style={{ width: progress.value }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

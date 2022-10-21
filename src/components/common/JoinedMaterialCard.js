import { Link } from "react-router-dom"
import { CONSTS } from "../../Consts"
import joinedMaterialCardStyles from './JoinedMaterialCard.module.scss'

export default function JoinedMaterialCard(props) {
  const material = props.material

  return (
    <div key={material.id} className={joinedMaterialCardStyles.cardContainer}>
      <Link className={joinedMaterialCardStyles.link} to={`/materials/${material.id}`}></Link>
      <div className={joinedMaterialCardStyles.lapContainer}>
        <div className={joinedMaterialCardStyles.lapInner}><span className={joinedMaterialCardStyles.lapValue}>1</span><span>st</span></div>
      </div>
      <div className={joinedMaterialCardStyles.cardInner}>
        <img
          className={joinedMaterialCardStyles.cardInnerImg}
          src={`${CONSTS.BACKEND_HOST_STORAGE}${material.poster}`} alt={material.title}
        />
        <div className={joinedMaterialCardStyles.cardInnerMeta}>
          <div className={joinedMaterialCardStyles.cardInnerMetaHeader}>
            <h3>{material.title}</h3>
            <span>マンガ</span>
            <span>{material.joinsCurrentUserTopic.topic.name}</span>
          </div>
          <div className={joinedMaterialCardStyles.progressContainer}>
            <div className={joinedMaterialCardStyles.progressParentBarContainer}>
              <div className={joinedMaterialCardStyles.progressParentBar}></div>
            </div>
            <div className={joinedMaterialCardStyles.progressBarContainer}>
              <div
                className={joinedMaterialCardStyles.progressBar}
                style={{ width: '65%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

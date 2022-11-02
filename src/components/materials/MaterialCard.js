import { Link } from 'react-router-dom'
import { CONSTS } from '../../Consts'
import materialCardStyles from './MaterialCard.module.scss'

export default function MaterialCard({ material }) {
  return (
    <div className={materialCardStyles.mainContainer}>
      <Link
        className={materialCardStyles.link}
        to={`/materials/${material.id}`}
      />
      <div className={materialCardStyles.metaContainer}>
      </div>
      {material.thumbnail ? (
        <img alt={material.title} src={`${CONSTS.IMAGE_BASE64}${material.thumbnail}`} />
      ) : (
        <div className={materialCardStyles.noimage}>{material.title}</div>
      )}
    </div>
  )
}

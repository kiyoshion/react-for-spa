import { Link } from 'react-router-dom'
import MaterialCardStyles from './MaterialCard.module.scss'
import { CONSTS } from '../../Consts'

export default function MaterialCard({ material }) {
  return (
    <div className={MaterialCardStyles.mainContainer}>
      <Link
        className={MaterialCardStyles.link}
        to={`/materials/${material.id}`}
      />
      <div className={MaterialCardStyles.metaContainer}>
      </div>
      {material.thumbnail ? (
        <img alt={material.title} src={`${CONSTS.BACKEND_HOST_STORAGE}${material.thumbnail}`} />
      ) : (
        <div className={MaterialCardStyles.noimage}>{material.title}</div>
      )}
      <h2>{material.title}</h2>
    </div>
  )
}

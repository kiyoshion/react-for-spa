import { Link } from 'react-router-dom'
import utilStyles from '../../styles/util.module.scss'
import itemCardStyles from './MaterialCard.module.scss'

export default function MaterialCard({ material }) {
  return (
    <div className={itemCardStyles.mainContainer}>
      <Link
        className={itemCardStyles.link}
        to={`/materials/${material.id}`}
      />
      <div className={itemCardStyles.metaContainer}>
      </div>
      <h2>{material.title}</h2>
    </div>
  )
}

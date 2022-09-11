import { Link } from 'react-router-dom'
import utilStyles from '../styles/util.module.scss'
import itemCardStyles from './ItemCard.module.scss'

export default function ItemCard({ item }) {
  return (
    <div className={itemCardStyles.mainContainer}>
      <Link
        className={itemCardStyles.link}
        to={`/items/${item.id}`}
      />
      <div className={itemCardStyles.metaContainer}>
        <span className={utilStyles.lightText}>{item.user.name}</span>
        <time className={`${utilStyles.lightText} ${utilStyles.smallText}`}>{new Date(item.created_at).toLocaleDateString("ja-JP", {
          hour: "2-digit",
          minute: "2-digit"
        })}</time>
      </div>
      <h2>{item.title}</h2>
      <p>{item.body}</p>
    </div>
  )
}

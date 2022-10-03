import { Link } from 'react-router-dom'
import utilStyle from '../../styles/util.module.scss'

export default function PostCard({ post }) {
  return (
    <Link to={`/posts/${post.id}`}>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <time className={utilStyle.lightText}>{new Date(post.created_at).toLocaleDateString("ja-JP", {
        hour: "2-digit",
        minute: "2-digit"
      })}</time>
    </Link>
  )
}

import { useEffect, useState } from "react"
import axios from 'axios'
import utilStyle from '../styles/util.module.scss'

export default function Posts() {
  const [ posts, setPosts ] = useState([])
  const getPostsURL = 'http://localhost:8000/api/posts'

  useEffect(() => {
    axios.get(getPostsURL)
      .then((res) => {
        setPosts(res.data.posts)
      })
  }, [])

  return (
    <div className={utilStyle.container}>
      {posts.map(post => {
        return (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <time className={utilStyle.lightText}>{new Date(post.created_at).toLocaleDateString("ja-JP", {
              hour: "2-digit",
              minute: "2-digit"
            })}</time>
          </div>
        )
      })}
    </div>
  )
}

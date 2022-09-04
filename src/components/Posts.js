import { useEffect, useState } from "react"
import axios from 'axios'
import utilStyle from '../styles/util.module.scss'
import PostCard from './PostCard'

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
          <PostCard key={post.id} post={post} />
        )
      })}
    </div>
  )
}

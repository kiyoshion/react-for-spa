import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { format } from 'date-fns'
import utilStyles from '../styles/util.module.scss'

export default function Post() {
  const [ post, setPost ] = useState([])
  const getPostURL = 'http://localhost:8000/api/posts/'
  const params = useParams()

  useEffect(() => {
    axios.get(getPostURL + params.id)
      .then((res) => {
        const date = format(new Date(res.data.post.created_at), 'yy/MM/dd HH:mm')
        setPost({
          ...res.data.post,
          "created_at": date
        })
      })
  }, [])

  return (
    <div className={utilStyles.container}>
      <h1>{post.title}</h1>
      <p>{post.created_at}</p>
      <p>{post.body}</p>
    </div>
  )
}

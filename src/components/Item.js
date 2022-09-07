import axios from "../lib/axios"
import { useEffect, useState } from "react"
import { Navigate, useParams } from 'react-router-dom'
import { format } from 'date-fns'
import utilStyles from '../styles/util.module.scss'
import { Link } from 'react-router-dom'

export default function Item() {
  const [ item, setItem ] = useState([])
  const [ isAuth, setIsAuth ] = useState(false)
  const getItemURL = '/api/items/'
  const params = useParams()

  useEffect(() => {
    axios
        .get(getItemURL + params.id)
        .then((res) => {
          const date = format(new Date(res.data.item.created_at), 'yy/MM/dd HH:mm')
          setItem({
            ...res.data.item,
            "created_at": date
          })
            axios
            .get('/api/user')
            .then(res => {
              console.log('res.data here', res.data)
              if (res.data.id === item.user_id) {
                setIsAuth(true)
              }
            })
        })
    }, [])

  return (
    <>
    <div className={utilStyles.container}>
      {isAuth ? (<Link to={`/items/${item.id}/edit`}>edit</Link>) : 'false'}
      <h1>{item.title}</h1>
      <p>{item.created_at}</p>
      <p>{item.body}</p>
    </div>
    </>
  )
}

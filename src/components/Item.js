import axios from "../lib/axios"
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { format } from 'date-fns'
import utilStyles from '../styles/util.module.scss'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../store/userSlice'

export default function Item() {
  const [ item, setItem ] = useState([])
  const getItemURL = '/api/items/'
  const params = useParams()
  const { user } = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser())
    axios
        .get(getItemURL + params.id)
        .then((res) => {
          const date = format(new Date(res.data.item.created_at), 'yy/MM/dd HH:mm')
          setItem({
            ...res.data.item,
            "created_at": date
          })
        })
    }, [])

  return (
    <>
    <div className={utilStyles.container}>
      {user.id === item.user_id ? (<Link to={`/items/${item.id}/edit`}>edit</Link>) : ''}
      <h1>{item.title}</h1>
      <p>{item.created_at}</p>
      <div
        className={utilStyles.contentBody}
        dangerouslySetInnerHTML={{__html: item.body}}
      ></div>
    </div>
    </>
  )
}

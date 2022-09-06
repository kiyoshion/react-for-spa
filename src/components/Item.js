import axios from "../lib/axios"
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { format } from 'date-fns'
import utilStyles from '../styles/util.module.scss'

export default function Item() {
  const [ item, setItem ] = useState([])
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
      })
  }, [])

  return (
    <div className={utilStyles.container}>
      <h1>{item.title}</h1>
      <p>{item.created_at}</p>
      <p>{item.body}</p>
    </div>
  )
}

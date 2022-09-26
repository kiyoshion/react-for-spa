import axios from "../lib/axios"
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { format } from 'date-fns'
import utilStyles from '../styles/util.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../store/userSlice'

export default function Material() {
  const [ material, setMaterial ] = useState([])
  const getMaterialURL = '/api/materials/'
  const params = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser())
    axios
        .get(getMaterialURL + params.id)
        .then((res) => {
          const date = format(new Date(res.data.material.created_at), 'yy/MM/dd HH:mm')
          setMaterial({
            ...res.data.material,
            "created_at": date
          })
        })
    }, [])

  return (
    <>
    <div className={utilStyles.container}>
      <h1>{material.title}</h1>
    </div>
    </>
  )
}

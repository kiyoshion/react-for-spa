import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from '../../lib/axios'
import utilStyle from '../../styles/util.module.scss'

export default function Materials() {
  const [ rooms, setRooms ] = useState([])
  const getRoomsURL = '/api/rooms'

  useEffect(() => {
    axios.get(getRoomsURL)
      .then((res) => {
        setRooms(res.data.rooms)
      })
  }, [])

  return (
    <div className={utilStyle.container}>
      {rooms.map(room => {
        return (
          <div key={room.id}>
            <Link to={`/rooms/${room.id}`}>
              {room.title}
            </Link>
          </div>
        )
      })}
    </div>
  )
}

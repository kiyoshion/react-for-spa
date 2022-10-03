import axios from "../../lib/axios"
import { useEffect, useState } from "react"
import { Link, useParams } from 'react-router-dom'
import { format } from 'date-fns'
import utilStyles from '../../styles/util.module.scss'
import { useDispatch } from 'react-redux'
import { getUser } from '../../store/userSlice'

export default function Section() {
  const [ section, setSection ] = useState({
    title: "",
    material: {},
    outputs: [],
    flashes: []
  })
  const getSectionURL = '/api/sections/'
  const params = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser())
    const fetchData = async () => {
      await axios
          .get(getSectionURL + params.id)
          .then((res) => {
            console.log(res.data.section)
            setSection(res.data.section)
          })
    }
    fetchData()
    }, [])

  return (
    <div className={utilStyles.container}>
      <Link to={`/materials/${section.material.id}`}>←</Link>
      <h1>{section.material.title} - {section.title}</h1>
      <div>
        {section.outputs.map(output => (
          <div key={output.id}>
            {output.body}
          </div>
        ))}
      </div>
      <div>
        {section.flashes.map(flash => (
          <div key={flash.id}>
            {flash.front_title}
          </div>
        ))}
      </div>
    </div>
  )
}

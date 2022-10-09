import { useEffect, useState } from "react"
import axios from '../../lib/axios'
import utilStyle from '../../styles/util.module.scss'
import MaterialCard from './MaterialCard'

export default function Materials() {
  const [ materials, setMaterials ] = useState([])
  const getMaterialsURL = '/api/materials'

  useEffect(() => {
    axios.get(getMaterialsURL)
      .then((res) => {
        setMaterials(res.data.materials)
      })
  }, [])

  return (
    <div className={`${utilStyle.container} ${utilStyle.flex}`}>
      {materials.map(material => {
        return (
          <MaterialCard key={material.id} material={material} />
        )
      })}
    </div>
  )
}

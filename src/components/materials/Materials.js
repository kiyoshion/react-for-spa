import { useEffect, useState } from "react"
import axios from '../../lib/axios'
import utilStyle from '../../styles/util.module.scss'
import MaterialCard from './MaterialCard'
import { CONSTS } from '../../Consts'

export default function Materials() {
  const [ materials, setMaterials ] = useState([])

  useEffect(() => {
    axios.get(CONSTS.GET_MATERIALS_URL)
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

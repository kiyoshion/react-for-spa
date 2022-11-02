import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { CONSTS } from '../../Consts'
import axios from '../../lib/axios'
import utilStyle from '../../styles/util.module.scss'
import materialStyles from './Material.module.scss'
import MaterialCard from '../../components/materials/MaterialCard'

export default function MaterialIndex() {
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
      <div className={materialStyles.addButton}>
        <Link to='/materials/create'><span>+</span></Link>
      </div>
    </div>
  )
}

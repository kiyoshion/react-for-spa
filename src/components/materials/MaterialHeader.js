import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { CONSTS } from '../../Consts'
import MaterialStyles from "./Material.module.scss"
import LazyLoad from 'react-lazyload'

export default function MaterialHeader() {
  const currentMaterial = useSelector(state => state.material.currentMaterial)

  return (
    <>
      <div className={MaterialStyles.headerContainer}>
        <div className={MaterialStyles.backLink}>
          <Link to="/materials">←</Link>
        </div>
        <div className={MaterialStyles.headerInner}>
          <div className={MaterialStyles.left}>
            <LazyLoad height={160}>
              <img alt={currentMaterial.title} src={`${CONSTS.BACKEND_HOST_STORAGE}${currentMaterial.poster}`} />
            </LazyLoad>
          </div>
          <div className={MaterialStyles.right}>
            <h1>{currentMaterial.title}</h1>
            <p>全{currentMaterial.contentsCount}巻
              全{currentMaterial.contentsChaptersCount}話
            </p>
            <ul className={MaterialStyles.tagContainer}>
              <li>マンガ</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

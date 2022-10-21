import { Link } from "react-router-dom"
import { CONSTS } from '../../Consts'
import MaterialStyles from "./Material.module.scss"
import LazyLoad from 'react-lazyload'

export default function MaterialHeader(props) {

  return (
    <>
      <div className={MaterialStyles.headerContainer}>
        <div className={MaterialStyles.backLink}>
          <Link to="/materials">←</Link>
        </div>
        <div className={MaterialStyles.headerInner}>
          <div className={MaterialStyles.left}>
            <LazyLoad height={160}>
              <img alt={props.material.title} src={`${CONSTS.BACKEND_HOST_STORAGE}${props.material.poster}`} />
            </LazyLoad>
          </div>
          <div className={MaterialStyles.right}>
            <h1>{props.material.title}</h1>
            <p>全{props.material.parentSectionCount}巻 全{props.material.childrenSectionCount}話</p>
            <ul className={MaterialStyles.tagContainer}>
              <li>マンガ</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

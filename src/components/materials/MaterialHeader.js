import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { CONSTS } from '../../Consts'
import materialHeaderStyles from "./MaterialHeader.module.scss"
import LazyLoad from 'react-lazyload'

export default function MaterialHeader() {
  const currentMaterial = useSelector(state => state.root.material.currentMaterial)

  return (
    <>
      <div className={materialHeaderStyles.headerContainer}>
        <div className={materialHeaderStyles.backLink}>
          <Link to="/materials">
            <svg width="16" height="16" viewBox="0 0 512 512">
              <polygon points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 "></polygon>
            </svg>
          </Link>
        </div>
        <div className={materialHeaderStyles.headerInner}>
          <div className={materialHeaderStyles.left}>
            <LazyLoad height={160}>
              <img alt={currentMaterial.title} src={`${CONSTS.IMAGE_BASE64}${currentMaterial.thumbnail}`} />
            </LazyLoad>
          </div>
          <div className={materialHeaderStyles.right}>
            <h1>{currentMaterial.title}</h1>
            <p>{currentMaterial.contentsCount}{currentMaterial.type.label_contents}
              {currentMaterial.contentsChaptersCount}{currentMaterial.type.label_chapters}
            </p>
            <ul className={materialHeaderStyles.tagContainer}>
              <li>{currentMaterial.type.name}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

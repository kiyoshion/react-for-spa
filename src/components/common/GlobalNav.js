import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CONSTS } from '../../Consts'
import Avatar from './Avatar'
import IconAvatarNoname from '../icons/IconAvatarNoname'
import IconBookmark from '../icons/IconBookmark'
import globalNavStyles from './GlobalNav.module.scss'

export default function GlobalNav() {
  const user = useSelector(state => state.root.user.data)
  const currentMaterial = useSelector(state => state.root.material.currentMaterial)

  return (
    <>
      <nav className={globalNavStyles.container}>
        <div className={globalNavStyles.inner}>
          <div className={globalNavStyles.item}>
            <Link style={{padding:0}} to='/'>
              <svg x="0px" y="0px" width="24" height="24" style={{fill:'#fff'}} viewBox="0 0 24 24">
                <path d="M21 13v10h-6v-6h-6v6h-6v-10h-3l12-12 12 12h-3zm-1-5.907v-5.093h-3v2.093l3 3z"/>
              </svg>
            </Link>
          </div>
          <div className={globalNavStyles.item}>
            <Link to='/materials'>
            <svg x="0px" y="0px" width="28" height="28" style={{fill:'#fff', strokeWidth:'4'}}  viewBox="0 0 1000 1000">
              <g><path d="M500.1,990.4c-274.9-3.9-490.2-216-490.1-491C10.1,224.7,225,9.6,499.9,9.6C775.1,9.5,990.7,225.3,990,500.9C989.3,774.6,774.9,986.4,500.1,990.4z M500.2,63.2C260,62.9,64,258,63.6,497.8c-0.4,242,194.1,437.6,435.9,438.1c240.1,0.5,436.5-194.7,436.9-434.4C936.8,259.2,742,63.5,500.2,63.2z"/><path d="M706.2,141.1c-3.1,17.1-6,32.6-8.8,48c-14.8,79.7-29.5,159.5-44.3,239.2c-8.7,46.7-17.3,93.5-26.1,140.2c-0.4,2.2-1.9,4.7-3.6,6.2C542.6,643.8,461.8,712.8,381,781.8c-27.7,23.7-55.5,47.3-83.2,70.9c-1.2,1-2.5,1.9-4.8,3.8c1.9-10.3,3.4-19.3,5.1-28.3c24.6-132.9,49.2-265.8,74-398.6c0.5-2.5,2.3-5.3,4.3-7c62.5-53.5,125.2-106.9,187.8-160.4c46.1-39.3,92.1-78.7,138.2-118C703.1,143.6,704,142.9,706.2,141.1z M341.9,770.7c0.4,0.2,0.7,0.5,1.1,0.7c84.6-71.9,169.2-143.8,254.2-216c-65.1-37.6-129.5-74.8-194.4-112.2C382.4,552.9,362.2,661.8,341.9,770.7z"/></g>
            </svg>
            </Link>
          </div>
          <div className={globalNavStyles.currentMaterialContainer}>
            {currentMaterial.thumbnail ?
              <Link to={`/materials/${currentMaterial.id}`} >
                <img src={`${CONSTS.IMAGE_BASE64}${currentMaterial.thumbnail}`} alt={currentMaterial.title} />
              </Link>
            :
              <div className={globalNavStyles.currentMaterialNone}>
                <div>
                  <span>+</span>
                </div>
              </div>
            }
          </div>
          <div className={globalNavStyles.item}>
            <Link to="/mypage">
              <IconBookmark size="24" color="#fff" />
            </Link>
          </div>
            { user.name ?
              <Link to='/mypage'>
                <Avatar user={user} size="32" color="#fff" />
              </Link>
            :
              <Link to="login">
                <IconAvatarNoname size="32" color="#fff" />
              </Link>
            }
        </div>
      </nav>
    </>
  )
}

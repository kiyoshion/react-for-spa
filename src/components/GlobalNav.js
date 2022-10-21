import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CONSTS } from '../Consts'
import Avatar from './common/Avatar'
import GlobalNavStyles from './GlobalNav.module.scss'

export default function GlobalNav() {
  const user = useSelector(state => state.user.user)
  const isLogined = useSelector(state => state.user.isLogined)

  return (
    <>
      <nav className={GlobalNavStyles.container}>
        <div className={GlobalNavStyles.inner}>
          <div>
            <Link to='/'>H</Link>
          </div>
          <div>
            <Link to='/materials'>M</Link>
          </div>
            { user.name ?
              <Link to='/mypage'>
                <Avatar user={user} size="32" color="#fff" />
              </Link>
            :
              <Link to="login">L</Link>
            }
        </div>
      </nav>
    </>
  )
}

import { Link } from 'react-router-dom'
import GlobalNavStyles from './GlobalNav.module.scss'

export default function GlobalNav() {
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
          <div>
            <Link to='/mypage'>P</Link>
          </div>
        </div>
      </nav>
    </>
  )
}

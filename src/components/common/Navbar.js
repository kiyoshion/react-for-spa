import { Link } from 'react-router-dom'
import { CONSTS } from '../../Consts'
import navbarStyles from './Navbar.module.scss'

export default function Navbar() {

  return (
    <nav className={navbarStyles.container}>
      <div className={navbarStyles.inner}>
        <div className={navbarStyles.logo}>
          <Link to="/">
            {CONSTS.APP_NAME}
          </Link>
        </div>
        <ul className={navbarStyles.list}>
        </ul>
      </div>
    </nav>
  )
}

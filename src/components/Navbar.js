import navbarStyles from './Navbar.module.scss'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className={navbarStyles.container}>
      <div className={navbarStyles.inner}>
        <div className={navbarStyles.logo}>
          <Link to="/">React</Link>
        </div>
        <ul className={navbarStyles.list}>
          <li>
            <Link to="/posts">posts</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

import navbarStyles from './Navbar.module.scss'
import utilStyles from '../styles/util.module.scss'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className={navbarStyles.container}>
      <div className={navbarStyles.inner}>
        <div className={navbarStyles.logo}>
          <Link to="/">Laravel 9 + React 18 Tutorial</Link>
        </div>
        <ul className={navbarStyles.list}>
          <li>
            <Link to="/items">Items</Link>
          </li>
          <li>
            <Link className={`${navbarStyles.btn} ${utilStyles.btn_black}`} to="/items/create">
              Add
            </Link>
          </li>
          <li>
            <Link className={`${navbarStyles.btn} ${utilStyles.btn_blue}`} to="/login">
              Sign In
            </Link>
          </li>
          <li>
            <Link className={`${navbarStyles.btn} ${utilStyles.btn_blue}`} to="/register">
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

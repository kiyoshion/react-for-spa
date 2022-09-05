import navbarStyles from './Navbar.module.scss'
import utilStyles from '../styles/util.module.scss'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className={navbarStyles.container}>
      <div className={navbarStyles.inner}>
        <div className={navbarStyles.logo}>
          <Link to="/">SPA with React and Laravel</Link>
        </div>
        <ul className={navbarStyles.list}>
          <li>
            <Link to="/posts">Posts</Link>
          </li>
          <li>
            <Link className={`${navbarStyles.btn} ${utilStyles.btn_black}`} to="/posts/create">
              Add
            </Link>
          </li>
          <li>
            <Link className={`${navbarStyles.btn} ${utilStyles.btn_black}`} to="/register">
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

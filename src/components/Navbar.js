import navbarStyles from './Navbar.module.scss'
import utilStyles from '../styles/util.module.scss'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Navbar() {
  const { user } = useSelector(state => state.user)

  return (
    <nav className={navbarStyles.container}>
      <div className={navbarStyles.inner}>
        <div className={navbarStyles.logo}>
          <Link to="/">
            yomuel
          </Link>
        </div>
        <ul className={navbarStyles.list}>
          <li>
            <Link to="/materials">Materials</Link>
          </li>
          <li>
            <Link to="/rooms">rooms</Link>
          </li>
          <li>
            <Link to="/rooms/create">ar</Link>
          </li>
          <li>
            <Link className={`${navbarStyles.btn} ${utilStyles.btn_black}`} to="/materials/create">
              Add
            </Link>
          </li>
          <li>
            <Link to="/items">Items</Link>
          </li>
          <li>
            <Link className={`${navbarStyles.btn} ${utilStyles.btn_black}`} to="/items/create">
              Add
            </Link>
          </li>
          {user.id === 0 ? (
            <>
              <li>
                <Link className={`${navbarStyles.btn} ${utilStyles.btn_blue}`} to="/login">
                  +
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/register">
                  {user.name}
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

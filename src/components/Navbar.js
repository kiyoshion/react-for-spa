import navbarStyles from './Navbar.module.scss'

export default function Navbar() {
  return (
    <nav className={navbarStyles.container}>
      <div className={navbarStyles.inner}>
        <div className={navbarStyles.logo}>
          <a href="/">
            React
          </a>
        </div>
        <ul className={navbarStyles.list}>
          <li>
            <a href="/posts">posts</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

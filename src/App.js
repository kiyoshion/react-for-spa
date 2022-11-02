import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux'
import './App.module.scss';

// components
import Navbar from './components/common/Navbar'
import GlobalNav from './components/common/GlobalNav'

// pages
// materials
import MaterialIndex from './pages/materials/Index'
import MaterialShow from './pages/materials/Show'
import MaterialCreate from './pages/materials/Create'

// chapters
import ChapterShow from './pages/chapters/Show'

// users
import UserIndex from './pages/users/Index'
import UserShow from './pages/users/Show'
import UserWordIndex from './pages/users/words/Index'
import UserWordShow from './pages/users/words/Show'

// fixedPages
import Home from './pages/Home'
import About from './pages/About'
import Mypage from './pages/Mypage'
import Login from './pages/Login'

// modals
import AvatarModal from './components/modals/AvatarModal'
import JoinTopicModal from './components/modals/JoinTopicModal'
import OutputModal from './components/modals/OutputModal'

function App() {
  const avatarModal = useSelector(state => state.root.modal.avatarModal)
  const joinTopicModal = useSelector(state => state.root.modal.joinTopicModal)
  const currentMaterial = useSelector(state => state.root.material.currentMaterial)
  const openOutputModal = useSelector(state => state.root.modal.openOutputModal)

  return (
    <Router>

      {/* navbar */}
      <Navbar />

      <Routes>

        {/* materials */}
        <Route path="/materials" element={<MaterialIndex />}></Route>
        <Route path="/materials/:id" element={<MaterialShow />}></Route>
        <Route path="/materials/create" element={<MaterialCreate />}></Route>

        {/* chapters */}
        <Route path="/chapters/:id" element={<ChapterShow />}></Route>

        {/* users */}
        <Route path="/users" element={<UserIndex />}></Route>
        <Route path="/users/:name" element={<UserShow />}></Route>
        <Route path="/users/:name/words" element={<UserWordIndex />}></Route>
        <Route path="/users/:name/words/:id" element={<UserWordShow />}></Route>

        {/* fixedPages */}
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/mypage" element={<Mypage />}></Route>
        <Route path="/login" element={<Login />}></Route>

      </Routes>

      {/* modals */}
      {avatarModal && <AvatarModal />}
      {joinTopicModal && <JoinTopicModal material={currentMaterial}/>}
      {openOutputModal && <OutputModal material={currentMaterial} />}

      {/* globalNav */}
      <GlobalNav />
    </Router>
  );
}

export default App;

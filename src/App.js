import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.module.scss';
import Navbar from './components/Navbar'
import GlobalNav from './components/GlobalNav'
import Home from './components/Home'
import About from './components/About'
import Mypage from './components/Mypage'
import Login from './components/Login'
import Register from './components/Register'
import Items from './components/items/Items'
import Item from './components/items/Item'
import CreateItem from './components/items/CreateItem'
import EditItem from './components/items/EditItem'
import Material from './components/materials/Material'
import Materials from './components/materials/Materials'
import CreateMaterial from './components/materials/CreateMaterial'
import Section from './components/sections/Section'
import Rooms from './components/rooms/Rooms'
import Room from './components/rooms/Room'
import CreateRoom from './components/rooms/CreateRoom'
import AvatarModal from './components/modals/AvatarModal';
import { useSelector } from 'react-redux';
import JoinTopicModal from './components/modals/JoinTopicModal';
import OutputModal from './components/modals/OutputModal';

function App() {
  const avatarModal = useSelector(state => state.modal.avatarModal)
  const joinTopicModal = useSelector(state => state.modal.joinTopicModal)
  const currentMaterial = useSelector(state => state.material.currentMaterial)
  const openOutputModal = useSelector(state => state.modal.openOutputModal)

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/mypage" element={<Mypage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/dashboard" element={<Register />}></Route>
        <Route path="/items" element={<Items />}></Route>
        <Route path="/items/:id" element={<Item />}></Route>
        <Route path="/items/create" element={<CreateItem />}></Route>
        <Route path="/items/:id/edit" element={<EditItem />}></Route>
        <Route path="/materials" element={<Materials />}></Route>
        <Route path="/materials/:id" element={<Material />}></Route>
        <Route path="/materials/create" element={<CreateMaterial />}></Route>
        <Route path="/sections/:id" element={<Section />}></Route>
        <Route path="/rooms" element={<Rooms />}></Route>
        <Route path="/rooms/:id" element={<Room />}></Route>
        <Route path="/rooms/create" element={<CreateRoom />}></Route>
      </Routes>
      { avatarModal && <AvatarModal /> }
      { joinTopicModal && <JoinTopicModal material={currentMaterial} /> }
      { openOutputModal && <OutputModal material={currentMaterial} />}
      <GlobalNav />
    </Router>
  );
}

export default App;

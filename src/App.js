import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.module.scss';
import Navbar from './components/Navbar'
import Home from './components/Home'
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

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
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
      </Routes>
    </Router>
  );
}

export default App;

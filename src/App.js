import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.module.scss';
import Navbar from './components/Navbar'
import Home from './components/Home'
import Register from './components/Register'
import Posts from './components/Posts'
import Post from './components/Post'
import CreatePost from './components/CreatePost'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/posts" element={<Posts />}></Route>
        <Route path="/posts/:id" element={<Post />}></Route>
        <Route path="/posts/create" element={<CreatePost />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

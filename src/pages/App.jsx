import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import Home from './Home/index';
import Register from './Register/index';
import Login from './Login/index';
<<<<<<< HEAD
=======

>>>>>>> 293fe25a2f73fdad5f579f4c5108d6828ec01618
import Navbar from './Navbar/index';
import Post from './Post/index';
import UpdatePost from './UpdatePost/index';
import Delete from './Delete/index';
import OnePost from './OnePost/index';
import './style.css'


function App() {
  return (
    <>
      <Navbar />
      <section>
        <Post />
        <Login />
        <Register />
        <UpdatePost />
        <Delete />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/onepost" element={<OnePost />} />
        </Routes>
      </section>
      <footer>
      </footer>
    </>
  );
}

export default App;

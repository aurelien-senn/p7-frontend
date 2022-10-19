import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import Home from './Home/index';
import Register from './Register/index';
import Login from './Login/index';

import Navbar from './Navbar/index';
import Post from './Post/index';
import UpdatePost from './UpdatePost/index';
import Delete from './Delete/index';
import OnePost from './OnePost/index';
import './style.css'

const Header = styled.header`
color: red;
text-align:center;
padding:10px;
a{
  padding:5px;
}
`
function App() {
  return (
    <>
      <Header >
        <Navbar />
      </Header >
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

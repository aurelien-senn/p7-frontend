import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import Home from './Home/index';
import Register from './Register/index';
import Login from './Login/index';
import Profil from './Profil/index';
import Navbar from './Navbar/index';
import Post from './Post/index';
import Style from './style.css'

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
    <body>
      <Header >
        <Navbar />
      </Header >
      <section>
        <Login />
        <Register />
        <Post />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Profil" element={<Profil />} />
        </Routes>
      </section>
      <footer>
      </footer>
    </body>
  );
}

export default App;

import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import Home from './Home/index';
import Register from './Register/index';
import Login from './Login/index';
import Logout from './Logout/index';
import Profil from './Profil/index';
import Navbar from './Navbar/index';



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
    <Header >
      <Navbar />
      <Login />
      <Register />
      <Logout />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/Profil" element={<Profil />} />
      </Routes>
    </Header >

  );
}

export default App;

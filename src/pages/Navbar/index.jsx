
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import './index.css'


export default function Navbar() {

    const { toggleModals } = useContext(UserContext)

    const localeStorageUser = localStorage.getItem("user");
    console.log(localeStorageUser);
    const logout = () => {

        localStorage.clear();
        window.location.reload();

    };
    return (
        <div className='navBar'>
            <img src="groupomania-logoplat.png" alt="Logo" className='imgLogo' />
            <nav>
                <ul>
                    <li> <Link to="/Profil">Profil</Link> </li>
                    <li> <Link to="/">Accueil</Link> </li>
                </ul>
                <ul>

                    <li> <button onClick={() => toggleModals('signUp')}>Inscription</button></li>
                    <li> <button onClick={() => toggleModals('signIn')}>Connexion</button></li>

                    <li> <button onClick={() => toggleModals('newPost')}>Exprimez-vous</button></li>
                    <li>  <button onClick={logout}>Déconnexion</button></li>
                </ul>
            </nav>
        </div>
    );
}

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import css from './index.css';


export default function Navbar() {
    const { toggleModals } = useContext(UserContext)
    return (
        <div>
            <img src="groupomania-logoplat.png" alt="Logo" />
            <nav>
                <ul>
                    <li> <Link to="/Profil">Profil</Link> </li>
                    <li> <Link to="/">Accueil</Link> </li>
                </ul>
                <ul>
                    <li> <button onClick={() => toggleModals('signUp')}>Inscription</button></li>
                    <li> <button onClick={() => toggleModals('signIn')}>Connexion</button></li>
                    <li> <button onClick={() => toggleModals('newPost')}>Exprimez-vous</button></li>
                    <li>  <button >Déconnexion</button></li>
                </ul>
            </nav>
        </div>
    );
}
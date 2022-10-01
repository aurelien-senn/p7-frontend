
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext'



export default function Navbar() {
    const { toggleModals } = useContext(UserContext)
    return (
        <nav>
            <Link to="/">Accueil</Link>
            <Link to="/Profil">Profil</Link>
            <div>
                <button onClick={() => toggleModals('signUp')}>Inscription</button>
                <button onClick={() => toggleModals('signIn')}>Connexion</button>
                <button >Déconnexion</button>
            </div>
        </nav>
    );
}

import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import './index.css'


export default function Navbar() {

    const { toggleModals } = useContext(UserContext)
    const testLocaleStorage = (typeof localStorage.getItem('user'));
    console.log(localStorage.getItem('user'));
    let userCo;
    const logout = () => {
        localStorage.clear();
        window.location.reload();

    };
    if ((typeof localStorage.getItem('user')) == 'object') {
        userCo = false
        console.log(userCo + "false");
        console.log(localStorage.getItem('user'));

    } else {
        userCo = true
        console.log(userCo + "true");
        console.log(typeof localStorage.getItem('user'));

    }
    return (
        <div className='navBar'>
            <img src="groupomania-logoplat.png" alt="Logo" className='imgLogo' />
            <nav>

                <ul>
                    {userCo ?


                        <>
                            <li> <Link to="/Profil">Profil</Link> </li>
                            <li> <Link to="/">Accueil</Link> </li>
                            <li> <button className="btn" onClick={() => toggleModals('newPost')}>Exprimez-vous</button></li>
                            <li>  <button className="btn" onClick={logout}>Déconnexion</button></li>
                        </>
                        :
                        <>
                            <li> <button className="btn" onClick={() => toggleModals('signUp')}>Inscription</button></li>
                            <li> <button className="btn" onClick={() => toggleModals('signIn')}>Connexion</button></li>
                        </>


                    }


                </ul>
            </nav>
        </div>
    );
}
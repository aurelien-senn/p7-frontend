
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import './index.css'


export default function Navbar() {

    const { toggleModals } = useContext(UserContext)
    const testLocaleStorage = (typeof localStorage.getItem('user'));
    let userCo;
    const logout = () => {
        localStorage.clear();
        window.location.reload();

    };
    if ((typeof localStorage.getItem('user')) == 'object') {
        userCo = false


    } else {
        userCo = true


    }
    return (
        <div className='navBar'>
            <Link to="/">
                <img src="groupomania-logoplat.png" alt="Logo" className='imgLogo' />
            </Link>
            <nav>

                <ul>
                    {userCo ?


                        <>
<<<<<<< HEAD
                            <li> <button className="btnNav" onClick={() => toggleModals('newPost')}>Exprimez-vous</button></li>
                            <li>  <button className="btnNav" onClick={logout}>Déconnexion</button></li>
=======
                            <li> <button className="btn" onClick={() => toggleModals('newPost')}>Exprimez-vous</button></li>
                            <li>  <button className="btn" onClick={logout}>Déconnexion</button></li>
>>>>>>> 293fe25a2f73fdad5f579f4c5108d6828ec01618
                        </>
                        :
                        <>
                            <li> <button className="btnNav" onClick={() => toggleModals('signUp')}>Inscription</button></li>
                            <li> <button className="btnNav" onClick={() => toggleModals('signIn')}>Connexion</button></li>
                        </>


                    }


                </ul>
            </nav>
        </div>
    );
}

import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import './index.css'
import axios from '../../api/axios';
import authHeader from '../../services/auth-header'

const REGISTER_URL = '/api/auth/navbar';
export default function Navbar() {
    const testauthHeader = authHeader();
    const [dataNavbar, setDataNavbar] = useState([]);
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
    // view name
    // @param {string} email user
    // @param {string} password
    // @return {string} localstorage (user role token)
    const getName = () => {
        try {
            axios.get(REGISTER_URL, {
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": `${testauthHeader.authorization}`,
                }
            })
                .then(res => {
                    setDataNavbar(res.data)
                    console.log(dataNavbar.imageUrl);
                })
        } catch (err) {

            if (!err?.response) {
                console.log('erreur serveur');
            } else {
                console.log('Echec de la connexion');
            }
        }
    }
    useEffect(() => {
        getName();

    }, []);
    return (
        <div className='navBar'>

            <Link to="/">
                <img src="groupomania-logoplat.png" alt="Logo" className='imgLogo' />
            </Link>
            {userCo ?
                <>
                    <div className='container-imgNavBar'>
                        <p>Bonjour {dataNavbar.prenom} {dataNavbar.nom}</p>
                    </div>
                    <nav>
                        <ul>
                            <li> <button className="btnNav" onClick={() => toggleModals('newPost')}>Exprimez-vous</button></li>
                            <li>  <button className="btnNav" onClick={logout}>Déconnexion</button></li>
                        </ul>
                    </nav>
                </>
                :
                <nav>
                    <ul>
                        <li> <button className="btnNav" onClick={() => toggleModals('signUp')}>Inscription</button></li>
                        <li> <button className="btnNav" onClick={() => toggleModals('signIn')}>Connexion</button></li>
                    </ul>
                </nav>
            }
        </div >
    );
}
import React, { useContext, useRef, useState } from 'react';
import axios from '../../api/axios';
import { UserContext } from '../../context/userContext'
import './index.css'
import authHeader from '../../services/auth-header'
const REGISTER_URL = '/api/auth/login';

export default function Login() {
    const testauthHeader = authHeader();
    const [success, setSuccess] = useState(false);
    const { toggleModals, modalState } = useContext(UserContext)
    const [validation, setValidation] = useState('');
    const inputs = useRef([])

    const addInputs = el => {
        if (el && !inputs.current.includes(el)) {
            inputs.current.push(el)
        }
    }

    // connect user
    // @param {string} email user
    // @param {string} password
    // @return {string} localstorage (user role token)
    const handleForm = async (e) => {
        e.preventDefault(inputs.current)
        try {

            const email = inputs.current[0].value;
            const password = inputs.current[1].value;
            const data = JSON.stringify({ email: email, password: password });

            await axios.post(REGISTER_URL, { data })
                .then(res => {
                    localStorage.setItem("user", JSON.stringify(res.data));
                    console.log(res.data);
                    console.log(testauthHeader.authorization);
                })


            setSuccess(true);
            console.log(testauthHeader.authorization);
            window.location.reload();

        } catch (err) {
            if (!err?.response) {
                setValidation('pas de reponse serveur');
            } else if (err.response?.status === 409) {
                setValidation('Couple mot de passe/email incorrect');
            } else {
                setValidation('Echec de la connexion')
            }
        }
    }
    return (
        <>
            {success ? (
                <div className='login'>
                    <div className='modalLogin-content'>
                        <h1>Connexion réussit</h1>
                    </div>
                    <div className='containerImgLogin'>

                        <img className='imgRegister' src="image-accueil.jpg" alt="photo du siege social" />
                    </div>
                </div>
            ) : (
                modalState.signInModal && (
                    <div className='login'>
                        <div className='modalLogin-content'>
                            <h2>Connexion</h2>

                            <form onSubmit={handleForm}>
                                <label htmlFor="signInEmail"> Email :</label>
                                <br />
                                <input
                                    ref={addInputs}
                                    type="email"
                                    name="email"
                                    required
                                    id="signInEmail"
                                />
                                <br />
                                <label htmlFor="signUpPwd"> Mot de passe :</label>
                                <br />
                                <input
                                    ref={addInputs}
                                    type="password"
                                    name="pwd"
                                    required
                                    id="signInPwd"
                                />

                                <p>{validation}</p>
                                <button className='btn-login'>Soumettre</button>
                            </form>
                            <button onClick={() => toggleModals('signUp')}>S'inscrire ?</button>
                        </div>
                        <div className='containerImgLogin'>

                            <img className='imgRegister' src="image-accueil.jpg" alt="photo du siege social" />
                        </div>
                    </div>
                )
            )
            }
        </>
    );
}


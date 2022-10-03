import React, { useContext, useRef, useState } from 'react';
import axios from '../../api/axios';
import { UserContext } from '../../context/userContext'

const REGISTER_URL = '/api/auth/login';

export default function Login() {
    const [success, setSuccess] = useState(false);
    const { toggleModals, modalState } = useContext(UserContext)
    const [validation, setValidation] = useState('');
    const inputs = useRef([])

    const addInputs = el => {
        if (el && !inputs.current.includes(el)) {
            inputs.current.push(el)
        }
    }
    const handleForm = async (e) => {
        e.preventDefault()
        try {
            const email = inputs.current[0].value;
            const password = inputs.current[1].value;
            const data = JSON.stringify({ email: email, password: password });
            console.log(data);
            await axios.post(REGISTER_URL, { data })
                .then(res => {
                    localStorage.setItem("user", JSON.stringify(res.data));
                })

            console.log('ok');
            setSuccess(true);

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
                <h1>Connexion réussit</h1>
            ) : (
                modalState.signInModal && (
                    <div>
                        <h5>Connexion</h5>
                        <button onClick={() => toggleModals("close")}>fermer</button>
                        <form onSubmit={handleForm}>
                            <label htmlFor="signInEmail"> Email :</label>
                            <input
                                ref={addInputs}
                                type="email"
                                name="email"
                                required
                                id="signInEmail"
                            />
                            <label htmlFor="signUpPwd"> Mot de passe :</label>
                            <input
                                ref={addInputs}
                                type="password"
                                name="pwd"
                                required
                                id="signInPwd"
                            />

                            <p>{validation}</p>
                            <button>Soumettre</button>
                        </form>
                    </div>
                )
            )
            }
        </>
    );
}


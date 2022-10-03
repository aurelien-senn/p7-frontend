import React, { useContext, useRef, useState } from 'react';
import axios from '../../api/axios';
import { UserContext } from '../../context/userContext'

const USER_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/api/auth/signup';


export default function Register() {
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
        const v1 = USER_REGEX.test(inputs.current[0].value);
        const v2 = PWD_REGEX.test(inputs.current[1].value);
        console.log(inputs.current[1].value);
        if ((inputs.current[1].value.length || inputs.current[2].value.length) < 8) {
            setValidation("8 caractères minimum")

            return;
        }
        else if (inputs.current[1].value.length !== inputs.current[2].value.length) {
            setValidation("les mots de passes ne correspondent pas")

            return;
        } else if (!v1 || !v2) {
            setValidation("le mot de passe doit contenir minimum: une minuscule, une majuscule, un chiffre et un caractère spécial");
            inputs = [];
            return;
        } try {
            const email = inputs.current[0].value;
            const password = inputs.current[1].value;
            const data = JSON.stringify({ email: email, password: password });
            console.log(data);
            await axios.post(REGISTER_URL, { data })
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                })

            console.log('ok');
            setSuccess(true);

        } catch (err) {
            if (!err?.response) {
                setValidation('pas de reponse serveur');
            } else if (err.response?.status === 409) {
                setValidation('Email déja utilisé');
            } else {
                setValidation('Echec de l\'inscription')
            }
        }
    }



    return (
        <>
            {success ? (
                <h1>Inscription réussit</h1>
            ) : (
                modalState.signUpModal && (
                    <div>
                        <h5>Inscription</h5>
                        <button onClick={() => toggleModals("close")}>fermer</button>
                        <form onSubmit={handleForm}>
                            <label htmlFor="signUpEmail"> Email : </label>
                            <input
                                ref={addInputs}
                                type="email"
                                name="email"
                                required
                                id="signUpEmail"
                            />
                            <label htmlFor="signUpPwd"> Mot de passe : </label>
                            <input
                                ref={addInputs}
                                type="password"
                                name="pwd"
                                required
                                id="signUpPwd"
                            />
                            <label htmlFor="repeatPwd">répétez le Mot de passe</label>
                            <input
                                ref={addInputs}
                                type="password"
                                name="pwd"
                                required
                                id="repeatPwd"
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



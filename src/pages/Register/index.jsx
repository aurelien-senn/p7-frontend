import React, { useContext, useRef, useState } from 'react';
import axios from '../../api/axios';
import { UserContext } from '../../context/userContext'
import './index.css'

const USER_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/api/auth/signup';


export default function Register() {
    const [file, setFile] = useState();
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
        const v2 = PWD_REGEX.test(inputs.current[4].value);

        if ((inputs.current[4].value.length || inputs.current[3].value.length) < 8) {
            setValidation("8 caractères minimum")

            return;
        }
        else if (inputs.current[4].value !== inputs.current[3].value) {
            console.log(inputs.current[4].value);
            console.log(inputs.current[3].value);
            setValidation("les mots de passes ne correspondent pas")

            return;
        } else if (!v1 || !v2) {
            setValidation("le mot de passe doit contenir minimum: une minuscule, une majuscule, un chiffre et un caractère spécial");
            inputs = [];
            return;
        } try {
            const email = inputs.current[0].value;
            const prenom = inputs.current[1].value;
            const nom = inputs.current[2].value;

            const password = inputs.current[3].value;

            const image = file;
            const data = JSON.stringify({ email: email, password: password, prenom: prenom, nom: nom, image: image });

            await axios.post(REGISTER_URL, { data })
                .then(res => {

                })


            setSuccess(true);

        } catch (err) {
            if (!err?.response) {
                setValidation('pas de reponse serveur');
                return;
            } else if (err.response?.status === 409) {
                setValidation('Email déja utilisé');
                return;
            } else {
                setValidation('Echec de l\'inscription');
                return;
            }
        }
    }
    return (
        <>
            {success ? (
                modalState.signUpModal && (
                    <>
                        <div className='register'>
                            <div className='modalRegister-content'>
                                <h2>Inscription réussit</h2>

                                <button onClick={() => toggleModals('signIn')} className='btn-red'>Se connecter?</button>

                            </div>
                            <div>
                                <button onClick={() => toggleModals("close")} className='btn-close'>X</button>
                                <img className='imgRegister' src="image-accueil.jpg" alt="photo du siege social" />
                            </div>
                        </div>

                    </>
                )
            ) : (
                modalState.signUpModal && (
                    <div className='register'>
                        <div className='modalRegister-content'>
                            <h2>Inscription</h2>

                            <form onSubmit={handleForm}>
                                <label htmlFor="signUpEmail"> Email : </label>
                                <br />
                                <input
                                    ref={addInputs}
                                    type="email"
                                    name="email"
                                    required
                                    id="signUpEmail"
                                />
                                <br />
                                <label htmlFor="signUpEmail"> Prénom : </label>
                                <br />
                                <input
                                    ref={addInputs}
                                    type="text"
                                    name="prenom"
                                    required
                                    id="signUpPrenom"
                                />
                                <br />
                                <label htmlFor="signUpEmail"> Nom : </label>
                                <br />
                                <input
                                    ref={addInputs}
                                    type="nom"
                                    name="nom"
                                    required
                                    id="signUpNom"
                                />
                                <br />
                                <label htmlFor="signUpPwd"> Mot de passe : </label>
                                <br />
                                <input
                                    ref={addInputs}
                                    type="password"
                                    name="pwd"
                                    required
                                    id="signUpPwd"
                                />
                                <br />
                                <label htmlFor="repeatPwd">répétez le Mot de passe</label>
                                <br />
                                <input
                                    ref={addInputs}
                                    type="password"
                                    name="pwd"
                                    required
                                    id="repeatPwd"
                                />
                                <br />
                                <label htmlFor="repeatPwd">photo de profil</label>
                                <br />
                                <input
                                    ref={addInputs}
                                    type="file"
                                    name="image"
                                    accept='.jpg,.jpge,.png'
                                    id="image"
                                    onChange={
                                        event => { setFile(event.target.files[0]); }
                                    }
                                />
                                <p>{validation}</p>
                                <button className='btn-red'>Soumettre</button>

                            </form>
                        </div>
                        <div>
                            <div>
                                <img className='imgRegister' src="image-accueil.jpg" alt="photo du siege social" />
                            </div>
                        </div>
                    </div>
                )
            )
            }
        </>

    );

}



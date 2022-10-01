import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext'


export default function Login() {
    const { toggleModals, modalState } = useContext(UserContext)

    return (
        <>
            {modalState.signInModal && (
                <div>
                    <h5>Connexion</h5>
                    <button onClick={() => toggleModals("close")}>fermer</button>
                    <form action="">
                        <label htmlFor="signInEmail">adresse mail</label>
                        <input
                            type="email"
                            name="email"
                            required
                            id="signInEmail"
                        />
                        <label htmlFor="signUpPwd">Mot de passe</label>
                        <input
                            type="password"
                            name="pwd"
                            required
                            id="signUpPwd"
                        />

                        <p>Validé</p>
                        <button>Soumettre</button>
                    </form>
                </div>
            )}
        </>
    );
}


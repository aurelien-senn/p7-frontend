import React, { useContext, useRef, useState } from 'react';
import { UserContext } from '../../context/userContext'
export default function Login() {
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

        if ((inputs.current[1].value.length || inputs.current[2].value.length) < 8) {
            setValidation("8 caractères minimum")
            return;
        }
        else if (inputs.current[1].value.length !== inputs.current[2].value.length) {
            setValidation("les mots de passes ne correspondent pas")
            return;
        }
    }
    return (
        <>
            {modalState.signUpModal && (
                <div>
                    <h5>Inscription</h5>
                    <button onClick={() => toggleModals("close")}>fermer</button>
                    <form onSubmit={handleForm}>
                        <label htmlFor="signUpEmail">adresse mail</label>
                        <input
                            ref={addInputs}
                            type="email"
                            name="email"
                            required
                            id="signUpEmail"
                        />
                        <label htmlFor="signUpPwd">Mot de passe</label>
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
            )}
        </>
    );
}


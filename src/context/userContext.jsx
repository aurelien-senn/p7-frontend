import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext()

export function UserContextProvider(props) {

    const [modalState, setModelState] = useState({
        signUpModal: false,
        signInModal: false

    });

    const toggleModals = modal => {
        if (modal == "signIn") {
            setModelState({
                signUpModal: false,
                signInModal: true

            })
        }
        if (modal == "signUp") {
            setModelState({
                signUpModal: true,
                signInModal: false

            })
        }
        if (modal == "close") {
            setModelState({
                signUpModal: false,
                signInModal: false

            })
        }
    }

    return (
        <UserContext.Provider value={{ modalState, toggleModals }}>
            {props.children}
        </UserContext.Provider>
    )
}
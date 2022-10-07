import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext()

export function UserContextProvider(props) {

    const [modalState, setModelState] = useState({
        signUpModal: false,
        signInModal: false,
        newPostModal: false

    });

    const toggleModals = modal => {
        if (modal == "signIn") {
            setModelState({
                signUpModal: false,
                signInModal: true,
                newPostModal: false

            })
        }
        if (modal == "signUp") {
            setModelState({
                signUpModal: true,
                signInModal: false,
                newPostModal: false
            })
        }
        if (modal == "newPost") {
            setModelState({
                signUpModal: false,
                signInModal: false,
                newPostModal: true

            })
        }
        if (modal == "close") {
            setModelState({
                signUpModal: false,
                signInModal: false,
                newPostModal: false

            })
        }
    }

    return (
        <UserContext.Provider value={{ modalState, toggleModals }}>
            {props.children}
        </UserContext.Provider>
    )
}
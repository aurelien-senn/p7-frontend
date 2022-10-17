import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext()

export function UserContextProvider(props) {

    const [modalState, setModelState] = useState({
        signUpModal: false,
        signInModal: false,
        newPostModal: false,
        updatePostModal: false

    });

    const toggleModals = modal => {
        if (modal == "signIn") {
            setModelState({
                signUpModal: false,
                signInModal: true,
                newPostModal: false,
                updatePostModal: false

            })
        }
        if (modal == "signUp") {
            setModelState({
                signUpModal: true,
                signInModal: false,
                newPostModal: false,
                updatePostModal: false
            })
        }
        if (modal == "newPost") {
            setModelState({
                signUpModal: false,
                signInModal: false,
                newPostModal: true,
                updatePostModal: false

            })
        }
        if (modal == "updatePost") {
            setModelState({
                signUpModal: false,
                signInModal: false,
                newPostModal: false,
                updatePostModal: true

            })
        }
        if (modal == "close") {
            setModelState({
                signUpModal: false,
                signInModal: false,
                newPostModal: false,
                updatePostModal: false

            })

        }
    }

    return (
        <UserContext.Provider value={{ modalState, toggleModals }}>
            {props.children}
        </UserContext.Provider>
    )
}
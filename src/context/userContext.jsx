import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext()

export function UserContextProvider(props) {

    const [modalState, setModelState] = useState({
        signUpModal: false,
        signInModal: false,
        newPostModal: false,
        updatePostModal: false,
        deletePostModal: false,
        OnePostModal: false,

    });

    const toggleModals = modal => {
        if (modal == "signIn") {
            setModelState({
                signUpModal: false,
                signInModal: true,
                newPostModal: false,
                updatePostModal: false,
                deletePostModal: false,
                OnePostModal: false,
            })
        }
        if (modal == "signUp") {
            setModelState({
                signUpModal: true,
                signInModal: false,
                newPostModal: false,
                updatePostModal: false,
                deletePostModal: false,
                OnePostModal: false,
            })
        }
        if (modal == "newPost") {
            setModelState({
                signUpModal: false,
                signInModal: false,
                newPostModal: true,
                updatePostModal: false,
                deletePostModal: false,
                OnePostModal: false,
            })
        }
        if (modal == "updatePost") {
            setModelState({
                signUpModal: false,
                signInModal: false,
                newPostModal: false,
                updatePostModal: true,
                deletePostModal: false,
                OnePostModal: false,
            })
        }
        if (modal == "delete") {
            setModelState({
                signUpModal: false,
                signInModal: false,
                newPostModal: false,
                updatePostModal: false,
                deletePostModal: true,
                OnePostModal: false,
            })

        }

        if (modal == "onePost") {
            setModelState({
                signUpModal: false,
                signInModal: false,
                newPostModal: false,
                updatePostModal: false,
                deletePostModal: false,
                OnePostModal: true,
            })

        }
        if (modal == "close") {
            setModelState({
                signUpModal: false,
                signInModal: false,
                newPostModal: false,
                updatePostModal: false,
                deletePostModal: false,
                OnePostModal: false,
            })

        }


    }

    return (
        <UserContext.Provider value={{ modalState, toggleModals }}>
            {props.children}
        </UserContext.Provider>
    )
}
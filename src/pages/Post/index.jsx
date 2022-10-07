import React, { useContext, useRef, useState } from 'react';
import axios from '../../api/axios';
import { UserContext } from '../../context/userContext'
import './index.css'
import authHeader from '../../services/auth-header'
const REGISTER_URL = '/api/stuff';

export default function Publication() {

    const [success, setSuccess] = useState(false);
    const { toggleModals, modalState } = useContext(UserContext)
    const [validation, setValidation] = useState('');

    const [file, setFile] = useState();
    const inputs = useRef([])

    const addInputs = el => {
        if (el && !inputs.current.includes(el)) {
            inputs.current.push(el)

        }
    }

    const handleForm = async (e) => {
        e.preventDefault()

        try {

            const title = inputs.current[0].value;
            const text = inputs.current[1].value;
            const image = file;
            const postThing = ({ title: title, description: text, image: image });


            await axios.post(REGISTER_URL, postThing, {
                headers: {
                    "Content-type": "multipart/form-data",
                    "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzM5ODNjMzZmNGMyODliMDVhOGNmMWQiLCJpYXQiOjE2NjUxMjkxNDksImV4cCI6MTY2NTg0OTE0OX0.bGmwOoJsP925spdLytb6Z4Zkjc50NLsqXjVYTb3Ecdg",
                }
            })

                .then(res => {
                    setValidation('Publication enregistrée !');
                })


            setSuccess(true);

        } catch (err) {
            if (!err?.response) {
                setValidation('pas de reponse serveur');
            } else {
                setValidation('Echec de la connexion')
            }
        }
    }
    return (
        <>
            {success ? (
                <h1>Publication enregistrée !</h1>
            ) : (
                modalState.newPostModal && (
                    <div className='modal'>
                        <div className='modal-content'>
                            <h2>Publication</h2>
                            <button className='btn-close' onClick={() => toggleModals("close")}>X</button>
                            <form onSubmit={handleForm}>
                                <label htmlFor="NewPostTitle"> title :</label>
                                <br />
                                <input
                                    ref={addInputs}
                                    type="text"
                                    name="title"
                                    required
                                    id="postTitle"
                                />
                                <br />
                                <label htmlFor="NewPostDescription"> Exprimez vous :</label>
                                <br />
                                <input
                                    ref={addInputs}
                                    type="text"
                                    name="description"
                                    required
                                    id="postDescription"
                                />
                                <label htmlFor="NewPostImage"> Image:</label>
                                <br />
                                <input
                                    ref={addInputs}
                                    type="file"
                                    name="image"
                                    id="postImage"
                                    accept='.jpg,.jpge,.png'
                                    onChange={event => {
                                        const file = event.target.files[0];
                                        setFile(file);
                                    }}
                                />

                                <p>{validation}</p>
                                <button>Soumettre</button>
                            </form>
                        </div>
                    </div>
                )
            )
            }
        </>
    );
}

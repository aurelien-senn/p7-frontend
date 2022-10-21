import React, { useContext, useRef, useState } from 'react';
import axios from '../../api/axios';


import { UserContext } from '../../context/userContext'
import './index.css'
import authHeader from '../../services/auth-header'


const REGISTER_URL = '/api/stuff';

export default function UpdatePost() {
    const [success, setSuccess] = useState(false);
    const { toggleModals, modalState } = useContext(UserContext)
    const localePost = JSON.parse(localStorage.getItem('updatePost'));
    const testauthHeader = authHeader();
    const [file, setFile] = useState();
    const [imageUrl, setImageUrl] = useState("");
    const inputs = useRef([])
    const [validation, setValidation] = useState('');


    const updateInputs = el => {
        if (el && !inputs.current.includes(el)) {
            inputs.current.push(el)


        }
    }
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {

            const title = inputs.current[0].value;
            const text = inputs.current[1].value;
            const image = file;

            const postThing = ({ title: title, description: text, image: image });

            await axios.put(`${REGISTER_URL}/${localePost._id}`, postThing, {
                headers: {
                    "Content-type": "multipart/form-data",
                    "authorization": `${testauthHeader.authorization}`,
                }
            })

                .then(res => {
                    setValidation('Publication modifé !');
                    window.location.reload();

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
            {
                success ? (
                    <h1> Modification réussit</h1 >
                ) : (
                    modalState.updatePostModal && (
                        <div className=''>
                            <div className='modal2-content'>
                                <button onClick={() => toggleModals("close")} className='btn-close'>X</button>
                                <h2>modifier la publication</h2>
                                <form onSubmit={handleUpdate}>
                                    <label htmlFor="">titre</label>
                                    <br />
                                    <input
                                        ref={updateInputs}
                                        type="text"
                                        name="titleUpdate"
                                        id="updateTitle"
                                        Value={localePost.title} />
                                    <br />
                                    <label >publication</label>
                                    <br />
                                    <textarea
                                        ref={updateInputs}
                                        type="text"
                                        name="descriptionUpdate"
                                        id="updateDescription"
                                        defaultValue={localePost.description}
                                    ></textarea>
                                    <br />
                                    {typeof localePost.imageUrl !== 'undefined' ? <><img alt={localePost.title} className="imgUpdate" src={localePost.imageUrl} /> </> : <></>}
                                    <br />
                                    <label htmlFor="">image</label>
                                    <br />
                                    <input
                                        ref={updateInputs}
                                        type="file"
                                        name="imageUpdate"
                                        id="updateImage"
                                        accept='.jpg,.jpge,.png'
                                        onChange={event => {
                                            const file = event.target.files[0];
                                            setFile(file);
                                        }} />
                                    <p>{validation}</p>
                                    <button>Soumettre</button>
                                </form>

                            </div>
                        </div>

                    ))
            }

        </>

    );
}


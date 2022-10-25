import React, { useContext, useRef, useState, useEffect } from 'react';
import axios from '../../api/axios';
import { UserContext } from '../../context/userContext'
import './index.css'
import authHeader from '../../services/auth-header'


const REGISTER_URL = '/api/stuff';

export default function Publication() {
    const [fileDataURL, setFileDataURL] = useState(null);
    const [success, setSuccess] = useState(false);
    const { toggleModals, modalState } = useContext(UserContext)
    const [validation, setValidation] = useState('');

    const [file, setFile] = useState(null);
    const inputs = useRef([])

    const testauthHeader = authHeader();
    // add inout in array
    const addInputs = el => {
        if (el && !inputs.current.includes(el)) {
            inputs.current.push(el)

        }
    }
    // save new post
    // @param {string} id of publication
    // @param {string} title
    // @param {string} description
    // @param {file} image
    // @param {string} id user
    // @return reload to home
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
                    "authorization": `${testauthHeader.authorization}`,
                }
            })

                .then(res => {

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
    //check mimetype
    const changeHandler = (e) => {
        const imageMimeType = /image\/(png|jpg|jpeg)/i;
        const file = e.target.files[0];
        if (!file.type.match(imageMimeType)) {
            alert("Image mime type is not valid");
            return;
        }
        setFile(file);
    }
    //preview image
    useEffect(() => {
        let fileReader, isCancel = false;
        if (file) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isCancel) {
                    setFileDataURL(result)
                }
            }
            fileReader.readAsDataURL(file);
        }
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        }

    }, [file]);



    return (
        <>
            {
                success ? (
                    <div className='modalPost'>
                        <div className='modalPost-content'>
                            <h1> post reussit</h1 >
                        </div>
                    </div>
                ) : (
                    modalState.newPostModal && (
                        <div className='modalPost'>
                            <div className='modalPost-content'>
                                <h2>Publication</h2>
                                <button className='btn-close-post' onClick={() => toggleModals("close")}>X</button>
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
                                    <textarea
                                        ref={addInputs}
                                        type="text"
                                        name="description"
                                        required
                                        id="postDescription"
                                    ></textarea>
                                    <br />
                                    <label htmlFor="NewPostImage"> Image:</label>
                                    <br />
                                    <input
                                        ref={addInputs}
                                        type="file"
                                        name="image"
                                        id="postImage"
                                        accept='.jpg,.jpge,.png'
                                        onChange={changeHandler}

                                    />

                                    {fileDataURL &&
                                        <p className="img-preview-wrapper">
                                            {
                                                <img src={fileDataURL} alt="preview" className='imgPreview' />
                                            }
                                        </p>}
                                    <p >{validation}</p>
                                    <button className='btn-red'>Soumettre</button>
                                </form>

                            </div>

                        </div>

                    )
                )
            }
        </>
    );
}


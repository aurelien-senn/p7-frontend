import React, { useContext, useRef, useState, useEffect } from 'react';
import axios from '../../api/axios';


import { UserContext } from '../../context/userContext'
import './index.css'
import authHeader from '../../services/auth-header'


const REGISTER_URL = '/api/stuff';

export default function UpdatePost() {
    const [fileDataURL, setFileDataURL] = useState(null);
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

    const changeHandler = (e) => {
        const imageMimeType = /image\/(png|jpg|jpeg)/i;
        const file = e.target.files[0];
        if (!file.type.match(imageMimeType)) {
            alert("Image mime type is not valid");
            return;
        }
        setFile(file);
    }
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
                    <h1> Modification réussit</h1 >
                ) : (
                    modalState.updatePostModal && (
                        <div className='modalUpdate'>
                            <div className='modalUpdate-content'>
                                <button onClick={() => toggleModals("close")} className='btn-close-update'>X</button>
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
                                    >{localePost.description}</textarea>
                                    <br />
                                    {fileDataURL ? (
                                        <p className="img-preview-wrapper">
                                            {
                                                <img src={fileDataURL} alt="preview" className='imgPreview' />
                                            }
                                        </p>) : (typeof localePost.imageUrl !== 'undefined' && (
                                            <><img alt={localePost.title} className="imgUpdate" src={localePost.imageUrl} /> </>))}
                                    <br />
                                    <label htmlFor="">image</label>
                                    <br />
                                    <input
                                        ref={updateInputs}
                                        type="file"
                                        name="imageUpdate"
                                        id="updateImage"
                                        accept='.jpg,.jpge,.png'
                                        onChange={changeHandler} />
                                    <p>{validation}</p>
                                    <button className='btn-update'>Soumettre</button>
                                </form>

                            </div>
                        </div>

                    ))
            }

        </>

    );
}


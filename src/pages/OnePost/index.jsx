import React, { useContext, useRef, useState } from 'react';
import axios from '../../api/axios';


import { UserContext } from '../../context/userContext'
import './style.css'
import authHeader from '../../services/auth-header'


const REGISTER_URL = '/api/stuff';

export default function OnePost() {
    const [success, setSuccess] = useState(false);
    const { toggleModals, modalState } = useContext(UserContext)
    const localePost = JSON.parse(localStorage.getItem('updatePost'));
    const testauthHeader = authHeader();
    const [file, setFile] = useState();
    const [imageUrl, setImageUrl] = useState("");
    const inputs = useRef([])
    const [validation, setValidation] = useState('');



    const handleUpdate = async (e) => {
        e.preventDefault()
        try {





            await axios.get(`${REGISTER_URL}/${localePost._id}`, {
                headers: {
                    "Content-type": "multipart/form-data",
                    "authorization": `${testauthHeader.authorization}`,
                }
            })

                .then(res => {
                    setValidation('succes');
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
                    modalState.onePostModal && (
                        <div className='modal1'>
                            <div className='modal2-content'>

                                <h1>une seul publication</h1>
                            </div>
                        </div>

                    ))
            }

        </>

    );
}


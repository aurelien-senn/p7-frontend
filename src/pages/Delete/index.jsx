import React, { useContext, useRef, useState } from 'react';
import axios from '../../api/axios';

import authHeader from '../../services/auth-header'
import { UserContext } from '../../context/userContext'
import './style.css'

const REGISTER_URL = '/api/stuff';



function Delete() {
    console.log('test');
    const [success, setSuccess] = useState(false);
    const [validationDel, setValidationDel] = useState('');
    const testauthHeader = authHeader();
    const { toggleModals, modalState } = useContext(UserContext)

    function DeletePublication() {
        const dataDel = JSON.parse(localStorage.getItem('updatePost'));
        console.log(dataDel.x._id);
        try {
            axios.delete(`${REGISTER_URL}/${dataDel.x._id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": `${testauthHeader.authorization}`,
                }
            })
                .then(res => {
                    setValidationDel('Youpi');
                    window.location.reload();
                    setSuccess(true);
                })

        } catch (err) {
            if (!err?.response) {
                setValidationDel('erreur serveur');
            } else {
                setValidationDel('Echec de la connexion')
                localStorage.clear();

            }
        }
    }

    return (
        <>
            {success ? (
                <h1> Suppression reussit réussit</h1 >
            ) : (modalState.deletePostModal && (

                <div className='modal1'>
                    <div className='modal2-content'>
                        <p>Etes-vous sûre de vouloir supprimer votre publication?</p>
                        <button onClick={() => DeletePublication()}>oui</button>
                        <button onClick={() => toggleModals("close")}>annuler</button>

                    </div>
                </div>))}


        </>

    )

        ;
}
export default Delete
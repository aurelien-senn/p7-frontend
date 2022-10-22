import React, { useContext, useRef, useState } from 'react';
import axios from '../../api/axios';

import authHeader from '../../services/auth-header'
import { UserContext } from '../../context/userContext'
import './style.css'

const REGISTER_URL = '/api/stuff';



function Delete() {

    const [success, setSuccess] = useState(false);
    const [validationDel, setValidationDel] = useState('');
    const testauthHeader = authHeader();
    const { toggleModals, modalState } = useContext(UserContext)

    function DeletePublication() {
        const dataDel = JSON.parse(localStorage.getItem('updatePost'));

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
            {modalState.deletePostModal && (

                <div className='modalDelete'>
                    <div className='modalDelete-content'>
                        <p>Etes-vous sûre de vouloir supprimer votre publication?</p>
                        <button className="buttonDelete" onClick={() => DeletePublication()}>oui</button>
                        <button className="buttonDelete" onClick={() => toggleModals("close")}>annuler</button>

                    </div>
                </div>)}


        </>

    )

        ;
}
export default Delete
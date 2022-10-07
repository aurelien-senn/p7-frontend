import React from 'react';
import axios from '../../api/axios';
import './index.css'
import authHeader from '../../services/auth-header'
import { UserContext } from '../../context/userContext'
export default function Home() {

    const testauthHeader = authHeader();
    console.log(testauthHeader);
    //     try {



    //         await axios.get(REGISTER_URL, postThing, {
    //             headers: {
    //                 "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzM5ODNjMzZmNGMyODliMDVhOGNmMWQiLCJpYXQiOjE2NjUxMjkxNDksImV4cCI6MTY2NTg0OTE0OX0.bGmwOoJsP925spdLytb6Z4Zkjc50NLsqXjVYTb3Ecdg",
    //             }
    //     })

    //             .then(res => {
    //         setValidation('Publication enregistrée !');
    //     })


    //     setSuccess(true);

    // } catch (err) {
    //     if (!err?.response) {
    //         setValidation('pas de reponse serveur');
    //     } else {
    //         setValidation('Echec de la connexion')
    //     }
    // }




    return (
        <div>
            <h1>Publications</h1>
        </div>
    );
}
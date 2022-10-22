import React, { useContext, useRef, useState, useEffect } from 'react';
import axios from '../../api/axios';
import { Link } from 'react-router-dom';


import './style.css'
import authHeader from '../../services/auth-header'


const REGISTER_URL = '/api/stuff';

export default function OnePost() {
    const [data, setData] = useState([]);
    let imagePost = true;
    const localePost = JSON.parse(localStorage.getItem('updatePost'));
    const testauthHeader = authHeader();
    const getOnePublication = () => {
        try {

            axios.get(`${REGISTER_URL}/${localePost.x._id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": `${testauthHeader.authorization}`,
                }
            })
                .then(res => {
                    setData(res.data)



                })
        } catch (err) {

            if (!err?.response) {
                console.log('erreur serveur');
            } else {
                console.log('Echec de la connexion');
            }


        }
        if ((typeof data.imageUrl) === 'undefined') {
            imagePost = false;
        }
        console.log(imagePost);
    }

    useEffect(() => {
        getOnePublication();

    }, []);

    return (

        <div className='modal'>
            <div className='modalonepost'>
                <div className='modalonepost-content'>
                    <Link to="/">Retour</Link>
                    <h2>{data.title}</h2>
                    <p>{data.description}</p>
                    {imagePost &&
                        <img src={data.imageUrl} alt={data.title} />
                    }
                </div>
            </div>
        </div>
    );
}


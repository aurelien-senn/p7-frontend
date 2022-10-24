import React, { useContext, useRef, useState, useEffect } from 'react';
import axios from '../../api/axios';
import { Link } from 'react-router-dom';


import './style.css'
import authHeader from '../../services/auth-header'
import * as moment from 'moment';
import 'moment/locale/fr';


const REGISTER_URL = '/api/stuff';

export default function OnePost() {
    const [data, setData] = useState([]);
    let imagePost = true;
    const localePost = JSON.parse(localStorage.getItem('updatePost'));
    const testauthHeader = authHeader();
    // view one publication
    // @param {string} id of publication
    // @return {array} publication
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

        if (((typeof localStorage.getItem('user')) == 'string')) {
            getOnePublication();
        } else {
            document.location.href = "http://localhost:3001/";
        }


    }, []);

    return (
        <div className='onePost '>

            <Link className='btn-redOnePost' to="/">Retour</Link>
            <div className='onePostText'>

                <p>  {moment(data.date).fromNow()}</p>
                <h2>{data.title}</h2>
                <p>{data.description}</p>
            </div>
            {imagePost &&
                <img className="imgOnePost " src={data.imageUrl} alt={data.title} />
            }

        </div>
    );
}


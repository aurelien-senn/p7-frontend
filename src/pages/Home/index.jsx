import React, { useContext, useRef, useState, useEffect } from 'react';
import axios from '../../api/axios';
import { UserContext } from '../../context/userContext'
import './index.css'
import authHeader from '../../services/auth-header'
const REGISTER_URL = '/api/stuff';

function Home() {
    const [data, setData] = useState([]);

    const [validation, setValidation] = useState('');
    const user = localStorage.getItem('user');
    const { toggleModals, modalState } = useContext(UserContext);
    const testauthHeader = authHeader();

    const getPublication = () => {
        try {
            axios.get(REGISTER_URL, {
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": `${testauthHeader.authorization}`,
                }
            })
                .then(res => {
                    setData(res.data)
                    setValidation('Youpi');
                })
        } catch (err) {
            if (!err?.response) {
                setValidation('pas de reponse serveur');
            } else {
                setValidation('Echec de la connexion')
            }
        }
    }
    useEffect(() => {
        getPublication();

    }, []);
    const datas = data.reverse();

    return (
        <>
            <h1>{validation}</h1>
            <div className="modal ">
                {datas.map((x) => (
                    <article key={x._id} className='modal-content'>

                        {/* affichage si admin ou auteur */}
                        <button className='btn1-close'>X</button>

                        <h2>{x.title}</h2>
                        <p>{x.description}</p>
                        <img alt={x.title} src={x.imageUrl} />
                    </article>
                ))}
            </div>

        </>
    )
}



export default Home;
import React, { useContext, useState, useEffect } from 'react';
import axios from '../../api/axios';
import { UserContext } from '../../context/userContext'
import './index.css'
import authHeader from '../../services/auth-header'
const REGISTER_URL = '/api/stuff';

function Home() {

    const [data, setData] = useState([]);
    const user = localStorage.getItem('user');
    const { toggleModals } = useContext(UserContext)
    const testauthHeader = authHeader();
    const [validationDel, setValidationDel] = useState('ok');
    const localeStorageUser = JSON.parse(localStorage.getItem("user"));

    const getPublication = () => {
        try {
            console.log(('avant axios'));
            if (!localeStorageUser) {

                toggleModals('signIn')
            }
            axios.get(REGISTER_URL, {
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": `${testauthHeader.authorization}`,
                }
            })
                .then(res => {
                    setData(res.data.reverse())
                    console.log('Youpi');
                })
        } catch (err) {
            console.log('apres axios');
            if (!err?.response) {
                console.log('erreur serveur');
            } else {
                console.log('Echec de la connexion');
            }
        }
    }

    useEffect(() => {
        getPublication();
    }, []);

    function DeletePublication(id) {
        const dataDel = id.x._id;
        try {
            axios.delete(`${REGISTER_URL}/${dataDel}`, {
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": `${testauthHeader.authorization}`,
                }
            })
                .then(res => {
                    setValidationDel('Youpi');
                    getPublication();
                })
        } catch (err) {
            if (!err?.response) {
                setValidationDel('erreur serveur');
            } else {
                setValidationDel('Echec de la connexion')

            }
        }
    }

    async function LikeDislike(likeDislike, idLikeDislike, userLiked, userDisliked) {
        const idUser = JSON.parse(user).userId;
        let number;
        if ((userLiked.indexOf(idUser) !== -1 && likeDislike === 'dislike') || (userDisliked.indexOf(idUser) !== -1 && likeDislike === 'like')) {
        } else {
            if (userLiked.indexOf(idUser) === -1 && userDisliked.indexOf(idUser) === -1) {
                console.log('like ou dislike');
                if (likeDislike === 'like') {
                    number = 1;
                } else if (likeDislike === 'dislike') {
                    number = -1;
                }
            } else if (userDisliked.indexOf(idUser) !== -1 && likeDislike === 'dislike') {
                number = 0;
            } else if (userLiked.indexOf(idUser) !== -1 && likeDislike === 'like') {
                number = 0;
            }
            try {
                await axios.post(`${REGISTER_URL}/${idLikeDislike._id}/like`, { 'userId': idUser, 'like': number }, {
                    headers: {
                        'Content-Type': 'application/json',
                        "authorization": `${testauthHeader.authorization}`,
                    }
                })
                    .then(res => {
                        setValidationDel('Youpi');
                        getPublication();
                    })
            } catch (err) {
                if (!err?.response) {
                    setValidationDel('erreur serveur');
                } else {
                    setValidationDel('Echec de la connexion')
                }
            }
        }

    }

    return (
        <>
            <h1>Publications {validationDel}</h1>
            <div className="modal ">
                {data.map((x) => (
                    <article key={x._id} className='modal-content'>
                        {/* affichage si admin ou auteur */}
                        {(x.userId === localeStorageUser.userId || localeStorageUser.admin) ? <button onClick={() => DeletePublication({ x })}>X</button> : <div></div>}



                        < h2 > {x.title}  </h2>
                        <p>{x.userId}</p>
                        <p>{localeStorageUser.userId}</p>
                        <p className='truncate-overflow' >{x.description}</p>
                        {/* test si deja liker */}
                        <button className={(x.usersLiked.indexOf(localeStorageUser.userId) !== -1) ? 'red' : 'grey'} onClick={() => LikeDislike('like', x, x.usersLiked, x.usersDisliked)}>like: {x.likes} </button>
                        {/* test su deja duskijer */}
                        <button className={(x.usersDisliked.indexOf(localeStorageUser.userId) !== -1) ? 'red' : 'grey'} onClick={() => LikeDislike('dislike', x, x.usersLiked, x.usersDisliked)}>dislike:{x.dislikes}</button>
                        <img alt={x.title} src={x.imageUrl} />
                    </article>
                ))
                }
            </div >
        </>)
}
export default Home;
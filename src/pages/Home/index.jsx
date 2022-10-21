import React, { useContext, useState, useEffect } from 'react';
import axios from '../../api/axios';
import { UserContext } from '../../context/userContext'
import './index.css'
import authHeader from '../../services/auth-header'
import { useNavigate } from 'react-router-dom'

const REGISTER_URL = '/api/stuff';

function Home() {

    const [data, setData] = useState([]);
    const user = localStorage.getItem('user');
    const { toggleModals, modalState } = useContext(UserContext)
    const testauthHeader = authHeader();
    const [validationDel, setValidationDel] = useState('ok');
    const localeStorageUser = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const getPublication = () => {
        try {

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

                })
        } catch (err) {

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



    async function LikeDislike(likeDislike, idLikeDislike, userLiked, userDisliked) {
        const idUser = JSON.parse(user).userId;
        let number;
        if ((userLiked.indexOf(idUser) !== -1 && likeDislike === 'dislike') || (userDisliked.indexOf(idUser) !== -1 && likeDislike === 'like')) {
        } else {
            if (userLiked.indexOf(idUser) === -1 && userDisliked.indexOf(idUser) === -1) {

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
    function localStorageUpdate(idPost) {

        localStorage.setItem("updatePost", JSON.stringify(idPost));
        toggleModals('updatePost')

    }
    function DeletePublication(idPost) {

        localStorage.setItem("updatePost", JSON.stringify(idPost));
        toggleModals('delete')

    }
    function OnePost(idPost) {
        localStorage.setItem("updatePost", JSON.stringify(idPost))
<<<<<<< HEAD
=======

        navigate("/onepost");

    }
>>>>>>> 293fe25a2f73fdad5f579f4c5108d6828ec01618

        navigate("/onepost");

    }
    return (
<<<<<<< HEAD
        <><div className='top'>
            <div className="modal ">
                {data.map((x) => (
                    <article key={x._id} className='modal-content'>
                        <div className='container'>
                            <div className='container-content-text'>
                                {/* affichage si admin ou auteur */}
                                {(x.userId === localeStorageUser.userId || localeStorageUser.admin) ?
                                    <>
                                        <button className='btn-close-home' onClick={() => DeletePublication({ x })}>X</button>
                                        <button className='btn-edit-home' onClick={() => { localStorageUpdate(x) }} >Editer</button>
                                    </> : <></>}
                                {/* test si deja liker */}
                                <div className='container-dis-like'>
                                    <button className={(x.usersLiked.indexOf(localeStorageUser.userId) !== -1) ? 'red' : 'grey'} onClick={() => LikeDislike('like', x, x.usersLiked, x.usersDisliked)}>
                                        <i class="fa-solid fa-thumbs-up"></i>
                                        : {x.likes}
                                    </button>
                                    {/* test su deja duskijer */}
                                    <button className={(x.usersDisliked.indexOf(localeStorageUser.userId) !== -1) ? 'red' : 'grey'} onClick={() => LikeDislike('dislike', x, x.usersLiked, x.usersDisliked)}>
                                        <i class="fa-solid fa-thumbs-down"></i>
                                        : {x.dislikes}
                                    </button>
                                </div>
                                <div className='truncate-overflow'>
                                    < h2 > {x.title}  </h2>
                                    <p className='truncate-overflow' >{x.description}</p>
                                </div>
                                <button className='btn-red-home' onClick={() => OnePost({ x })}>voir plus ...</button>
                            </div>
                            <div className='container-content-image'>
                                {typeof x.imageUrl !== 'undefined' && <><img alt={x.title} src={x.imageUrl} className='image-post' /> </>}
                            </div>
                        </div>
=======
        <>
            <div className="modalhome ">
                {data.map((x) => (
                    <article key={x._id} className='modalhome-content'>
                        {/* affichage si admin ou auteur */}
                        {(x.userId === localeStorageUser.userId || localeStorageUser.admin) &&
                            <>
                                <button onClick={() => DeletePublication({ x })}>X</button>
                                <button onClick={() => { localStorageUpdate(x) }} >Editer</button>
                            </>}
                        < h2 > {x.title}  </h2>
                        <p className='truncate-overflow' >{x.description}</p>
                        <button onClick={() => OnePost({ x })}>voir plus</button>
                        {/* test si deja liker */}
                        <button className={(x.usersLiked.indexOf(localeStorageUser.userId) !== -1) ? 'red' : 'grey'} onClick={() => LikeDislike('like', x, x.usersLiked, x.usersDisliked)}>like: {x.likes} </button>
                        {/* test su deja duskijer */}
                        <button className={(x.usersDisliked.indexOf(localeStorageUser.userId) !== -1) ? 'red' : 'grey'} onClick={() => LikeDislike('dislike', x, x.usersLiked, x.usersDisliked)}>dislike:{x.dislikes}</button>
                        {typeof x.imageUrl !== 'undefined' && <><img alt={x.title} src={x.imageUrl} /> </>}
>>>>>>> 293fe25a2f73fdad5f579f4c5108d6828ec01618
                    </article>
                ))
                }
            </div >
        </div>
        </>)
}
export default Home;

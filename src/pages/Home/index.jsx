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
    const { toggleModals } = useContext(UserContext)
    const testauthHeader = authHeader();
    const [validationDel, setValidationDel] = useState('ok');

    const [like, setLike] = useState(false);
    const [dislike, setDislike] = useState(false);


    function DeletePublication(id) {
        const dataDel = id.x._id;
        console.log(`${REGISTER_URL}/${dataDel}`);
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
    const getPublication = () => {
        try {
            axios.get(REGISTER_URL, {
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": `${testauthHeader.authorization}`,
                }
            })
                .then(res => {
                    setData(res.data.reverse())
                    setValidation('Youpi');
                    toggleModals('close');

                })
        } catch (err) {
            if (!err?.response) {
                setValidation('erreur serveur');
            } else {
                setValidation('Echec de la connexion')
            }
        }
    }



    async function LikeDislike(likeDislike, idLikeDislike, userLiked, userDisliked) {
        const idUser = JSON.parse(user).userId;
        let number;

        if (userLiked.indexOf(idUser) !== -1 && likeDislike === 'dislike' || userDisliked.indexOf(idUser) !== -1 && likeDislike === 'like') {
            console.log("deja liker ou disliker");
        } else {
            if (userLiked.indexOf(idUser) === -1 && userDisliked.indexOf(idUser) === -1) {
                console.log('like ou dislike');
                if (likeDislike === 'like') {

                    // add like
                    // desactive pointeur sur dislike
                    console.log('add like');
                    number = 1;
                    console.log(number);


                } else if (likeDislike === 'dislike') {
                    // add dislike
                    // desactive pointeur sur like
                    console.log("dislike");
                    number = -1;
                    console.log(number);

                }

            } else if (userDisliked.indexOf(idUser) !== -1 && likeDislike === 'dislike') {
                //   supp dislike
                // reactive pointeur sur les deux
                console.log('suppdislike');
                number = 0;
                console.log(number);

            } else if (userLiked.indexOf(idUser) !== -1 && likeDislike === 'like') {
                // supp like
                // reactive pointeur sur les deux
                number = 0;
                console.log('supplike');
                console.log(number);
            }
            // lancer api

            console.log(number);
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
    useEffect(() => {
        getPublication();

    }, []);
    function refreshPage() {
        window.location.reload();
    }

    return (
        <>
            <h1>Publications {validationDel}</h1>
            <div className="modal ">
                {data.map((x) => (
                    <article key={x._id} className='modal-content'>
                        <button onClick={() => DeletePublication({ x })}>X</button>
                        {/* affichage si admin ou auteur */}
                        < h2 > {x.title}  </h2>
                        <p>{x._id}</p>
                        <p className='truncate-overflow' >{x.description}</p>
                        <button onClick={() => LikeDislike('like', x, x.usersLiked, x.usersDisliked)}>like: {x.likes} </button>
                        <button onClick={() => LikeDislike('dislike', x, x.usersLiked, x.usersDisliked)}>dislike:{x.dislikes}</button>
                        <img alt={x.title} src={x.imageUrl} />
                    </article>
                ))
                }
            </div >
        </>)
}
export default Home;
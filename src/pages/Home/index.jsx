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
    // si true like
    const [like, setLike] = useState(false);
    const [dislike, setDislike] = useState(false);

    function DeletePublication(id) {
        console.log(id);

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
                    setData(res.data)
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
    function LikeDislike(likeDislike, userLiked, userDisliked) {
        const idUser = JSON.parse(user).userId;

        console.log(likeDislike);
        console.log(data);
        console.log(userLiked);
        console.log(idUser);
        console.log(userDisliked.indexOf(idUser));
        console.log(userLiked.indexOf(idUser));

        if (userLiked.indexOf(idUser) !== -1 && likeDislike === 'dislike' || userDisliked.indexOf(idUser) !== -1 && likeDislike === 'like') {
            console.log("deja liker ou disliker");
        } else {
            if (userLiked.indexOf(idUser) === -1 && userDisliked.indexOf(idUser) === -1) {
                // add like ou dislike
                // active curseur pointeur sur like ou dislike
                console.log('like ou dislike');
                if (likeDislike === 'like') {
                    console.log("like");
                    // add like
                    // desactive pointeur sur dislike
                } else if (likeDislike === 'dislike') {
                    // add dislike
                    // desactive pointeur sur like
                    console.log("dislike");
                }
                console.log('ok');
            } else if (userDisliked.indexOf(idUser) !== -1 && likeDislike === 'dislike') {
                //   supp dislike
                // reactive pointeur sur les deux
            } else if (userLiked.indexOf(idUser) !== -1 && likeDislike === 'like') {
                // supp like
                // reactive pointeur sur les deux
            }
        }
    }
    useEffect(() => {
        getPublication();

    }, []);




    const datas = data.reverse();


    return (

        <>
            <h1>Publications {validationDel}</h1>
            <div className="modal ">
                {datas.map((x) => (

                    <article key={x._id} className='modal-content'>
                        <button onClick={() => DeletePublication({ x })}>X</button>
                        {/* affichage si admin ou auteur */}
                        < h2 > {x.title}  </h2>
                        <p>{x._id}</p>
                        <p className='truncate-overflow' >{x.description}</p>
                        <button className={like} onClick={() => LikeDislike('like', x.usersLiked, x.usersDisliked)}>like: {x.likes} </button>
                        <button className={dislike} onClick={() => LikeDislike('dislike', x.usersLiked, x.usersDisliked)}>dislike:{x.dislikes}</button>
                        <img alt={x.title} src={x.imageUrl} />
                    </article>
                ))
                }
            </div >



        </>)
}



export default Home;
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

    function DeletePublication(id) {

        console.log(`${REGISTER_URL}/:id`);
        const dataDel = id.x._id;
        console.log(dataDel);
        console.log(testauthHeader.authorization);
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
                        <img alt={x.title} src={x.imageUrl} />
                    </article>
                ))
                }
            </div >



        </>)
}



export default Home;
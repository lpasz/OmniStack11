import React, { useState } from 'react'
import './styles.css'
import heroesLogo from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api'

export default function Register()
{
    const [ title, setTitle ] = useState( '' )
    const [ description, setDescription ] = useState( '' )
    const [ value, setValue ] = useState( '' )

    async function OnSubmit( e )
    {
        e.preventDefault()
        try
        {
            
            const response = await api.post( '/incidents', {
                title,
                description,
                value
            }, {
                headers: {
                ong_id:localStorage.getItem('ongId')
                }
            } )
            console.log( response.data )
        }
        catch ( err )
        {
            alert("Aconteceu um erro")
        }
    }

    return (
        <div className="newincident">
            <div className="content">
                <section>
                    <img src={heroesLogo} alt="" />
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso, detalhadamente para encontrar um heroi para resolver isso</p>
                    <Link className='link' to="/profile">
                        <FiArrowLeft className='link-logo' size={25} color="#E02041" />
                        Voltar a Home
                    </Link>
                </section>
                <form onSubmit={OnSubmit}>
                    <input
                        value={title}
                        onChange={e => setTitle( e.target.value )}
                        placeholder='Titulo do Caso'

                    />
                    <textarea
                        value={description}
                        onChange={e => setDescription( e.target.value )}
                        className='descrition' placeholder='Descrição'

                    />
                    <input
                        value={value}
                        onChange={e => setValue( e.target.value )}
                        placeholder='Valor em Reais'

                    />

                    <button className='button' type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}
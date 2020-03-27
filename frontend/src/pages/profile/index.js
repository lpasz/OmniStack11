import React, { useEffect, useState } from 'react'
import heroesLogo from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'
import api from '../../services/api'
import './styles.css'

export default function Profile()
{
    const history = useHistory()
    const [ cases, setCases ] = useState( [] )
    const ongName = localStorage.getItem( 'ongName' )

    async function deleteCase( ongId, caseId )
    {
        const areYouSure = window.confirm( "Realmente quer deletar o caso ?" )
        if ( !areYouSure )
        {
            return
        }

        if ( ongId === localStorage.getItem( 'ongId' ) )
        {
            try
            {
                await api.delete( `/incidents/${ caseId }`, { headers: { ong_id: localStorage.getItem( 'ongId' ) } } )
                setCases( cases.filter( c => c.id !== caseId ) )

            }
            catch ( err )
            {
                alert( "Erro ao deleter caso!" )
            }
        }
    }

    useEffect( () =>
    {
        async function GetAllOngCases()
        {
            try
            {
                const response = await api.get( '/profile', { headers: { ong_id: localStorage.getItem( 'ongId' ) } } )
                console.log( response )
                setCases( response.data )
            }
            catch ( err )
            {
                alert( "Erro ao buscar casos cadastrados" )
            }
        }
        GetAllOngCases()

    }, [] )

    return (
        <div className="profile-container">
            <header>
                <img src={heroesLogo} alt="Be The Hero" />
                <span>Bem Vinda, {ongName}</span>

                <Link className='button' to="/incidents/new">Cadastrar Novo Caso</Link>

                <button onClick={() =>
                {
                    localStorage.clear()
                    history.push( '/' )
                }}>
                    <FiPower className='link-logo' size={25} color="#E02041" />
                </button>
            </header>
            <h1>Casos Cadastrador</h1>

            <ul>
                {cases.map( c =>
                {
                    const { title, description, value, id, ong_id } = c
                    return ( <li key={id}>
                        <strong>CASO:</strong>
                        <p>{title}</p>

                        <strong> DESCRIÇÃO:</strong>
                        <p>{description}</p>

                        <strong> Custo:</strong>
                        <p>{Intl.NumberFormat( 'pt-BR', { style: "currency", currency: 'BRL' } ).format( value )}</p>

                        <button onClick={() => deleteCase( ong_id, id )}>
                            <FiTrash2 size={20} color='#a8a8b3' />
                        </button>

                    </li>
                    )
                } )}
            </ul>


        </div>
    )
}
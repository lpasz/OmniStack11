import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'
import './styles.css'
import heroesImage from '../../assets/heroes.png'
import heroesLogo from '../../assets/logo.svg'
import api from '../../services/api'
import Routes from '../../routes'
export default function Logon()
{
    const [ id, setId ] = useState( '' )
    const history = useHistory()

    async function LogIn(e)
    {
        e.preventDefault()
        try
        {
            const response = await api.post( 'sessions', { id } )
            localStorage.setItem('ongId',id)
            localStorage.setItem('ongName',response.data.name)
            history.push( '/profile' )
            
        }
        catch
        {
            alert('Não foi possivel fazer Login, verifique seu ID e tente novamente')
        }
        
    }

    return (
        <div className="login-container">
            <section className="form">
                <img src={heroesLogo} alt="" />
                <form onSubmit={LogIn}>
                    <h1> Faça o seu Login </h1>
                    <input value={id} onChange={e=>setId(e.target.value)} type="text" placeholder="Sua ID" />
                    <button className="button" type="submit">Entrar</button>
                    <Link className='link' to="/register">
                        <FiLogIn className='link-logo' size={25} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImage} alt="Heroes" />
        </div>
    )
}
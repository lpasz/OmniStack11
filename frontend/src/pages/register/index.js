import React, { useState } from 'react'
import './styles.css'
import heroesLogo from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api'

export default function Register()
{

    const [ name, setName ] = useState( '' )
    const [ email, setEmail ] = useState( '' )
    const [ whatsapp, setWhatsapp ] = useState( '' )
    const [ city, setCity ] = useState( '' )
    const [ uf, setUf ] = useState( '' )

    const history = useHistory()

    async function OnSubmitRegister( e )
    {
        e.preventDefault()
        var registerValues = {
            name,
            email,
            whatsapp,
            city,
            uf
        }

        try
        {
            const response = await api.post( 'ongs', registerValues )
            const { id } = response.data

            alert( `Seu ID de acesso é ${ id }` )
            history.push('/')
        }
        catch{
            alert('Deu ruim!')
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={heroesLogo} alt="" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrar os casos da sua ONG.</p>
                    <Link className='link' to="/">
                        <FiArrowLeft className='link-logo' size={25} color="#E02041" />
                        Voltar ao Login
                    </Link>
                </section>
                <form onSubmit={OnSubmitRegister}>
                    <input
                        value={name}
                        onChange={e => setName( e.target.value )}
                        placeholder='Nome da ONG'
                    />
                    <input value={email}
                        onChange={e => setEmail( e.target.value )}
                        type="email"
                        placeholder='Email'
                    />
                    <input value={whatsapp}
                        onChange={e => setWhatsapp( e.target.value )}
                        placeholder='Whatsapp'
                    />
                    <div className="input-group">
                        <input value={city}
                            onChange={e => setCity( e.target.value )}
                            type="text"
                            placeholder='Cidade'
                        />
                        <input value={uf}
                            onChange={e => setUf( e.target.value )}
                            type="text"
                            placeholder='UF'
                            style={{ width: 80 }} />
                    </div>
                    <button className='button' type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}
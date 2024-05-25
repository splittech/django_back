import React, { useContext, useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import { Context } from '..'
import { Link } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

export default observer(function Authorisation() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [usernameMessage, setUsernameMessage] = useState('')
    const [emailMessage, setEmailMessage] = useState('')
    const [passwordMessage, setPasswordMessage] = useState('')

    const { store } = useContext(Context)

    if (store.isAuth) {
        return <Navigate to='/account' />
    }

    if (store.isLoading) {
        return <div>Загрузка...</div>
    }

    function checker() {
        let flag = true
        if (username === '') {
            setUsernameMessage('Заполните это поле!')
            flag = false
        } else {
            setUsernameMessage('')
        }
        if (email === '') {
            setEmailMessage('Заполните это поле!')
            flag = false
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            setEmailMessage('Email введен не корректно!')
            flag = false
        } else {
            setEmailMessage('')
        }
        if (password === '') {
            setPasswordMessage('Заполните это поле!')
            flag = false
        } else {
            setPasswordMessage('')
        }
        return flag
    }

    return (
        <div className='account-login'>
            <div className='account-login-registration'>
                <h1 className='account-login-title'>Войти</h1>
                <Link to={'/registration'} >
                    <Button title={'Регистрация'} />
                </Link>
            </div>
            <div className='account-login-item'>
                <span className='account-login-item-title'>Имя пользователя:</span>
                <Input
                    className={usernameMessage !== '' && 'input-invalid'}
                    onChange={e => setUsername(e.target.value)}
                    value={username}
                    type='text'
                    placeholder={'Имя пользователя'} />
                <label style={usernameMessage === '' ? { display: 'none' } : { color: '#c60021' }}>{usernameMessage}</label>
            </div>
            <div className='account-login-item'>
                <span className='account-login-item-title'>Электронная почта:</span>
                <Input
                    className={emailMessage !== '' && 'input-invalid'}
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    type='email'
                    placeholder={'Электронная почта'} />
                <label style={emailMessage === '' ? { display: 'none' } : { color: '#c60021' }}>{emailMessage}</label>
            </div>
            <div className='account-login-item'>
                <span className='account-login-item-title'>Пароль:</span>
                <Input
                    className={passwordMessage !== '' && 'input-invalid'}
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    type='password'
                    placeholder={'Введите пароль'} />
                <label style={passwordMessage === '' ? { display: 'none' } : { color: '#c60021' }}>{passwordMessage}</label>
            </div>
            <Button
                title={'Войти'}
                className='button-enter'
                onClick={() => {
                    if (checker()) {
                        store.login(username, email, password)
                    }
                }} />
            <Link to={'/authorisation/forget_password'} className='account-login-forget-password'>Забыли пароль?</Link>
        </div>
    )
})

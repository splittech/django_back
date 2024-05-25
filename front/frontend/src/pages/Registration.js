import React, { useContext, useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import { Context } from '..'
import { Link, Navigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

export default observer(function Registration() {
    const [lastname, setLastname] = useState('')
    const [firstname, setFirstname] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [lastnameMessage, setLastnameMessage] = useState('')
    const [firstnameMessage, setFirstnameMessage] = useState('')
    const [usernameMessage, setUsernameMessage] = useState('')
    const [emailMessage, setEmailMessage] = useState('')
    const [passwordMessage, setPasswordMessage] = useState('')
    const [password2Message, setPassword2Message] = useState('')

    function checker() {
        let flag = true
        if (lastname === '') {
            setLastnameMessage('Заполните это поле!')
            flag = false
        } else {
            setLastnameMessage('')
        }
        if (firstname === '') {
            setFirstnameMessage('Заполните это поле!')
            flag = false
        } else {
            setFirstnameMessage('')
        }
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
        if (password !== '' && password2 !== '' && !checkPassword()) {
            setPasswordMessage('Пароли не совпадают!')
            setPassword2Message('Пароли не совпадают!')
            flag = false
        } else {
            setPasswordMessage('')
            setPassword2Message('')
        }
        if (password === '') {
            setPasswordMessage('Заполните это поле!')
            flag = false
        }
        if (password2 === '') {
            setPassword2Message('Заполните это поле!')
            flag = false
        }
        return flag
    }

    function checkPassword() {
        if (password === password2) {
            return true
        } else {
            return false
        }
    }

    const { store } = useContext(Context)

    if (store.isAuth) {
        return <Navigate to='/account' />
    }

    if (store.isLoading) {
        return <div>Загрузка...</div>
    }

    return (
        <div className='account-login'>
            <div className='account-login-registration' >
                <h1 className='account-login-title'>Регистрация</h1>
                <Link to={'/authorisation'}>
                    <Button
                        title={'Войти'}
                        className='account-login-button' />
                </Link>
            </div>
            <div className='account-login-item'>
                <span className='account-login-item-title'>Фамилия:</span>
                <Input
                    className={lastnameMessage !== '' && 'input-invalid'}
                    onChange={e => setLastname(e.target.value)}
                    value={lastname}
                    type='text'
                    placeholder={'Введите фамилию'}
                    required />
                <label style={lastnameMessage === '' ? { display: 'none' } : { color: '#c60021' }}>{lastnameMessage}</label>
            </div>
            <div className='account-login-item'>
                <span className='account-login-item-title'>Имя:</span>
                <Input
                    className={firstnameMessage !== '' && 'input-invalid'}
                    onChange={e => setFirstname(e.target.value)}
                    value={firstname}
                    type='text'
                    placeholder={'Введите имя'}
                    required />
                <label style={firstnameMessage === '' ? { display: 'none' } : { color: '#c60021' }}>{firstnameMessage}</label>
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
                <span className='account-login-item-title'>Адрес электронной почты:</span>
                <Input
                    className={emailMessage !== '' && 'input-invalid'}
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    type='email'
                    placeholder={'email@email.com'}
                    required />
                <label style={emailMessage === '' ? { display: 'none' } : { color: '#c60021' }}>{emailMessage}</label>
            </div>
            <div className='account-login-item'>
                <span className='account-login-item-title'>Пароль:</span>
                <Input
                    className={passwordMessage !== '' && 'input-invalid'}
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    type='password'
                    placeholder={'Придумайте пароль'}
                    required />
                <label style={passwordMessage === '' ? { display: 'none' } : { color: '#c60021' }}>{passwordMessage}</label>
            </div>
            <div className='account-login-item'>
                <span className='account-login-item-title'>Повторите пароль:</span>
                <Input
                    className={password2Message !== '' && 'input-invalid'}
                    onChange={e => setPassword2(e.target.value)}
                    value={password2}
                    type='password'
                    placeholder={'Повторите пароль'}
                    required />
                <label style={password2Message === '' ? { display: 'none' } : { color: '#c60021' }}>{password2Message}</label>
            </div>
            <Button
                title={'Зарегистрироваться'}
                className='button-enter'
                onClick={() => {
                    if (checker()) {
                        store.registration(username, email, firstname, lastname, password)
                    }
                }} />
        </div>
    )
})

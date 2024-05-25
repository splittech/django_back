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
                    onChange={e => setLastname(e.target.value)}
                    value={lastname}
                    type='text'
                    placeholder={'Введите фамилию'}
                    required />
            </div>
            <div className='account-login-item'>
                <span className='account-login-item-title'>Имя:</span>
                <Input
                    onChange={e => setFirstname(e.target.value)}
                    value={firstname}
                    type='text'
                    placeholder={'Введите имя'}
                    required />
            </div>
            <div className='account-login-item'>
                <span className='account-login-item-title'>Имя пользователя:</span>
                <Input
                    onChange={e => setUsername(e.target.value)}
                    value={username}
                    type='text'
                    placeholder={'Имя пользователя'} />
            </div>
            <div className='account-login-item'>
                <span className='account-login-item-title'>Адрес электронной почты:</span>
                <Input
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    type='email'
                    placeholder={'email@email.com'}
                    required />
            </div>
            <div className='account-login-item'>
                <span className='account-login-item-title'>Пароль:</span>
                <Input
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    type='password'
                    placeholder={'Придумайте пароль'}
                    required />
            </div>
            <div className='account-login-item'>
                <span className='account-login-item-title'>Повторите пароль:</span>
                <Input
                    onChange={e => setPassword2(e.target.value)}
                    value={password2}
                    type='password'
                    placeholder={'Повторите пароль'}
                    required />
            </div>
            <Button
                title={'Зарегистрироваться'}
                className='button-enter'
                onClick={() => {
                    if (lastname != '' &&
                        firstname != '' &&
                        username != '' &&
                        email != '' &&
                        password != '' &&
                        password2 != '' &&
                        checkPassword()) {
                        store.registration(username, email, firstname, lastname, password)
                    }
                }} />
        </div>
    )
})

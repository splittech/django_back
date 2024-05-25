import React, { useContext, useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import { Context } from '..'
import { Link } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

export default observer(function Authorisation() {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const { store } = useContext(Context)

    if (store.isAuth) {
        return <Navigate to='/account' />
    }

    if (store.isLoading) {
        return <div>Загрузка...</div>
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
                <span className='account-login-item-title'>Электронная почта:</span>
                <Input
                    onChange={e => setLogin(e.target.value)}
                    value={login}
                    type='email'
                    placeholder={'Электронная почта'} />
            </div>
            <div className='account-login-item'>
                <span className='account-login-item-title'>Пароль:</span>
                <Input
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    type='password'
                    placeholder={'Введите пароль'} />
            </div>
            <Button
                title={'Войти'}
                className='button-enter'
                onClick={() => {
                    if (login != '' && password != '') {
                        store.login(login, password)
                    }
                }} />
            <Link to={'/authorisation/forget_password'} className='account-login-forget-password'>Забыли пароль?</Link>
        </div>
    )
})

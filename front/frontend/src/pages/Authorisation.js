import React, { Component } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import { Link } from 'react-router-dom'

export default class Authorisation extends Component {
    render() {
        return (
            <div className='account-login'>
                <div className='account-login-registration'>
                    <h1 className='account-login-title'>Войти</h1>
                    <Link to={'/registration'} ><Button title={'Регистрация'} /></Link>
                </div>
                <div className='account-login-item'>
                    <span className='account-login-item-title'>Логин:</span>
                    <Input placeholder={'Номер телефона или эл. почта'} />
                </div>
                <div className='account-login-item'>
                    <span className='account-login-item-title'>Пароль:</span>
                    <Input placeholder={'Введите пароль'} />
                </div>
                <Button title={'Войти'} className='button-enter' />
                <Link to={'/authorisation/forget_password'} className='account-login-forget-password'>Забыли пароль?</Link>
            </div>
        )
    }
}

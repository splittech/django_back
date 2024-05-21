import React, { Component } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'

export default class Registration extends Component {
    render() {
        return (
            <div className='account-login'>
                <h1 className='account-login-title'>Регистрация</h1>
                <div className='account-login-item'>
                    <span className='account-login-item-title'>Фамилия:</span>
                    <Input placeholder={'Введите фамилию'} />
                </div>
                <div className='account-login-item'>
                    <span className='account-login-item-title'>Имя:</span>
                    <Input placeholder={'Введите имя'} />
                </div>
                <div className='account-login-item'>
                    <span className='account-login-item-title'>Отчество:</span>
                    <Input placeholder={'Введите отчество'} />
                </div>
                <div className='account-login-item'>
                    <span className='account-login-item-title'>Дата рождения:</span>
                    <Input placeholder={'дд.мм.гггг'} />
                </div>
                <div className='account-login-item'>
                    <span className='account-login-item-title'>Номер телефона:</span>
                    <Input placeholder={'+7 (999) 999-99-99'} />
                </div>
                <div className='account-login-item'>
                    <span className='account-login-item-title'>Адрес электронной почты:</span>
                    <Input placeholder={'email@email.com'} />
                </div>
                <div className='account-login-item'>
                    <span className='account-login-item-title'>Пароль:</span>
                    <Input placeholder={'Придумайте пароль'} />
                </div>
                <div className='account-login-item'>
                    <span className='account-login-item-title'>Повторите пароль:</span>
                    <Input placeholder={'Повторите пароль'} />
                </div>
                <Button title={'Зарегистрироваться'} className='button-enter' />
            </div>
        )
    }
}

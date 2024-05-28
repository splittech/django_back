import React, { Component } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'

export default class ForgetPassword extends Component {
    render() {
        return (
            <div className='account-login'>
                <div className='account-login-registration'>
                    <h1 className='account-login-title'>Восстановление пароля</h1>
                </div>
                <div className='account-login-item'>
                    <span className='account-login-item-title'>Введите адрес электронной почты:</span>
                    <Input placeholder={'Адрес электронной почты'} required={true} />
                    <span className='account-login-item-message'>На указанный адрес будет отправлена <br></br>
                        информация о восстановлении пароля.</span>
                </div>
                <Button title={'Отправить'} className='button-enter' />
            </div>
        )
    }
}

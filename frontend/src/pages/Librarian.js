import React, { createRef, useEffect, useState, useContext } from 'react'
import PageNavigation from '../components/PageNavigation'
import Button from '../components/Button'
import Input from '../components/Input'
import { observer } from 'mobx-react-lite'
import { Context } from '..'

export default observer(function Librarian() {
    const { store } = useContext(Context)

    const items = [
        {
            id: 1,
            title: 'Книги',
            link: 'librarian/books'
        },
        {
            id: 2,
            title: 'Читатели',
            link: 'librarian/readers'
        },
        {
            id: 3,
            title: 'Отзывы',
            link: 'librarian/reviews'
        }
    ]

    const [user, setUser] = useState(store.user
        //     {
        //     eTicket: 123456,
        //     photo: '',
        //     lastName: 'Фамилия',
        //     firstName: 'Имя',
        //     email: 'email@email.com',
        //     position: 'Старший библиотекарь',
        // }
    )

    const refComponent = createRef()
    const [height, setHeight] = useState('')
    const [width, setWidht] = useState('')
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        if (refComponent.current != null) {
            setHeight(refComponent.current.getBoundingClientRect().height)
            setWidht(height * 3 / 4)
        }
    }, [refComponent])

    return (
        <div>
            <h1 className='page-title'>Личный кабинет библиотекаря</h1>
            <div>
                {!isEdit ?
                    <div className='personal-account-information'>
                        <img src={user.photo}
                            width={width}
                            height={height}
                            className='personal-account-image'></img>
                        <div className='personal-account-information-div' ref={refComponent}>
                            <div className='personal-account-information-div-title'>
                                <span className='personal-account-information-div-name'>{user.lastName} {user.firstName}</span>
                                <li className='personal-account-information-div-e-ticket'>
                                    <span className='personal-account-information-item-name'>ID библиотекаря:</span>
                                    <span className='personal-account-information-item-property'>№{user.eTicket}</span>
                                </li>
                            </div>
                            <ul className='personal-account-information-div-list'>
                                <li>
                                    <span className='personal-account-information-item-name'>Электронная почта:</span>
                                    <span className='personal-account-information-item-property'>{user.email}</span>
                                </li>
                                <li>
                                    <span className='personal-account-information-item-name'>Должность:</span>
                                    <span className='personal-account-information-item-property'>{user.position}</span>
                                </li>
                            </ul>
                            <Button
                                className='personal-account-logout'
                                title={'Выйти из аккаунта'}
                                onClick={() => { store.logout() }} />
                            <button className='personal-account-information-edit'
                                onClick={() => { setIsEdit(true) }}>Редактировать</button>
                        </div>
                    </div>
                    :
                    <div className='personal-account-information'>
                        <img src=''
                            width={width}
                            height={height}
                            className='personal-account-image'></img>
                        <div className='personal-account-information-div'>
                            <div className='personal-account-information-div-title'>
                                <ul className='personal-account-information-div-list'>
                                    <li className='personal-account-information-item-edit'>
                                        <span className='account-login-item-title'>Фамилия:</span>
                                        <Input
                                            value={user.lastName}
                                            placeholder={'Введите фамилию'}
                                            pattern={"[А-Яа-яЁё\\s\\-]+"}
                                            type={'text'}
                                            onChange={(e) => {
                                                setUser(prevState => ({
                                                    ...prevState, lastName: e.target.value
                                                }))
                                            }}
                                        />
                                    </li>
                                    <li className='personal-account-information-item-edit'>
                                        <span className='account-login-item-title'>Имя:</span>
                                        <Input
                                            type={'text'}
                                            value={user.firstName}
                                            placeholder={'Введите имя'}
                                            pattern={"[А-Яа-яЁё\\s\\-]+"}
                                            onChange={(e) => {
                                                setUser(prevState => ({
                                                    ...prevState, firstName: e.target.value
                                                }))
                                            }}
                                        />
                                    </li>
                                    <li className='personal-account-information-item-edit'>
                                        <span className='account-login-item-title'>Адрес электронной почты:</span>
                                        <Input
                                            type={'email'}
                                            value={user.email}
                                            placeholder={'email@email.com'}
                                            pattern={'[^@\\s]+@[^@\\s]+\\.[^@\\s]+'}
                                            onChange={(e) => {
                                                setUser(prevState => ({
                                                    ...prevState, email: e.target.value
                                                }))
                                            }}
                                        />
                                    </li>
                                </ul>
                            </div>
                            <Button
                                className='personal-account-information-edit-save'
                                title={'Сохранить'}
                                onClick={() => { setIsEdit(false) }} />
                        </div>
                    </div>
                }
            </div>
            <PageNavigation onShowItem={items} style={{ marginTop: '60px' }} />
        </div>
    )
})

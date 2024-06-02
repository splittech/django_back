import React, { createRef, useEffect, useState, useContext } from 'react'
import PageNavigation from '../components/PageNavigation'
import Button from '../components/Button'
import Input from '../components/Input'
import BookHistory from '../components/BookHistory'
import { Link } from 'react-router-dom'
import ReviewHistory from '../components/ReviewHistory'
import PersonalRecommendations from '../components/PersonalRecommendations'
import Favorites from '../components/Favorites'
import { observer } from 'mobx-react-lite'
import { Context } from '..'
import { Navigate } from 'react-router-dom'

export default observer(function Reader() {
    const { store } = useContext(Context)

    const items = [
        {
            id: 1,
            title: 'Личная информация',
            link: '#personalInformation'
        },
        {
            id: 2,
            title: 'История книг',
            link: '#bookHistory'
        },
        {
            id: 3,
            title: 'История отзывов',
            link: '#reviewHistory'
        },
        {
            id: 4,
            title: 'Персональные рекомендации',
            link: '#personalRecommendations'
        },
        {
            id: 5,
            title: 'Избранное',
            link: '#favorites'
        }
    ]

    const books = [{
        id: 1,
        photo: '',
        title: 'Название',
        author: 'Автор',
        rating: 5.0,
        comment: 100,
        status: '2024-05-20',
    },
    {
        id: 2,
        photo: '',
        title: 'Название',
        author: 'Автор',
        rating: 5.0,
        comment: 100,
        status: '2024-05-01',
    },
    {
        id: 3,
        photo: '',
        title: 'Название',
        author: 'Автор',
        rating: 5.0,
        comment: 100,
        status: null,
    },
    {
        id: 4,
        photo: '',
        title: 'Название',
        author: 'Автор',
        rating: 5.0,
        comment: 100,
        status: null,
    },
    {
        id: 5,
        photo: '',
        title: 'Название',
        author: 'Автор',
        rating: 5.0,
        comment: 100,
        status: null,
    },
    {
        id: 6,
        photo: '',
        title: 'Название',
        author: 'Автор',
        rating: 5.0,
        comment: 100,
        status: null,
    },
    {
        id: 7,
        photo: '',
        title: 'Название',
        author: 'Автор',
        rating: 5.0,
        comment: 100,
        status: null,
    },
    {
        id: 8,
        photo: '',
        title: 'Название',
        author: 'Автор',
        rating: 5.0,
        comment: 100,
        status: null,
    },
    {
        id: 9,
        photo: '',
        title: 'Название',
        author: 'Автор',
        rating: 5.0,
        comment: 100,
        status: null,
    },
    {
        id: 10,
        photo: '',
        title: 'Название',
        author: 'Автор',
        rating: 5.0,
        comment: 100,
        status: null,
    },
    {
        id: 11,
        photo: '',
        title: 'Название',
        author: 'Автор',
        rating: 5.0,
        comment: 100,
        status: null,
    },
    {
        id: 12,
        photo: '',
        title: 'Название',
        author: 'Автор',
        rating: 5.0,
        comment: 100,
        status: null,
    },
    {
        id: 13,
        photo: '',
        title: 'Название',
        author: 'Автор',
        rating: 5.0,
        comment: 100,
        status: null,
    }
    ]

    // const review = [{
    //     id: 1,
    //     book: 3,
    //     status: 'Принято',
    //     rating: 5.0,
    //     text: 'Lorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut.\nLorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut. Lorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut.\nLorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut.',
    //     comments: 2
    // },
    // {
    //     id: 2,
    //     book: 4,
    //     status: 'Отклонено',
    //     reason: 'Lorem ipsum dolor sit amet consectetur.',
    //     rating: 5.0,
    //     text: 'Lorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut.\nLorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut. Lorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut.\nLorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut.',
    //     comments: 0
    // },
    // {
    //     id: 3,
    //     book: 5,
    //     status: 'Отклонено',
    //     reason: 'Lorem ipsum dolor sit amet consectetur.',
    //     rating: 5.0,
    //     text: 'Lorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut.\nLorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut.',
    //     comments: 1
    // },
    // ]

    const [user, setUser] = useState(store.user
        //     {
        //     id: 123456,
        //     avatar: '',
        //     last_name: 'Фамилия',
        //     first_name: 'Имя',
        //     username: 'qwerty',
        //     rating: 5.0,
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

    if (!store.isLoading && !store.isAuth) {
        return <Navigate to='/authorisation' />
    }

    return (
        <div>
            <h1 className='page-title'>Личный кабинет читателя</h1>
            <PageNavigation onShowItem={items} />
            <div>
                <h1 className='section-name'><a name='personalInformation'>Личная информация</a></h1>
                {!isEdit ?
                    <div className='personal-account-information'>
                        <img src={user.avatar}
                            width={width}
                            height={height}
                            className='personal-account-image'></img>
                        <div className='personal-account-information-div' ref={refComponent}>
                            <div className='personal-account-information-div-title'>
                                <span className='personal-account-information-div-name'>{user.last_name} {user.first_name}</span>
                                <li className='personal-account-information-div-e-ticket'>
                                    <span className='personal-account-information-item-name'>Электронный билет:</span>
                                    <span className='personal-account-information-item-property'>№{user.id}</span>
                                </li>
                            </div>
                            <ul className='personal-account-information-div-list'>
                                <li>
                                    <span className='personal-account-information-item-name'>Имя пользователя:</span>
                                    <span className='personal-account-information-item-property'>{user.username}</span>
                                </li>
                                <li>
                                    <span className='personal-account-information-item-name'>Рейтинг читателя:</span>
                                    <span className='personal-account-information-item-property'>
                                        {/* {user.rating?.toFixed(1)} */}
                                        5.0
                                    </span>
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
                                            value={user.last_name}
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
                                            value={user.first_name}
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
                                        <span className='account-login-item-title'>Имя пользователя:</span>
                                        <Input
                                            type={'email'}
                                            value={user.username}
                                            placeholder={'Введите имя пользователя'}
                                            onChange={(e) => {
                                                setUser(prevState => ({
                                                    ...prevState, username: e.target.value
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
                <h1 className='section-name'><a name='bookHistory'>История книг</a></h1>
                <BookHistory bookItems={user.books.length > 5 ? user.books.slice(0, 5) : user.books} />
                {user.books.length > 5 &&
                    <Link to={'bookhistory'} className='read-all'>Смотреть все</Link>}
                <h1 className='section-name'><a name='reviewHistory'>История отзывов</a></h1>
                {/* <ReviewHistory reviewItems={user.reviews.length > 2 ? user.reviews.slice(0, 2) : user.reviews} />
                {user.reviews.length > 2 &&
                    <Link to={'reviewhistory'} className='read-all'>Смотреть все</Link>
                } */}
                <h1 className='section-name'><a name='personalRecommendations'>Персональные рекомендации</a></h1>
                <PersonalRecommendations bookItems={books.slice(2, 12)} />
                <Link to={'personalrecommendations'} className='read-all'>Смотреть все</Link>
                <h1 className='section-name'><a name='favorites'>Избранное</a></h1>
            </div>
        </div>
    )
})
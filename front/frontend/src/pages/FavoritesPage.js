import React, { useContext, useState, useEffect } from 'react'
import { Context } from '..'
import { Navigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useParams, Link } from 'react-router-dom'
import UserService from '../service/UserService'
import BookItem from '../components/BookItem'
import Favorites from '../components/Favorites'

export default observer(function FavoritesPage() {
    const { store } = useContext(Context)

    const [favorites, setFavorites] = useState(
        // [{
        //     id: 1,
        //     photo: '',
        //     title: 'Название',
        //     author: 'Автор',
        //     rating: 5.0,
        //     comment: 100,
        // },
        // {
        //     id: 2,
        //     photo: '',
        //     title: 'Название',
        //     author: 'Автор',
        //     rating: 5.0,
        //     comment: 100,
        // },
        // {
        //     id: 3,
        //     photo: '',
        //     title: 'Название',
        //     author: 'Автор',
        //     rating: 5.0,
        //     comment: 100,
        // },
        // {
        //     id: 4,
        //     photo: '',
        //     title: 'Название',
        //     author: 'Автор',
        //     rating: 5.0,
        //     comment: 100,
        // },
        // {
        //     id: 5,
        //     photo: '',
        //     title: 'Название',
        //     author: 'Автор',
        //     rating: 5.0,
        //     comment: 100,
        // },
        // {
        //     id: 6,
        //     photo: '',
        //     title: 'Название',
        //     author: 'Автор',
        //     rating: 5.0,
        //     comment: 100,
        // },
        // {
        //     id: 7,
        //     photo: '',
        //     title: 'Название',
        //     author: 'Автор',
        //     rating: 5.0,
        //     comment: 100,
        // },
        // {
        //     id: 8,
        //     photo: '',
        //     title: 'Название',
        //     author: 'Автор',
        //     rating: 5.0,
        //     comment: 100,
        // },
        // {
        //     id: 9,
        //     photo: '',
        //     title: 'Название',
        //     author: 'Автор',
        //     rating: 5.0,
        //     comment: 100,
        // },
        // {
        //     id: 10,
        //     photo: '',
        //     title: 'Название',
        //     author: 'Автор',
        //     rating: 5.0,
        //     comment: 100,
        // },
        // {
        //     id: 11,
        //     photo: '',
        //     title: 'Название',
        //     author: 'Автор',
        //     rating: 5.0,
        //     comment: 100,
        // }
        // ]
    )

    useEffect(() => {
        if (localStorage.getItem('auth_token')) {
            store.checkAuth(store.user.username, store.user.password)
        }
    }, [])

    if (store.isLoading) {
        return <div>Загрузка...</div>
    }

    if (!store.isLoading && store.isAuth) {
        getFavorites(store.user.id)
    }

    async function getFavorites(id) {
        try {
            const response = await UserService.getFavorites(id)
            setFavorites(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            {!store.isLoading && store.isAuth ?
                <>{favorites?.length > 0 ?
                    <Favorites bookItems={favorites} />
                    : <div>Нет книг, добавленных в избранное</div>
                }</>
                : <div>Вы не авторизованы</div>
            }
        </div>
    )
})

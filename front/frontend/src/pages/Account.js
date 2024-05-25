import React, { useContext, useState, useEffect } from 'react'
import { Context } from '..'
import { Navigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

export default observer(function Account() {
    const { store } = useContext(Context)

    const isReader = store.isReader()

    useEffect(() => {
        if (localStorage.getItem('auth_token')) {
            store.checkAuth(store.user.email, store.user.password)
        }
    }, [])

    if (store.isLoading) {
        return <div>Загрузка...</div>
    }

    if (!store.isLoading && !store.isAuth) {
        return <Navigate to='/authorisation' />
    }

    return (
        <div>
            {isReader ? <Navigate to={'/account/reader'} />
                : <Navigate to={'/account/librarian'} />
            }
        </div>
    )
})

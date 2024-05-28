import React, { useState } from 'react'
import Path from '../components/Path'
import Tops from '../components/Tops'
import UserService from '../service/UserService'

export default function TopsPage() {
    const [tops, setTops] = useState(
        // getTops()
        [{
            id: 1,
            photo: '',
            title: 'Название',
            author: 'Автор',
            rating: 5.0,
            comment: 100,
        },
        {
            id: 2,
            photo: '',
            title: 'Название',
            author: 'Автор',
            rating: 5.0,
            comment: 100,
        },
        {
            id: 3,
            photo: '',
            title: 'Название',
            author: 'Автор',
            rating: 5.0,
            comment: 100,
        },
        {
            id: 4,
            photo: '',
            title: 'Название',
            author: 'Автор',
            rating: 5.0,
            comment: 100,
        },
        {
            id: 5,
            photo: '',
            title: 'Название',
            author: 'Автор',
            rating: 5.0,
            comment: 100,
        },
        {
            id: 6,
            photo: '',
            title: 'Название',
            author: 'Автор',
            rating: 5.0,
            comment: 100,
        },
        {
            id: 7,
            photo: '',
            title: 'Название',
            author: 'Автор',
            rating: 5.0,
            comment: 100,
        },
        {
            id: 8,
            photo: '',
            title: 'Название',
            author: 'Автор',
            rating: 5.0,
            comment: 100,
        },
        {
            id: 9,
            photo: '',
            title: 'Название',
            author: 'Автор',
            rating: 5.0,
            comment: 100,
        },
        {
            id: 10,
            photo: '',
            title: 'Название',
            author: 'Автор',
            rating: 5.0,
            comment: 100,
        },
        {
            id: 11,
            photo: '',
            title: 'Название',
            author: 'Автор',
            rating: 5.0,
            comment: 100,
        }
        ])

    async function getTops() {
        try {
            const response = await UserService.getTops()
            setTops(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <Path />
            <h1 className='section-name' style={{ marginTop: '0px' }}>Топы</h1>
            <Tops bookItems={tops} />
        </div>
    )
}


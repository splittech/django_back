import React, { useState } from 'react'
import PageNavigation from '../components/PageNavigation'
import Tops from '../components/Tops'
import Collections from '../components/Collections'
import { Link } from 'react-router-dom'
import UserService from '../service/UserService'
import UseGetArray from '../hooks/use-getArray'

export default function Recommendations() {
    const [items] = useState([{
        id: 1,
        title: 'Топы',
        link: '#tops'
    },
    {
        id: 2,
        title: 'Подборки',
        link: '#collections'
    }])

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
        },
        ])

    const [collections, setCollections] = UseGetArray('api/v1/books/collections')
    // useState(
    // getCollections()
    // [{
    //     id: 1,
    //     title: 'Название',
    //     author: 'Автор',
    //     books: ['', '']
    // },
    // {
    //     id: 2,
    //     title: 'Название',
    //     author: 'Автор',
    //     books: ['', '', '']
    // },
    // {
    //     id: 3,
    //     title: 'Название',
    //     author: 'Автор',
    //     books: ['', '', '', '']
    // },
    // {
    //     id: 4,
    //     title: 'Название',
    //     author: 'Автор',
    //     books: ['', '', '', '', '']
    // },
    // {
    //     id: 5,
    //     title: 'Название',
    //     author: 'Автор',
    //     books: ['', '', '', '', '']
    // },
    // {
    //     id: 6,
    //     title: 'Название',
    //     author: 'Автор',
    //     books: ['', '', '', '', '']
    // },
    // {
    //     id: 7,
    //     title: 'Название',
    //     author: 'Автор',
    //     books: ['', '', '', '', '']
    // },
    // {
    //     id: 8,
    //     title: 'Название',
    //     author: 'Автор',
    //     books: ['', '', '', '', '']
    // },
    // {
    //     id: 9,
    //     title: 'Название',
    //     author: 'Автор',
    //     books: ['', '', '', '', '']
    // },
    // {
    //     id: 10,
    //     title: 'Название',
    //     author: 'Автор',
    //     books: ['', '', '', '', '']
    // },
    // {
    //     id: 11,
    //     title: 'Название',
    //     author: 'Автор',
    //     books: ['', '', '', '', '']
    // },
    // ])

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
            <div>
                <PageNavigation onShowItem={items} />
            </div>
            <div>
                <h1 className='section-name'><a name='tops'>Топы</a></h1>
                <Tops bookItems={tops.length > 10 ? tops.slice(0, 10) : tops} />
                <Link to={'tops'} className='read-all'>Смотреть все</Link>
            </div>
            <div>
                <h1 className='section-name'><a name='collections'>Подборки</a></h1>
                <Collections collection={collections.length > 10 ? collections.slice(0, 10) : collections} />
                <Link to={'collections'} className='read-all'>Смотреть все</Link>
            </div>
        </div>
    )
}

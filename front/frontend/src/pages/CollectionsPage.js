import React, { useState } from 'react'
import Path from '../components/Path'
import Collections from '../components/Collections'
import UserService from '../service/UserService'
import { FaSearch } from "react-icons/fa"
import UseGetArray from '../hooks/use-getArray'

export default function CollectionsPage() {
    const [collections, setCollections] = UseGetArray('api/v1/books/collections')
    // useState(
    //     [{
    //         id: 1,
    //         title: 'Название',
    //         author: 'Автор',
    //         books: ['', '']
    //     },
    //     {
    //         id: 2,
    //         title: 'Название',
    //         author: 'Автор',
    //         books: ['', '', '']
    //     },
    //     {
    //         id: 3,
    //         title: 'Название',
    //         author: 'Автор',
    //         books: ['', '', '', '']
    //     },
    //     {
    //         id: 4,
    //         title: 'Название',
    //         author: 'Автор',
    //         books: ['', '', '', '', '']
    //     },
    //     {
    //         id: 5,
    //         title: 'Название',
    //         author: 'Автор',
    //         books: ['', '', '', '', '']
    //     },
    //     {
    //         id: 6,
    //         title: 'Название',
    //         author: 'Автор',
    //         books: ['', '', '', '', '']
    //     },
    //     {
    //         id: 7,
    //         title: 'Название',
    //         author: 'Автор',
    //         books: ['', '', '', '', '']
    //     },
    //     {
    //         id: 8,
    //         title: 'Название',
    //         author: 'Автор',
    //         books: ['', '', '', '', '']
    //     },
    //     {
    //         id: 9,
    //         title: 'Название',
    //         author: 'Автор',
    //         books: ['', '', '', '', '']
    //     },
    //     {
    //         id: 10,
    //         title: 'Название',
    //         author: 'Автор',
    //         books: ['', '', '', '', '']
    //     },
    //     {
    //         id: 11,
    //         title: 'Название',
    //         author: 'Автор',
    //         books: ['', '', '', '', '']
    //     }
    //     ]
    // )

    const [value, setValue] = useState('')

    const searchCollections = collections.filter(collection => {
        return (collection.title?.toLowerCase().includes(value.toLowerCase())
        )
    })

    return (
        <div>
            <Path />
            <div className='catalog-search'>
                <input type='text'
                    placeholder={'Введите название подборки'}
                    onChange={(e) => {
                        setValue(e.target.value)
                    }}
                    value={value}
                    className='catalog-search-input'></input>
                <button className='catalog-search-button'><FaSearch className='catalog-search-button-icon' /></button>
            </div>
            <h1 className='section-name' style={{ marginTop: '0px' }}>Подборки</h1>
            <Collections collection={searchCollections} />
        </div>
    )
}

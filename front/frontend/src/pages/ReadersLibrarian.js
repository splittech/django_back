import React, { useEffect, useMemo, useState } from 'react'
import Path from '../components/Path'
import { Link } from 'react-router-dom'
import { FaSearch, FaArrowUp, FaArrowDown } from "react-icons/fa"
import Button from '../components/Button'
import Filter from '../components/Filter'
import useDinamicPagination from '../hooks/use-dinamicPagination'
import { API_URL } from '../http'
import UserService from '../service/UserService'



export default function ReadersLibrarian() {
    let [url, setUrl] = useState('https://jsonplaceholder.typicode.com/posts')
    // let [url, setUrl] = useState('https://localhost:8000/api/v1/books/')
    const memoizedUrl = useMemo(() => url, [url])
    // console.log(memoizedUrl)
    // const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/posts')
    const [readers] = useDinamicPagination(memoizedUrl, 15)
    const [authors, setAuthors] = useState(
        // getAuthors()
        [
            {
                id: 1,
                name: 'Автор 1'
            },
            {
                id: 2,
                name: 'Автор 2'
            },
            {
                id: 3,
                name: 'Автор 3'
            },
            {
                id: 4,
                name: 'Автор 4'
            },
            {
                id: 5,
                name: 'Автор 5'
            },
            {
                id: 6,
                name: 'Автор 6'
            },
        ]
    )
    let [selectedAuthors, setSelectedAuthors] = useState([])
    const [genres, setGenres] = useState(
        // getGenres()
        [
            {
                id: 1,
                name: 'Жанр 1'
            },
            {
                id: 2,
                name: 'Жанр 2'
            },
            {
                id: 3,
                name: 'Жанр 3'
            },
            {
                id: 4,
                name: 'Жанр 4'
            },
            {
                id: 5,
                name: 'Жанр 5'
            },
            {
                id: 6,
                name: 'Жанр 6'
            },
        ]
    )
    let [selectedGenres, setSelectedGenres] = useState([])
    const [tags, setTags] = useState(
        // getTags()
        [
            {
                id: 1,
                name: 'Тег 1'
            },
            {
                id: 2,
                name: 'Тег 2'
            },
            {
                id: 3,
                name: 'Тег 3'
            },
            {
                id: 4,
                name: 'Тег 4'
            },
            {
                id: 5,
                name: 'Тег 5'
            },
            {
                id: 6,
                name: 'Тег 6'
            },
        ]
    )
    let [selectedTags, setSelectedTags] = useState([])
    const [status, setStatus] = useState(
        [
            {
                id: 1,
                name: 'Свободно'
            },
            {
                id: 2,
                name: 'На руках'
            },
            {
                id: 3,
                name: 'Забронировано'
            }
        ]
    )
    let [selectedStatus, setSelectedStatus] = useState([])
    const [openFilters, setOpenFilters] = useState(false)
    const [openSort, setOpenSort] = useState(false)
    // const [value, setValue] = useState('')
    let [selectedSort, setSelectedSort] = useState({ param: 'По популярности', direction: 'asc' })
    async function getAuthors() {
        try {
            const response = await UserService.getAuthors()
            setAuthors(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    async function getGenres() {
        try {
            const response = await UserService.getGenres()
            setGenres(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    async function getTags() {
        try {
            const response = await UserService.getTags()
            setTags(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    function updateSelectedAutors(array) {
        selectedAuthors = array
        searchBook()
    }

    async function updateSelectedGenres(array) {
        selectedGenres = array
        searchBook()
    }

    async function updateSelectedTags(array) {
        selectedTags = array
        searchBook()
    }

    function updateSelectedStatus(array) {
        selectedStatus = array
        searchBook()
    }

    async function selectSort(param, direction) {
        const ss = { param, direction }
        setSelectedSort(selectedSort = ss)
        const promise = new Promise((resolve) => {
            const interval = setInterval(() => {
                if (selectedSort.param === param && selectedSort.direction === direction) {
                    clearInterval(interval)
                    resolve()
                }
            }, 100)
        })
        await promise
        searchBook()
    }

    function searchBook() {
        const authorsQuery = selectedAuthors.length > 0 ? `author=${selectedAuthors.map(el => el
            // .replace(/\s/g, '_')
        ).join(',')}` : ''
        const genresQuery = selectedGenres.length > 0 ? `genres=${selectedGenres.map(el => el
            // .replace(/\s/g, '_')
        ).join(',')}` : ''
        const tagsQuery = selectedTags.length > 0 ? `tags=${selectedTags.map(el => el
            // .replace(/\s/g, '_')
        ).join(',')}` : ''
        const statusesQuery = selectedStatus.length > 0 ? `status=${selectedStatus.map(el => el
            // .replace(/\s/g, '_')
        ).join(',')}` : ''

        const queryParams = [authorsQuery, genresQuery, tagsQuery, statusesQuery].filter(Boolean).join('&')

        const sortQuery = `${selectedSort.direction === 'desc' ? '-' : ''}${selectedSort.param}`

        url = `${API_URL}api/v1/books${queryParams === '' ? '' : `?${queryParams}`}/?sort=${sortQuery}`
        console.log(url)
    }

    return (
        <div>
            <Path />
            <h1 className='page-title'>Читатели</h1>
            <div className='catalog-search'>
                <input type='text'
                    placeholder={'Введите имя читателя или номер читательского билета'}
                    onChange={(e) => {
                        // setValue(e.target.value)
                    }}
                    className='catalog-search-input'></input>
                <button className='catalog-search-button'><FaSearch className='catalog-search-button-icon' /></button>
            </div>
            <div className='catalog-buttons'>
                <Button title={'Фильтры'}
                    className={`${openFilters && 'button-active'}`}
                    onClick={() => {
                        setOpenFilters(!openFilters)
                        if (openSort) {
                            setOpenSort(!openSort)
                        }
                    }} />
                <Button title={selectedSort.param}
                    className={`${openSort && 'button-active'}`}
                    onClick={() => {
                        setOpenSort(!openSort)
                        if (openFilters) {
                            setOpenFilters(!openFilters)
                        }
                    }} />
            </div>
            <div className='catalog-filters-container'>
                <div className={`catalog-filters ${openFilters && 'catalog-filters-open'}`}>
                    <Filter
                        title={'Автор'}
                        placeholder={'Введите имя автора'}
                        items={authors}
                        updateSelectedItems={updateSelectedAutors}
                    />
                    <Filter
                        title={'Жанр'}
                        placeholder={'Введите жанр'}
                        items={genres}
                        updateSelectedItems={updateSelectedGenres}
                    />
                    <Filter
                        title={'Теги'}
                        placeholder={'Введите тег'}
                        items={tags}
                        updateSelectedItems={updateSelectedTags}
                    />
                    <Filter
                        title={'Статус'}
                        items={status}
                        updateSelectedItems={updateSelectedStatus}
                    />
                </div>
                <div className={`catalog-sort ${openSort && 'catalog-sort-open'}`}>
                    <span className='catalog-sort-title'>По популярности
                        <div>
                            <button
                                className={`catalog-sort-button
                                ${selectedSort.param === 'По популярности' & selectedSort.direction === 'asc' && 'catalog-sort-button-active'}`}
                                onClick={() => selectSort('По популярности', 'asc')}
                            ><FaArrowUp /></button>
                            <button
                                className={`catalog-sort-button
                                ${selectedSort.param === 'По популярности' & selectedSort.direction === 'desc' && 'catalog-sort-button-active'}`}
                                onClick={() => selectSort('По популярности', 'desc')}
                            ><FaArrowDown /></button>
                        </div>
                    </span>
                    <span className='catalog-sort-title'>По названиям
                        <div>
                            <button
                                className={`catalog-sort-button
                                ${selectedSort.param === 'По названиям' & selectedSort.direction === 'asc' && 'catalog-sort-button-active'}`}
                                onClick={() => selectSort('По названиям', 'asc')}
                            ><FaArrowUp /></button>
                            <button
                                className={`catalog-sort-button
                                ${selectedSort.param === 'По названиям' & selectedSort.direction === 'desc' && 'catalog-sort-button-active'}`}
                                onClick={() => selectSort('По названиям', 'desc')}
                            ><FaArrowDown /></button>
                        </div>
                    </span>
                    <span className='catalog-sort-title'>По авторам
                        <div>
                            <button
                                className={`catalog-sort-button
                                ${selectedSort.param === 'По авторам' & selectedSort.direction === 'asc' && 'catalog-sort-button-active'}`}
                                onClick={() => selectSort('По авторам', 'asc')}
                            ><FaArrowUp /></button>
                            <button
                                className={`catalog-sort-button
                                ${selectedSort.param === 'По авторам' & selectedSort.direction === 'desc' && 'catalog-sort-button-active'}`}
                                onClick={() => selectSort('По авторам', 'desc')}
                            ><FaArrowDown /></button>
                        </div>
                    </span>
                    <span className='catalog-sort-title'>По жанру
                        <div>
                            <button
                                className={`catalog-sort-button
                                ${selectedSort.param === 'По жанру' & selectedSort.direction === 'asc' && 'catalog-sort-button-active'}`}
                                onClick={() => selectSort('По жанру', 'asc')}
                            ><FaArrowUp /></button>
                            <button
                                className={`catalog-sort-button
                                ${selectedSort.param === 'По жанру' & selectedSort.direction === 'desc' && 'catalog-sort-button-active'}`}
                                onClick={() => selectSort('По жанру', 'desc')}
                            ><FaArrowDown /></button>
                        </div>
                    </span>
                    <span className='catalog-sort-title'>По статусу
                        <div>
                            <button
                                className={`catalog-sort-button
                                ${selectedSort.param === 'По статусу' & selectedSort.direction === 'asc' && 'catalog-sort-button-active'}`}
                                onClick={() => selectSort('По статусу', 'asc')}
                            ><FaArrowUp /></button>
                            <button
                                className={`catalog-sort-button
                                ${selectedSort.param === 'По статусу' & selectedSort.direction === 'desc' && 'catalog-sort-button-active'}`}
                                onClick={() => selectSort('По статусу', 'desc')}
                            ><FaArrowDown /></button>
                        </div>
                    </span>
                </div>
            </div>
            <div className='librarian-div' >
                {readers.map(el =>
                    <div key={el.id} className='librarian-item' >
                        <img src={el.avatar} height={30} width={30} className='librarian-item-reader-img' />
                            <span>{el.title} {el.last_name} {el.first_name}</span>
                            {/* <span>{el.author}</span> */}
                    </div>
                )}
            </div>
        </div>
    )
}

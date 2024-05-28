import React, { useEffect, useMemo, useState } from 'react'
import BookItem from '../components/BookItem'
import { Link } from 'react-router-dom'
import { FaSearch, FaArrowUp, FaArrowDown } from "react-icons/fa"
import Button from '../components/Button'
import Filter from '../components/Filter'
import useDinamicPagination from '../hooks/use-dinamicPagination'
import axios from 'axios'
import { API_URL } from '../http'
import UserService from '../service/UserService'

export default function Catalog() {
    // let [url, setUrl] = useState('https://jsonplaceholder.typicode.com/posts')
    let [url, setUrl] = useState('http://localhost:8000/api/v1/books/')
    const memoizedUrl = useMemo(() => url, [url])
    // console.log(memoizedUrl)
    // const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/posts')
    const [books] = useDinamicPagination(memoizedUrl, 15)
    const [authors, setAuthors] = useState(
        // getAuthors()
        []
    )
    let [selectedAuthors, setSelectedAuthors] = useState([])
    const [genres, setGenres] = useState(
        // getGenres()
        ['Жанр1', 'Жанр2', 'Жанр3', 'Жанр4', 'Жанр5', 'Жанр6']
    )
    let [selectedGenres, setSelectedGenres] = useState([])
    const [tags, setTags] = useState(
        // getTags()
        ['Тег1', 'Тег2', 'Тег3', 'Тег4', 'Тег5', 'Тег6']
    )
    let [selectedTags, setSelectedTags] = useState([])
    const [status, setStatus] = useState(['Свободно', 'На руках', 'Забронировано'])
    let [selectedStatus, setSelectedStatus] = useState([])
    const [additionalFilters, setAdditionalFilters] = useState(['Высокий рейтинг', 'Есть отзывы'])
    let [selectedAdditionalFilters, setSelectedAdditionalFilters] = useState([])
    const [fetching, setFetching] = useState(true)
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

    function updateSelectedAdditionalFilters(array) {
        selectedAdditionalFilters = array
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

    useEffect(() => {
        let arr = []
        if (fetching) {
            axios.get(url).then(res => {
                res.data.map(el => {
                    arr.push(el)
                })
                arr.map(el => {
                    if (!authors.includes(el.title)) {
                        authors.push(el.title)
                    }
                })
            }).finally(() => setFetching(false))
        }
    }, [])

    // const searchBooks = books.filter(book => {
    //     return (book.title.toLowerCase().includes(value.toLowerCase())
    //         //  || book.author.toLowerCase().includes(value.toLowerCase())
    //     )
    // })

    return (
        <div>
            <div className='catalog-search'>
                <input type='text'
                    placeholder={'Введите название книги или имя автора'}
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
                    <Filter
                        items={additionalFilters}
                        updateSelectedItems={updateSelectedAdditionalFilters}
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
            <div className='book-list'>
                {books.map(el => (
                    <Link to={`/catalog/${el.id}`} className='book-link-another-page' key={el.id}>
                        <BookItem key={el.id} bookItem={el} />
                    </Link>
                ))}
            </div>
        </div>
    )
}

import React, { useEffect, useMemo, useState } from 'react'
import BookItem from '../components/BookItem'
import { Link } from 'react-router-dom'
import { FaSearch, FaArrowUp, FaArrowDown } from "react-icons/fa"
import Button from '../components/Button'
import Filter from '../components/Filter'
import useDinamicPagination from '../hooks/use-dinamicPagination'
import axios from 'axios'
import { API_URL } from '../http'

export default function Catalog() {
    let [url, setUrl] = useState('http://127.0.0.1:8000/api/v1/books/')
    const memoizedUrl = useMemo(() => url, [url])
    // console.log(memoizedUrl)
    // const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/posts')
    const [books] = useDinamicPagination(memoizedUrl, 5)
    const [authors, setAuthors] = useState([])
    let [selectedAuthors, setSelectedAuthors] = useState([])
    const [jenres, setJenres] = useState(['Жанр1', 'Жанр2', 'Жанр3', 'Жанр4', 'Жанр5', 'Жанр6'])
    let [selectedJenres, setSelectedJenres] = useState([])
    const [status, setStatus] = useState(['Свободно', 'На руках', 'Забронировано'])
    let [selectedStatus, setSelectedStatus] = useState([])
    const [additionalFilters, setAdditionalFilters] = useState(['Высокий рейтинг', 'Есть отзывы'])
    let [selectedAdditionalFilters, setSelectedAdditionalFilters] = useState([])
    const [fetching, setFetching] = useState(true)
    const [openFilters, setOpenFilters] = useState(false)
    const [openSort, setOpenSort] = useState(false)
    // const [value, setValue] = useState('')

    function updateSelectedAutors(array) {
        selectedAuthors = array
        searchBook()
    }

    async function updateSelectedJenres(array) {
        selectedJenres = array
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

    function searchBook() {
        const authorsQuery = selectedAuthors.length > 0 ? `author=${selectedAuthors.map(el => el.replace(/\s/g, '_')).join(',')}` : ''
        const jenresQuery = selectedJenres.length > 0 ? `jenres=${selectedJenres.map(el => el.replace(/\s/g, '_')).join(',')}` : ''
        const statusesQuery = selectedStatus.length > 0 ? `status=${selectedStatus.map(el => el.replace(/\s/g, '_')).join(',')}` : ''

        const queryParams = [authorsQuery, jenresQuery, statusesQuery].filter(Boolean).join('&')

        url = `${API_URL}${queryParams === '' ? '' : `/books?${queryParams}`}`
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
                    if (!authors.includes(el.author)) {
                        authors.push(el.author)
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

    function qwerty() {
        if (openFilters && openSort) {
            return '30px'
        } else if (openFilters || openSort) {
            return '0px'
        }
    }

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
                    onClick={() => setOpenFilters(!openFilters)} />
                <Button title={'По популярности'}
                    className={`${openSort && 'button-active'}`}
                    onClick={() => setOpenSort(!openSort)} />
            </div>
            <div className='catalog-filters-container' style={{ gap: qwerty() }}>
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
                        items={jenres}
                        updateSelectedItems={updateSelectedJenres}
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
                            <button className='catalog-sort-button'><FaArrowUp /></button>
                            <button className='catalog-sort-button'><FaArrowDown /></button>
                        </div>
                    </span>
                    <span className='catalog-sort-title'>По названиям
                        <div>
                            <button className='catalog-sort-button'><FaArrowUp /></button>
                            <button className='catalog-sort-button'><FaArrowDown /></button>
                        </div>
                    </span>
                    <span className='catalog-sort-title'>По авторам
                        <div>
                            <button className='catalog-sort-button'><FaArrowUp /></button>
                            <button className='catalog-sort-button'><FaArrowDown /></button>
                        </div>
                    </span>
                    <span className='catalog-sort-title'>По жанру
                        <div>
                            <button className='catalog-sort-button'><FaArrowUp /></button>
                            <button className='catalog-sort-button'><FaArrowDown /></button>
                        </div>
                    </span>
                    <span className='catalog-sort-title'>По статусу
                        <div>
                            <button className='catalog-sort-button'><FaArrowUp /></button>
                            <button className='catalog-sort-button'><FaArrowDown /></button>
                        </div>
                    </span>
                </div>
            </div>
            <div className='book-list'>
                {books.map(el => (
                    <Link to={`/catalog/${el.title}`} className='book-link-another-page' key={el.id}>
                        <BookItem key={el.id} bookItem={el} />
                    </Link>
                ))}
            </div>
        </div>
    )
}

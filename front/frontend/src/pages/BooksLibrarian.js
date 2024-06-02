import React, { useRef, useEffect, useMemo, useState, useContext } from 'react'
import Path from '../components/Path'
import { Link, Navigate } from 'react-router-dom'
import { FaSearch, FaArrowUp, FaArrowDown } from "react-icons/fa"
import Button from '../components/Button'
import Filter from '../components/Filter'
import useDinamicPagination from '../hooks/use-dinamicPagination'
import { API_URL } from '../http'
import Input from '../components/Input'
import Modal from '../components/Modal'
import useScrollBar from '../hooks/use-scrollBar'
import { Context } from '..'
import { observer } from 'mobx-react-lite'

export default observer(function BooksLibrarian() {
    const { store } = useContext(Context)

    // const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/posts')
    const [url, setUrl] = useState('http://127.0.0.1:8000/api/v1/books/')
    const [books, setBooks] = useState([])

    const [fetchedBook] = useDinamicPagination(url, 15)

    useEffect(() => {
        console.log(fetchedBook)
        setBooks(fetchedBook)
    }, [fetchedBook])

    // const books = [{
    //     title: "Название книги",
    //     description: "Lorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut. Lorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut. Lorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut. Lorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut. Lorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut. Lorem ipsum dolor sit amet consectetur.",
    //     image: "",
    //     genres: ['Жанр 1', 'Жанр 2', 'Жанр 3', 'Жанр 4', 'Жанр 5'],
    //     tags: ['Тег 1', 'Тег 2', 'Тег 3', 'Тег 4', 'Тег 5'],
    //     author: "Имя автора",
    //     status: "Свободно",
    //     rating: 5.0,
    //     reviews: [{
    //         id: 1,
    //         rating: 5.0,
    //         text: 'Lorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut.\nLorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut. Lorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut.\nLorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut.',
    //         comments: 0,
    //         image: '',
    //         name: 'Имя автора',
    //         like: 2,
    //         dislike: 2
    //     },
    //     {
    //         id: 2,
    //         rating: 5.0,
    //         text: 'Lorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut.\nLorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut. Lorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut.\nLorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut.',
    //         comments: 0,
    //         image: '',
    //         name: 'Имя автора',
    //         like: 1,
    //         dislike: 2
    //     },
    //     {
    //         id: 3,
    //         rating: 5.0,
    //         text: 'Lorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut.\nLorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut.',
    //         comments: 1,
    //         image: '',
    //         name: 'Имя автора',
    //         like: 2,
    //         dislike: 1
    //     },],
    //     copies: 10
    // },
    // {
    //     title: "Название книги",
    //     description: "Lorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut. Lorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut. Lorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut. Lorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut. Lorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut. Lorem ipsum dolor sit amet consectetur.",
    //     image: "",
    //     genres: ['Жанр 1', 'Жанр 2', 'Жанр 3', 'Жанр 4', 'Жанр 5'],
    //     tags: ['Тег 1', 'Тег 2', 'Тег 3', 'Тег 4', 'Тег 5'],
    //     author: "Имя автора",
    //     status: "Свободно",
    //     rating: 5.0,
    //     reviews: [{
    //         id: 1,
    //         rating: 5.0,
    //         text: 'Lorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut.\nLorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut. Lorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut.\nLorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut.',
    //         comments: 0,
    //         image: '',
    //         name: 'Имя автора',
    //         like: 2,
    //         dislike: 2
    //     },
    //     {
    //         id: 2,
    //         rating: 5.0,
    //         text: 'Lorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut.\nLorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut. Lorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut.\nLorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut.',
    //         comments: 0,
    //         image: '',
    //         name: 'Имя автора',
    //         like: 1,
    //         dislike: 2
    //     },
    //     {
    //         id: 3,
    //         rating: 5.0,
    //         text: 'Lorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut.\nLorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut.',
    //         comments: 1,
    //         image: '',
    //         name: 'Имя автора',
    //         like: 2,
    //         dislike: 1
    //     },],
    //     copies: 10
    // }]

    const [authors, setAuthors] =
        UseGetArray('api/v1/books/authors'
        // useState(
        //     [
        //         {
        //             id: 1,
        //             name: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit'
        //         },
        //         {
        //             id: 2,
        //             name: 'qui est esse'
        //         },
        //         {
        //             id: 3,
        //             name: 'ea molestias quasi exercitationem repellat qui ipsa sit aut'
        //         },
        //         {
        //             id: 4,
        //             name: 'eum et est occaecati'
        //         },
        //         {
        //             id: 5,
        //             name: 'nesciunt quas odio'
        //         },
        //         {
        //             id: 6,
        //             name: 'dolorem eum magni eos aperiam quia'
        //         },
        //     ]
        )
    const [selectedAuthors, setSelectedAuthors] = useState([])
    const [genres, setGenres] =
        UseGetArray('api/v1/books/genres'
        // useState(
        //     [
        //         {
        //             id: 1,
        //             name: 'Жанр 1'
        //         },
        //         {
        //             id: 2,
        //             name: 'Жанр 2'
        //         },
        //         {
        //             id: 3,
        //             name: 'Жанр 3'
        //         },
        //         {
        //             id: 4,
        //             name: 'Жанр 4'
        //         },
        //         {
        //             id: 5,
        //             name: 'Жанр 5'
        //         },
        //         {
        //             id: 6,
        //             name: 'Жанр 6'
        //         },
        //     ]
        )
    const [selectedGenres, setSelectedGenres] = useState([])
    const [tags, setTags] =
        UseGetArray('api/v1/books/tags'
        // useState(
        //     [
        //         {
        //             id: 1,
        //             name: 'Тег 1'
        //         },
        //         {
        //             id: 2,
        //             name: 'Тег 2'
        //         },
        //         {
        //             id: 3,
        //             name: 'Тег 3'
        //         },
        //         {
        //             id: 4,
        //             name: 'Тег 4'
        //         },
        //         {
        //             id: 5,
        //             name: 'Тег 5'
        //         },
        //         {
        //             id: 6,
        //             name: 'Тег 6'
        //         },
        //     ]
        )
    const [selectedTags, setSelectedTags] = useState([])
    const [openFilters, setOpenFilters] = useState(false)
    const [openSort, setOpenSort] = useState(false)
    const [openAddBook, setOpenAddBook] = useState(false)
    const [newBook, setNewBook] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    // const [value, setValue] = useState('')
    const [selectedSort, setSelectedSort] = useState({ param: 'По популярности', direction: 'asc' })

    async function selectSort(param, direction) {
        const ss = { param, direction }
        setSelectedSort(ss)
        const promise = new Promise((resolve) => {
            const interval = setInterval(() => {
                if (selectedSort.param === param && selectedSort.direction === direction) {
                    clearInterval(interval)
                    resolve()
                }
            }, 100)
        })
        await promise
    }

    useEffect(() => {
        const authorsQuery = selectedAuthors.length > 0 ? `title=${selectedAuthors.map(el => el.replace(/\s/g, '%20')).join(',')}` : ''
        const genresQuery = selectedGenres.length > 0 ? `genres=${selectedGenres.map(el => el.replace(/\s/g, '%20')).join(',')}` : ''
        const tagsQuery = selectedTags.length > 0 ? `tags=${selectedTags.map(el => el.replace(/\s/g, '_')).join(',')}` : ''

        const queryParams = [authorsQuery, genresQuery, tagsQuery].filter(Boolean).join('&')

        // const sortQuery = `${selectedSort.direction === 'desc' ? '-' : ''}${selectedSort.param}`

        setUrl(`${API_URL}api/v1/books${queryParams === '' ? '' : `?${queryParams}`}`)
        // setUrl(`https://jsonplaceholder.typicode.com/posts/${queryParams === '' ? '' : `?${queryParams}`}`)
        // setUrl(`${API_URL}api/v1/books${queryParams === '' ? '' : `?${queryParams}`}/?sort=${sortQuery}`)
    }, [selectedAuthors, selectedGenres, selectedTags])

    const [modalActiveBook, setModalActiveBook] = useState({})

    const [readersInHand, setReadersInHand] = //UseGetArray('api/v1/books/readers')
        useState([
            { id: 1, last_name: 'kjnj' },
            { id: 2, last_name: 'kjnj' },
            { id: 3, last_name: 'kjnj' },
            { id: 4, last_name: 'kjnj' },
            { id: 5, last_name: 'kjnj' },
            { id: 6, last_name: 'kjnj' }
        ])

    const [readersReserved, setReadersReserved] = //UseGetArray('api/v1/books/readers')
        useState([
            { id: 1, last_name: 'qwertyu' },
            { id: 2, last_name: 'qwertyu' },
            { id: 3, last_name: 'qwertyu' },
            { id: 4, last_name: 'qwertyu' },
            { id: 5, last_name: 'qwertyu' },
            { id: 6, last_name: 'qwertyu' }
        ])

    const hasScroll1 = readersInHand.length > 5
    const hasScroll2 = readersReserved.length > 5
    const [value1, setValue1] = useState('')
    const [value2, setValue2] = useState('')
    const [selectedItems1, setSelectedItems1] = useState(0)
    const [selectedItems2, setSelectedItems2] = useState(0)
    const filters1 = useRef(null)
    const filters2 = useRef(null)

    useScrollBar(filters1, hasScroll1)
    useScrollBar(filters2, hasScroll2)

    const filter1 = readersInHand.filter(el => {
        return el.last_name?.toLowerCase()?.includes(value1.toLowerCase()) || el.first_name?.toLowerCase()?.includes(value1.toLowerCase())
    })

    const filter2 = readersReserved.filter(el => {
        return el.last_name?.toLowerCase()?.includes(value2.toLowerCase()) || el.first_name?.toLowerCase()?.includes(value2.toLowerCase())
    })

    async function handleCheckboxChange1(el) {
        const promise = new Promise((resolve) => {
            if (selectedItems1 !== el) {
                setSelectedItems1(el)
                const interval = setInterval(() => {
                    if (selectedItems1 === el) {
                        clearInterval(interval)
                        resolve()
                    }
                }, 100)
            }
        })
        await promise
        console.log(selectedItems1)
    }

    async function handleCheckboxChange2(el) {
        const promise = new Promise((resolve) => {
            if (selectedItems2 !== el) {
                setSelectedItems2(el)
                const interval = setInterval(() => {
                    if (selectedItems2 === el) {
                        clearInterval(interval)
                        resolve()
                    }
                }, 100)
            }
        })
        await promise
        console.log(selectedItems2)
    }

    const [modalActiveStatus, setModalActiveStatus] = useState(true)
    let status = store.status

    const [value, setValue] = useState('')

    const searchBook = books.filter(book => {
        return (book.title?.toLowerCase().includes(value.toLowerCase())
            || book.author?.toLowerCase().includes(value.toLowerCase())
        )
    })

    return (
        <div>
            <Path />
            <h1 className='page-title'>Книги</h1>
            <div className='catalog-search'>
                <input type='text'
                    placeholder={'Введите название книги или имя автора'}
                    onChange={(e) => {
                        setValue(e.target.value)
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
                        if (openAddBook) {
                            setOpenAddBook(!openAddBook)
                        }
                    }} />
                <Button title={selectedSort.param}
                    className={`${openSort && 'button-active'}`}
                    onClick={() => {
                        setOpenSort(!openSort)
                        if (openFilters) {
                            setOpenFilters(!openFilters)
                        }
                        if (openAddBook) {
                            setOpenAddBook(!openAddBook)
                        }
                    }} />
                <Button title={'Добавить'}
                    className={`${openAddBook && 'button-active'}`}
                    onClick={() => {
                        setOpenAddBook(!openAddBook)
                        if (openFilters) {
                            setOpenFilters(!openFilters)
                        }
                        if (openSort) {
                            setOpenSort(!openSort)
                        }
                    }} />
            </div>
            <div className='catalog-filters-container'>
                <div className={`catalog-filters ${openFilters && 'catalog-filters-open'}`}>
                    <Filter
                        title={'Автор'}
                        placeholder={'Введите имя автора'}
                        items={authors}
                        selectedItems={selectedAuthors}
                        setSelectedItems={setSelectedAuthors}
                    />
                    <Filter
                        title={'Жанр'}
                        placeholder={'Введите жанр'}
                        items={genres}
                        selectedItems={selectedGenres}
                        setSelectedItems={setSelectedGenres}
                    />
                    <Filter
                        title={'Теги'}
                        placeholder={'Введите тег'}
                        items={tags}
                        selectedItems={selectedTags}
                        setSelectedItems={setSelectedTags}
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
                </div>
                <div className={`librarian-add-book ${openAddBook && 'librarian-add-book-open'}`}>
                    <div className='account-login-item'>
                        <span className='account-login-item-title'>Название книги:</span>
                        <Input
                            // className={usernameMessage !== '' && 'input-invalid'}
                            onChange={e => setNewBook(e.target.value)}
                            value={newBook}
                            type='text'
                            placeholder={'Название книги'} />
                        {/* <label style={usernameMessage === '' ? { display: 'none' } : { color: '#c60021' }}>{usernameMessage}</label> */}
                    </div>
                    <div className='account-login-item'>
                        <span className='account-login-item-title'>ФИО автора:</span>
                        <Input
                            // className={emailMessage !== '' && 'input-invalid'}
                            onChange={e => setNewAuthor(e.target.value)}
                            value={newAuthor}
                            type='text'
                            placeholder={'ФИО автора'} />
                        {/* <label style={emailMessage === '' ? { display: 'none' } : { color: '#c60021' }}>{emailMessage}</label> */}
                    </div>
                    <Button title={'Добавить'}
                        className='button-enter'
                        onClick={() => {

                        }} />
                </div>
            </div>
            <div className='librarian-div'>
                {searchBook.length > 0 ?
                    <>
                        {
                            searchBook.map(el =>
                                <>
                                    <div key={el.id} className='librarian-item' onClick={() => { setModalActiveBook({ [el.id]: true }) }} >
                                        <img src={el.image} height={80} width={53} className='librarian-item-book-img' />
                                        <div className='librarian-item-book-text'>
                                            <span>{el.title}</span>
                                            <span>{el.author}</span>
                                        </div>
                                    </div>
                                    <Modal active={modalActiveBook[el.id]} setActive={setModalActiveBook}>
                                        <div key={el.id} className='modal-librarian-item' >
                                            <div className='modal-librarian-book-desc'>
                                                <div className='modal-librarian-book-head'>
                                                    <div className='modal-librarian-book-text-img'>
                                                        <img src={el.image} height={110} width={73} className='librarian-item-book-img' />
                                                        <div className='modal-librarian-book-text'>
                                                            <span className='modal-librarian-book-title'>{el.title}</span>
                                                            <span className='modal-librarian-book-author'>{el.author}</span>
                                                            <span className='modal-librarian-book-copies'>Количество экземпляров: {el.copies}</span>
                                                        </div>
                                                    </div>
                                                    <div className='modal-librarian-book-buttons'>
                                                        <Link
                                                            to={`${el.id}`}
                                                            className='modal-librarian-book-button'
                                                            style={{ textDecoration: 'none' }}>
                                                            Открыть книгу
                                                        </Link>
                                                        <button className='modal-librarian-book-button'
                                                            onClick={() => { }}>История</button>
                                                    </div>
                                                </div>
                                                <div className='modal-librarian-book-bottom'>
                                                    <div className='modal-librarian-book-bottom-item'>
                                                        <div className='catalog-filters-item'>
                                                            <span className='modal-librarian-book-bottom-title'>На руках</span>
                                                            <Input placeholder='Введите имя читателя'
                                                                onChange={(e) => { setValue1(e.target.value) }}
                                                            />
                                                            <div style={{
                                                                height: hasScroll1 ? '155px' : 'auto',
                                                                paddingRight: '10px'
                                                            }}
                                                                ref={filters1}
                                                            >
                                                                <div className='catalog-filters-item-checkbox-item'>
                                                                    {filter1.map(el => (
                                                                        <label key={el.id} className='catalog-filters-item-checkbox-label'>
                                                                            <input
                                                                                type='checkbox'
                                                                                className='catalog-filters-item-checkbox'
                                                                                onChange={() => handleCheckboxChange1(el.id)}
                                                                                checked={selectedItems1 === el.id}
                                                                            />
                                                                            <span className='catalog-filters-item-checkbox-custom'></span>
                                                                            {el.last_name} {el.first_name}
                                                                        </label>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <Button
                                                            title={'Принять'}
                                                            onClick={() => {
                                                                console.log(selectedItems1)
                                                                if (selectedItems1 !== 0) {
                                                                    // store.pinBook(book.id, selectedItems2)
                                                                    setSelectedItems1(0)
                                                                    setModalActiveBook(false)
                                                                }
                                                            }
                                                            } />
                                                    </div>
                                                    <div className='modal-librarian-book-bottom-item'>
                                                        <div className='catalog-filters-item'>
                                                            <span className='modal-librarian-book-bottom-title'>Забронировано</span>
                                                            <Input placeholder='Введите имя читателя'
                                                                onChange={(e) => { setValue2(e.target.value) }}
                                                            />
                                                            <div style={{
                                                                height: hasScroll2 ? '155px' : 'auto',
                                                                paddingRight: '10px'
                                                            }}
                                                                ref={filters2}
                                                            >
                                                                <div className='catalog-filters-item-checkbox-item'>
                                                                    {filter2.map(el => (
                                                                        <label key={el.id} className='catalog-filters-item-checkbox-label'>
                                                                            <input
                                                                                type='checkbox'
                                                                                className='catalog-filters-item-checkbox'
                                                                                onChange={() => handleCheckboxChange2(el.id)}
                                                                                checked={selectedItems2 === el.id}
                                                                            />
                                                                            <span className='catalog-filters-item-checkbox-custom'></span>
                                                                            {el.last_name} {el.first_name}
                                                                        </label>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <Button
                                                            title={'Выдать'}
                                                            onClick={() => {
                                                                console.log(selectedItems2)
                                                                if (selectedItems2 !== 0) {
                                                                    // store.pinBook(book.id, selectedItems2)
                                                                    setSelectedItems2(0)
                                                                    setModalActiveBook(false)
                                                                }
                                                            }
                                                            } />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Modal >
                                    {status !== 0 &&
                                        <>
                                            {status === 200 ?
                                                <Modal active={modalActiveStatus} setActive={setModalActiveStatus}>
                                                    <h1 className='pin-book-status green'>Успешно</h1>
                                                </Modal> :
                                                <Modal active={modalActiveStatus} setActive={setModalActiveStatus}>
                                                    <h1 className='pin-book-status red'>Ошибка</h1>
                                                </Modal>
                                            }
                                        </>
                                    }
                                </>
                            )
                        }
                    </>
                    : <p>Ничего не найдено</p>
                }
            </div>
        </div >
    )
})

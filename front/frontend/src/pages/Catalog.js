import React, { useEffect, useMemo, useState } from 'react'
import BookItem from '../components/BookItem'
import { Link } from 'react-router-dom'
import { FaSearch, FaArrowUp, FaArrowDown } from "react-icons/fa"
import Button from '../components/Button'
import Filter from '../components/Filter'
import useDinamicPagination from '../hooks/use-dinamicPagination'
import { API_URL } from '../http'
import UseGetArray from '../hooks/use-getArray'

export default function Catalog() {
    // const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/posts')
    const [url, setUrl] = useState('http://127.0.0.1:8000/api/v1/books/')
    const [books, setBooks] = useState([])

    const [fetchedBook] = useDinamicPagination(url, 15)

    useEffect(() => {
        console.log(fetchedBook)
        setBooks(fetchedBook)
    }, [fetchedBook])

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
    const [value, setValue] = useState('')
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
        const authorsQuery = selectedAuthors.length > 0 ? `author=${selectedAuthors.map(el => el.replace(/\s/g, '%20')).join(',')}` : ''
        const genresQuery = selectedGenres.length > 0 ? `genres=${selectedGenres.map(el => el.replace(/\s/g, '%20')).join(',')}` : ''
        const tagsQuery = selectedTags.length > 0 ? `tags=${selectedTags.map(el => el.replace(/\s/g, '_')).join(',')}` : ''

        const queryParams = [authorsQuery, genresQuery, tagsQuery].filter(Boolean).join('&')

        // const sortQuery = `${selectedSort.direction === 'desc' ? '-' : ''}${selectedSort.param}`

        setUrl(`${API_URL}api/v1/books${queryParams === '' ? '' : `?${queryParams}`}`)
        // setUrl(`https://jsonplaceholder.typicode.com/posts/${queryParams === '' ? '' : `?${queryParams}`}`)
        // setUrl(`${API_URL}api/v1/books${queryParams === '' ? '' : `?${queryParams}`}/?sort=${sortQuery}`)
    }, [selectedAuthors, selectedGenres, selectedTags])

    useEffect(() => {
        console.log(url)
    }, [url])

    const searchBooks = books.filter(book => {
        return (book.title?.toLowerCase().includes(value.toLowerCase())
            || book.author?.toLowerCase().includes(value.toLowerCase())
        )
    })

    return (
        <div>
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
            </div>
            {searchBooks.length > 0 ?
                <div className='book-list'>
                    {
                        searchBooks.map(el => (
                            <Link to={`/catalog/${el.id}`} className='book-link-another-page' key={el.title}>
                                <BookItem bookItem={el} />
                            </Link>
                        ))
                    }
                </div>
                : <p>Ничего не найдено</p>}
        </div>
    )
}

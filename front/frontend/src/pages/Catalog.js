import React, { useEffect, useState } from 'react'
import BookItem from '../components/BookItem'
import { Link } from 'react-router-dom'
import { FaSearch, FaArrowUp, FaArrowDown } from "react-icons/fa"
import Button from '../components/Button'
import Filter from '../components/Filter'
import useDinamicPagination from '../hooks/use-dinamicPagination'
import axios from 'axios'

export default function Catalog() {
    const url = 'http://127.0.0.1:8000/api/v1/books/'
    const [books, setBooks] = useDinamicPagination(url, 15)
    const [authors, setAuthors] = useState([])
    const [jenres, setJenres] = useState([])
    const [fetching, setFetching] = useState(true)
    const [openFilters, setOpenFilters] = useState(false)
    const [openSort, setOpenSort] = useState(false)
    const [value, setValue] = useState('')

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

    const searchBooks = books.filter(book => {
        return (book.title.toLowerCase().includes(value.toLowerCase())
            //  || book.author.toLowerCase().includes(value.toLowerCase())
        )
    })

    function qwerty() {
        if (openFilters && openSort) {
            console.log('?')
            return '30px'
        } else if (openFilters || openSort) {
            console.log('!')
            return '0px'
        }
    }

    return (
        <div>
            <div className='catalog-search'>
                <input type='text'
                    placeholder={'Введите название книги или имя автора'}
                    onChange={(e) => setValue(e.target.value)}
                    className='catalog-search-input'></input>
                <button className='catalog-search-button'><FaSearch className='catalog-search-button-icon' /></button>
            </div>
            <div className='catalog-buttons'>
                <Button title={'Фильтры'}
                    className={`catalog-button ${openFilters && 'catalog-button-active'}`}
                    onClick={() => setOpenFilters(!openFilters)} />
                <Button title={'По популярности'}
                    className={`catalog-button ${openSort && 'catalog-button-active'}`}
                    onClick={() => setOpenSort(!openSort)} />
            </div>
            <div className='catalog-filters-container' style={{ gap: qwerty() }}>
                <div className={`catalog-filters ${openFilters && 'catalog-filters-open'}`}>
                    <Filter title={'Автор'} placeholder={'Введите имя автора'} items={authors} />
                    <Filter title={'Жанр'} placeholder={'Введите жанр'} items={['Жанр1', 'Жанр2', 'Жанр3', 'Жанр4', 'Жанр5', 'Жанр6']} />
                    <Filter title={'Статус'} items={['Свободно', 'На руках', 'Забронировано']} />
                    <Filter items={['Высокий рейтинг', 'Есть отзывы']} />
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
                {searchBooks.map(el => (
                    <Link to={`/catalog/${el.title}`} className='book-link-another-page' key={el.id}>
                        <BookItem key={el.id} bookItem={el} />
                    </Link>
                ))}
            </div>
        </div>
    )
}

import React, { useEffect, useState, useContext, useRef } from 'react'
import Path from '../components/Path'
import { Link } from 'react-router-dom'
import { FaSearch, FaArrowUp, FaArrowDown } from "react-icons/fa"
import Button from '../components/Button'
import Filter from '../components/Filter'
import useDinamicPagination from '../hooks/use-dinamicPagination'
import { API_URL } from '../http'
import UserService from '../service/UserService'
import Modal from '../components/Modal'
import useScrollBar from '../hooks/use-scrollBar'
import { Context } from '..'
import { observer } from 'mobx-react-lite'
import Input from '../components/Input'
import UseGetArray from '../hooks/use-getArray'

export default observer(function ReadersLibrarian() {
    const { store } = useContext(Context)

    const [readers, setReaders] = UseGetArray('api/v1/books/readers')
        // useState([
        //     { id: 1, last_name: 'kjnj', first_name: 'qwer', username: 'user' },
        //     { id: 2, last_name: 'kjnj', first_name: 'qwer', username: 'user' },
        //     { id: 3, last_name: 'kjnj', first_name: 'qwer', username: 'user' },
        //     { id: 4, last_name: 'kjnj', first_name: 'qwer', username: 'user' },
        //     { id: 5, last_name: 'kjnj', first_name: 'qwer', username: 'user' },
        //     { id: 6, last_name: 'kjnj', first_name: 'qwer', username: 'user' }
        // ])

    const [value, setValue] = useState('')

    const searchReader = readers.filter(reader => {
        return (reader.last_name?.toLowerCase().includes(value.toLowerCase())
            || reader.first_name?.toLowerCase().includes(value.toLowerCase())
            || reader.id === value
        )
    })

    const [modalActiveReader, setModalActiveReader] = useState({})

    const [booksInHand, setBooksInHand] = //UseGetArray('api/v1/books/readers')
        useState([
            { id: 1, title: 'kjnj', author: 'qwer' },
            { id: 2, title: 'kjnj', author: 'qwer' },
            { id: 3, title: 'kjnj', author: 'qwer' },
            { id: 4, title: 'kjnj', author: 'qwer' },
            { id: 5, title: 'kjnj', author: 'qwer' },
            // { id: 6, title: 'kjnj', author: 'qwer' },
            // { id: 7, title: 'kjnj', author: 'qwer' },
        ])

    const [booksReserved, setBooksReserved] = //UseGetArray('api/v1/books/readers')
        useState([
            { id: 1, title: 'qwertyu', author: 'qwert' },
            { id: 2, title: 'qwertyu', author: 'qwert' },
            { id: 3, title: 'qwertyu', author: 'qwert' },
            { id: 4, title: 'qwertyu', author: 'qwert' },
            { id: 5, title: 'qwertyu', author: 'qwert' },
            // { id: 6, title: 'qwertyu', author: 'qwert' },
            // { id: 7, title: 'qwertyu', author: 'qwert' },
        ])

    const hasScroll1 = booksInHand.length > 5
    const hasScroll2 = booksReserved.length > 5
    const [value1, setValue1] = useState('')
    const [value2, setValue2] = useState('')
    const [selectedItems1, setSelectedItems1] = useState(0)
    const [selectedItems2, setSelectedItems2] = useState(0)
    const filters1 = useRef(null)
    const filters2 = useRef(null)

    useScrollBar(filters1, hasScroll1)
    useScrollBar(filters2, hasScroll2)

    const filter1 = booksInHand.filter(el => {
        return el.title?.toLowerCase()?.includes(value1.toLowerCase())
            || el.author?.toLowerCase()?.includes(value1.toLowerCase())
    })

    const filter2 = booksReserved.filter(el => {
        return el.title?.toLowerCase()?.includes(value2.toLowerCase())
            || el.author?.toLowerCase()?.includes(value2.toLowerCase())
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

    return (
        <div>
            <Path />
            <h1 className='page-title'>Читатели</h1>
            <div className='catalog-search'>
                <input type='text'
                    placeholder={'Введите имя читателя или номер читательского билета'}
                    onChange={(e) => {
                        setValue(e.target.value)
                    }}
                    className='catalog-search-input'></input>
                <button className='catalog-search-button'><FaSearch className='catalog-search-button-icon' /></button>
            </div>
            <div className='librarian-div' >
                {searchReader.length > 0 ?
                    <>
                        {searchReader.map(el =>
                            <>
                                <div key={el.id} className='librarian-item' onClick={() => { setModalActiveReader({ [el.id]: true }) }} >
                                    <img src={el.avatar} height={30} width={30} className='librarian-item-reader-img' />
                                    <span>{el.last_name} {el.first_name}</span>
                                </div>
                                <Modal active={modalActiveReader[el.id]} setActive={setModalActiveReader}>
                                    <div key={el.id} className='modal-librarian-item' >
                                        <div className='modal-librarian-book-desc'>
                                            <div className='modal-librarian-book-head'>
                                                <div className='modal-librarian-book-text-img'>
                                                    <img src={el.avatar} height={70} width={70} className='librarian-item-reader-img' />
                                                    <div className='modal-librarian-book-text'>
                                                        <span className='modal-librarian-book-title'>{el.last_name} {el.first_name}</span>
                                                        <span className='modal-librarian-book-copies'>Имя пользователя: {el.username}</span>
                                                    </div>
                                                </div>
                                                <div className='modal-librarian-book-buttons'>
                                                    <li className='personal-account-information-div-e-ticket'>
                                                        <span className='personal-account-information-item-name'>Электронный билет:</span>
                                                        <span className='personal-account-information-item-property'>№{el.id}</span>
                                                    </li>
                                                    <Link
                                                        to={`${el.id}`}
                                                        className='modal-librarian-book-button'
                                                        style={{ textDecoration: 'none' }}>
                                                        Открыть профиль
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className='modal-librarian-book-bottom'>
                                                <div className='modal-librarian-book-bottom-item'>
                                                    <div className='catalog-filters-item'>
                                                        <span className='modal-librarian-book-bottom-title'>На руках</span>
                                                        <Input placeholder='Введите название книги или имя автора'
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
                                                                        {el.title}
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
                                                                setModalActiveReader(false)
                                                            }
                                                        }
                                                        } />
                                                    {/* <Button
                                                        title={'Продлить'}
                                                        onClick={() => {
                                                            console.log(selectedItems1)
                                                            if (selectedItems1 !== 0) {
                                                                // store.pinBook(book.id, selectedItems2)
                                                                setSelectedItems1(0)
                                                                setModalActiveReader(false)
                                                            }
                                                        }
                                                        } /> */}
                                                </div>
                                                <div className='modal-librarian-book-bottom-item'>
                                                    <div className='catalog-filters-item'>
                                                        <span className='modal-librarian-book-bottom-title'>Забронировано</span>
                                                        <Input placeholder='Введите название книги или имя автора'
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
                                                                        {el.title}
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
                                                                setModalActiveReader(false)
                                                            }
                                                        }
                                                        } />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Modal >
                            </>
                        )}
                    </>
                    : <p>Ничего не найдено</p>
                }
            </div >
        </div >
    )
})

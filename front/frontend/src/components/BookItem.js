import React, { useEffect, useState } from 'react'
import UserService from '../service/UserService'

export default function BookItem(props) {
    const [book, setBook] = useState(null)
    
    useEffect(() => {
        async function getBook() {
            try {
                const response = await UserService.getBook(props.book)
                setBook(response.data)
            } catch (e) {
                console.log(e)
            }
        }
        if (props.book && !book) {
            getBook()
        }
    }, [])

    return (
        <div className='book-item'>
            {props.bookItem ?
                <>
                    {props.bookItem.status != null &&
                        <>
                            {new Date(props.bookItem.status) < new Date() ?
                                <span className='book-item-status book-item-status-red'>Просрочено</span> :
                                <span className='book-item-status book-item-status-green'>До {(new Date(props.bookItem.status).toLocaleDateString('ru-RU'))}</span>}
                        </>
                    }
                    <img src={props.bookItem.image} width={180} height={270} className='book-item-image'></img>
                    <div className='book-item-text'>
                        <span className='book-item-title'>{props.bookItem.title}</span>
                        <span className='book-item-author'>{props.bookItem.author}</span>
                        <div className='book-item-numbers'>
                            <span className='book-item-rating'>{props.bookItem.rating}</span>
                            <span className='book-item-comment'>
                                {/* {props.bookItem.comment} */}
                                Отзывы</span>
                        </div>
                    </div>
                </>
                : <>
                    {book?.status != null &&
                        <>
                            {new Date(book?.status) < new Date() ?
                                <span className='book-item-status book-item-status-red'>Просрочено</span> :
                                <span className='book-item-status book-item-status-green'>До {(new Date(book.status).toLocaleDateString('ru-RU'))}</span>}
                        </>
                    }
                    <img src={book?.image} width={180} height={270} className='book-item-image'></img>
                    <div className='book-item-text'>
                        <span className='book-item-title'>{book?.title}</span>
                        <span className='book-item-author'>{book?.author}</span>
                        <div className='book-item-numbers'>
                            <span className='book-item-rating'>{book?.rating}</span>
                            <span className='book-item-comment'>
                                {/* {book?.comment} */}
                                Отзывы</span>
                        </div>
                    </div>
                </>
            }
        </div >
    )
}

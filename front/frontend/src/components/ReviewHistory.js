import React, { Component } from 'react'
import BookItem from './BookItem'
import ReviewItem from './ReviewItem'
import UseGetArray from '../hooks/use-getArray'

export default function ReviewHistory(props) {
    const [book, setBook] = UseGetArray(`api/v1/books/${props.reviewItems.book}`)

    return (
        <div className='review-list'>{props.reviewItems.map(el => (
            <div className='review-item-container'>
                <div>
                    <BookItem key={book.id} bookItem={book} />
                </div>
                <ReviewItem key={el.id} reviewItem={el} isAccount={true} isReader={true} />
            </div>
        ))}
        </div>
    )
}

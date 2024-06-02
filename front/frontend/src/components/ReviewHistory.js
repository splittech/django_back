import React, { Component } from 'react'
import BookItem from './BookItem'
import ReviewItem from './ReviewItem'

export default function ReviewHistory(props) {
    return (
        <div className='review-list'>{props.reviewItems.map(el => (
            <div className='review-item-container'>
                <div>
                    <BookItem key={el.book} book={el.book} />
                    {console.log(el.book)}
                </div>
                <ReviewItem key={el.id} reviewItem={el} isAccount={true} isReader={true} />
            </div>
        ))}
        </div>
    )
}

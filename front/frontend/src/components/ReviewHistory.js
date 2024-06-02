import React, { Component } from 'react'
import BookItem from './BookItem'
import ReviewItem from './ReviewItem'

export default class ReviewHistory extends Component {
    render() {
        return (
            <div className='review-list'>{this.props.reviewItems.map(el => (
                <div className='review-item-container'>
                    <div>
                        <BookItem key={100} bookItem={el.book} />
                    </div>
                    <ReviewItem key={el.id} reviewItem={el} isAccount={true} isReader={true} />
                </div>
            ))}
            </div>
        )
    }
}

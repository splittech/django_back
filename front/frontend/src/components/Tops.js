import React, { Component } from 'react'
import BookItem from './BookItem'
import { Link } from 'react-router-dom'

export default class Tops extends Component {
    render() {
        return (
            <div className='book-list'>
                {this.props.bookItems.map(el => (
                    <Link to={`/recommendations/tops/${el.id}`} className='book-link-another-page' key={el.id}>
                        <BookItem key={el.id} bookItem={el} />
                    </Link>
                ))}
            </div>
        )
    }
}

import React, { Component } from 'react'

export default class BookItem extends Component {
    render() {
        return (
            <div className='book-item'>
                {this.props.bookItem.status != null &&
                    <>
                        {new Date(this.props.bookItem.status) < new Date() ?
                            <span className='book-item-status book-item-status-red'>Просрочено</span> :
                            <span className='book-item-status book-item-status-green'>До {(new Date(this.props.bookItem.status).toLocaleDateString('ru-RU'))}</span>}
                    </>
                }
                <img src='' width={180} height={270} className='book-item-image'></img>
                <div className='book-item-text'>
                    <span className='book-item-title'>{this.props.bookItem.title}</span>
                    <span className='book-item-author'>Автор</span>
                    <div className='book-item-numbers'>
                        <span className='book-item-rating'>Оценка</span>
                        <span className='book-item-comment'>Отзывы</span>
                    </div>
                </div>
            </div>
        )
    }
}

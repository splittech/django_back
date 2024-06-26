import React from 'react'
import { useParams, Link } from 'react-router-dom'
import UserService from '../service/UserService'
import Path from '../components/Path'
import Button from '../components/Button'
import ReviewItem from '../components/ReviewItem'

export default function Reviews() {
    const { id } = useParams()
    // const book = UserService.getBook(id)
    const book = {
        title: "Название книги",
        description: "Lorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut. Lorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut. Lorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut. Lorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut. Lorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut. Lorem ipsum dolor sit amet consectetur.",
        image: "",
        genres: ['Жанр 1', 'Жанр 2', 'Жанр 3', 'Жанр 4', 'Жанр 5'],
        tags: ['Тег 1', 'Тег 2', 'Тег 3', 'Тег 4', 'Тег 5'],
        author: "Имя автора",
        status: "Свободно",
        rating: 5.0,
        reviews: [{
            id: 1,
            rating: 5.0,
            text: 'Lorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut.\nLorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut. Lorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut.\nLorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut.',
            comments: 0,
            image: '',
            name: 'Имя автора',
            like: 2,
            dislike: 2
        },
        {
            id: 2,
            rating: 5.0,
            text: 'Lorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut.\nLorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut. Lorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut.\nLorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut.',
            comments: 0,
            image: '',
            name: 'Имя автора',
            like: 1,
            dislike: 2
        },
        {
            id: 3,
            rating: 5.0,
            text: 'Lorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut.\nLorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut.',
            comments: 1,
            image: '',
            name: 'Имя автора',
            like: 2,
            dislike: 1
        },]
    }

    return (
        <div>
            <Path />
            <Link to={-1} className='book-description'>
                <img src={book.image} width={90} height={135} className='book-description-img' />
                <div>
                    <div className='book-description-head'>
                        <div className='book-description-params'>
                            <h1 className='book-title'>{book.title}</h1>
                            <span className='book-description-author'>{book.author}</span>
                            <div className='book-description-numbers-div'>
                                <span className='book-description-numbers'>★ {book.rating.toFixed(1)}</span>
                                <span className='book-description-numbers'>Отзывы: {book.reviews.length}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
            <div className='book-description-head'>
                <h1 className='book-section-name' style={{ 'marginLeft': '30px', 'marginBottom': '30px' }} >Отзывы</h1>
                <Button title={'Написать отзыв'} />
            </div>
            <div className='book-reviews'>
                {book.reviews.map(el =>
                    <ReviewItem key={el.id} reviewItem={el} isAccount={false} />
                )}
            </div>
        </div>
    )
}

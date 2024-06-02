import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import UserService from '../service/UserService'
import Path from '../components/Path'
import Button from '../components/Button'
import ReviewItem from '../components/ReviewItem'
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import Modal from '../components/Modal'

export default function Reviews() {
    const [user, setUser] = useState(store.user)
    //     {
    //         id: 123456,
    //         avatar: '',
    //         last_name: 'Фамилия',
    //         first_name: 'Имя',
    //         username: 'qwerty',
    //         rating: 5.0,
    //         books: [{
    //             id: 1,
    //             photo: '',
    //             title: 'Название',
    //             author: 'Автор',
    //             rating: 5.0,
    //             comment: 100,
    //             status: '2024-05-20',
    //         },
    //         {
    //             id: 2,
    //             photo: '',
    //             title: 'Название',
    //             author: 'Автор',
    //             rating: 5.0,
    //             comment: 100,
    //             status: '2024-05-01',
    //         },
    //         {
    //             id: 3,
    //             photo: '',
    //             title: 'Название',
    //             author: 'Автор',
    //             rating: 5.0,
    //             comment: 100,
    //             status: null,
    //         },
    //         {
    //             id: 4,
    //             photo: '',
    //             title: 'Название',
    //             author: 'Автор',
    //             rating: 5.0,
    //             comment: 100,
    //             status: null,
    //         },
    //         {
    //             id: 5,
    //             photo: '',
    //             title: 'Название',
    //             author: 'Автор',
    //             rating: 5.0,
    //             comment: 100,
    //             status: null,
    //         },
    //         {
    //             id: 6,
    //             photo: '',
    //             title: 'Название',
    //             author: 'Автор',
    //             rating: 5.0,
    //             comment: 100,
    //             status: null,
    //         },
    //         {
    //             id: 7,
    //             photo: '',
    //             title: 'Название',
    //             author: 'Автор',
    //             rating: 5.0,
    //             comment: 100,
    //             status: null,
    //         },
    //         {
    //             id: 8,
    //             photo: '',
    //             title: 'Название',
    //             author: 'Автор',
    //             rating: 5.0,
    //             comment: 100,
    //             status: null,
    //         },
    //         {
    //             id: 9,
    //             photo: '',
    //             title: 'Название',
    //             author: 'Автор',
    //             rating: 5.0,
    //             comment: 100,
    //             status: null,
    //         },
    //         {
    //             id: 10,
    //             photo: '',
    //             title: 'Название',
    //             author: 'Автор',
    //             rating: 5.0,
    //             comment: 100,
    //             status: null,
    //         },
    //         {
    //             id: 11,
    //             photo: '',
    //             title: 'Название',
    //             author: 'Автор',
    //             rating: 5.0,
    //             comment: 100,
    //             status: null,
    //         },
    //         {
    //             id: 12,
    //             photo: '',
    //             title: 'Название',
    //             author: 'Автор',
    //             rating: 5.0,
    //             comment: 100,
    //             status: null,
    //         },
    //         {
    //             id: 13,
    //             photo: '',
    //             title: 'Название',
    //             author: 'Автор',
    //             rating: 5.0,
    //             comment: 100,
    //             status: null,
    //         }
    //         ],
    //         reviews: [{
    //             id: 1,
    //             book: 3,
    //             // status: 'Принято',
    //             rating: 5.0,
    //             text: 'Lorem ipsum dolor sit amet consectetur. ',
    //             comments: 2
    //         },
    //         {
    //             id: 2,
    //             book: 4,
    //             status: 'Отклонено',
    //             reason: 'Lorem ipsum dolor sit amet consectetur.',
    //             rating: 5.0,
    //             text: 'Lorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut.\nLorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut. Lorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut.\nLorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut.',
    //             comments: 0
    //         },
    //         {
    //             id: 3,
    //             book: 5,
    //             status: 'Отклонено',
    //             reason: 'Lorem ipsum dolor sit amet consectetur.',
    //             rating: 5.0,
    //             text: 'Lorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut.\nLorem ipsum dolor sit amet consectetur. Tincidunt ultricies curabitur morbi arcu augue cursus dolor risus. Volutpat eu mauris lorem ac commodo scelerisque enim sociis. Ultricies sed lacus neque morbi et nisl. Nascetur erat facilisis nulla nisi augue suspendisse ut quisque ut.',
    //             comments: 1
    //         },
    //         ]
    //     }
    // )

    return (
        <div>
            <Path />
            <div className='book-reviews'>
                {user.reviews.map(el =>
                    <ReviewItem key={el.id} reviewItem={el} isAccount={true} isReader={true} />
                )}
            </div>
        </div>
    )
}

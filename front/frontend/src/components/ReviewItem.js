import React, { createRef, useEffect, useState } from 'react'
import Button from './Button'
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import Modal from './Modal';

export default function ReviewItem(props) {
    const [height, setHeight] = useState('')
    const [classname, setClassname] = useState('')
    const [isCkicked, setIsCkicked] = useState(false)
    const [comments] = useState(props.reviewItem.comments)
    const [difference] = useState(props.reviewItem.like - props.reviewItem.dislike)
    const refComponent = createRef()

    useEffect(() => {
        if (!isCkicked) {
            if (refComponent.current != null) {
                setHeight(refComponent.current.getBoundingClientRect().height)
            }
            if (height >= 194) {
                if (comments === 0) {
                    setClassname('review-item-text-container-hide-max')
                } else {
                    setClassname('review-item-text-container-hide-min')
                }
            }
        }
    }, [refComponent])


    function getCommentsLabel(num) {
        if (num % 10 === 1 && num % 100 !== 11) {
            return num + ' комментарий'
        } else if ([2, 3, 4].includes(num % 10) && ![12, 13, 14].includes(num % 100)) {
            return num + ' комментария'
        } else {
            return num + ' комментариев'
        }
    }

    function color() {
        if (difference > 0) {
            return 'green'
        } else if (difference < 0) {
            return 'red'
        } else {
            return 'blue'
        }
    }

    const [modalActiveReject, setModalActiveReject] = useState(false)
    const [modalActiveReview, setModalActiveReview] = useState(false)
    const [modalActiveStatus, setModalActiveStatus] = useState(true)
    const [text, setText] = useState('')

    return (
        <div className='review-item'>
            {props.isAccount ?
                <>
                    {props.isReader ?
                        <>
                            {props.status ? <>
                                {props.status === 'Принято' ?
                                    <div className='review-item-status-div'>
                                        <span className='review-item-status review-item-status-green'>{props.reviewItem.status}</span>
                                    </div>
                                    :
                                    <div className='review-item-status-div'>
                                        <span className='review-item-status review-item-status-red'>{props.reviewItem.status}</span>
                                        <span className='review-item-reason'>Причина: {props.reviewItem.reason}</span>
                                    </div>
                                }
                            </> : <div className='review-item-status-div'>
                                <span className='review-item-status review-item-status-green'>Проверяется</span>
                            </div>
                            }
                            <span className='review-item-rating'>Оценка: ★ {props.reviewItem.rating}</span>
                            <div className={`review-item-text-container ${classname}`}>
                                <p className='review-item-text' ref={refComponent}>{props.reviewItem.text}</p>
                                <div className='review-item-text-bottom'></div>
                            </div>
                            {height >= 194 &&
                                <Button
                                    title={`${isCkicked ? 'Скрыть' : 'Показать полностью'}`}
                                    className='review-read-completely'
                                    onClick={() => {
                                        setClassname('review-item-text-container-not-hide')
                                        setIsCkicked(!isCkicked)
                                    }} />}
                            {comments > 0 &&
                                <span className='review-item-comments'>{getCommentsLabel(props.reviewItem.comments)}</span>
                            }
                        </> :
                        <>
                            <div className='review-item-head'>
                                <img src={props.reviewItem.image} width={50} height={50} className='review-item-img' />
                                <div className='review-item-head-text'>
                                    <h1 className='review-item-name'>{props.reviewItem.name}</h1>
                                    <span className='review-item-rating'>Оценка: ★ {props.reviewItem.rating}</span>
                                </div>
                            </div>
                            <div className={`review-item-text-container ${classname}`}>
                                <p className='review-item-text' ref={refComponent}>{props.reviewItem.text}</p>
                                <div className='review-item-text-bottom'></div>
                            </div>
                            {height >= 194 &&
                                <Button
                                    title={`${isCkicked ? 'Скрыть' : 'Показать полностью'}`}
                                    className='review-read-completely'
                                    onClick={() => {
                                        setClassname('review-item-text-container-not-hide')
                                        setIsCkicked(!isCkicked)
                                    }} />}
                            <div className='review-item-buttons'>
                                <Button
                                    title={'Принять'}
                                    onClick={() => {
                                        // запрос

                                    }} />
                                <Button
                                    title={'Отклонить'}
                                    onClick={() => {
                                        setModalActiveReject(true)
                                    }} />
                                <Modal active={modalActiveReject} setActive={setModalActiveReject}>
                                    <h1 className='pin-book-name'>Отклонить отзыв</h1>
                                    <div className='modal-review'>
                                        <textarea
                                            placeholder='Введите причину'
                                            className='textarea textarea-review'
                                            value={text}
                                            onChange={e => setText(e.target.value)} />
                                    </div>
                                    <Button
                                        title={'Отправить'}
                                        onClick={() => {
                                            if (text !== '') {
                                                // 
                                                setModalActiveReject(false)
                                                setText('')
                                            }
                                        }
                                        } />
                                </Modal>
                            </div>
                        </>
                    }
                </>
                :
                <>
                    <div className='review-item-head'>
                        <img src={props.reviewItem.image} width={50} height={50} className='review-item-img' />
                        <div className='review-item-head-text'>
                            <h1 className='review-item-name'>{props.reviewItem.name}</h1>
                            <span className='review-item-rating'>Оценка: ★ {props.reviewItem.rating}</span>
                        </div>
                    </div>
                    <div className={`review-item-text-container ${classname}`}>
                        <p className='review-item-text' ref={refComponent}>{props.reviewItem.text}</p>
                        <div className='review-item-text-bottom'></div>
                    </div>
                    {height >= 194 &&
                        <Button
                            title={`${isCkicked ? 'Скрыть' : 'Показать полностью'}`}
                            className='review-read-completely'
                            onClick={() => {
                                setClassname('review-item-text-container-not-hide')
                                setIsCkicked(!isCkicked)
                            }} />}
                    <div className='review-item-bottom'>
                        {comments > 0 ?
                            <span className='review-item-comments'>{getCommentsLabel(props.reviewItem.comments)}</span>
                            : <div></div>
                        }
                        <div className='review-item-likes'>
                            <span className='review-item-answer'>Ответить</span>
                            <FaThumbsUp />
                            <span className={`review-item-likes-${color()}`}>{difference > 0 ? `+${difference}` : difference}</span>
                            <FaThumbsDown />
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

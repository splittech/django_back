import React, { createRef, useEffect, useState } from 'react'
import Button from './Button'

export default function ReviewItem(props) {
    const [height, setHeight] = useState('')
    const [classname, setClassname] = useState('')
    const [isCkicked, setIsCkicked] = useState(false)
    const [comments] = useState(props.reviewItem.comments)
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

    return (
        <div className='review-item'>
            {props.reviewItem.status === 'Принято' ?
                <div className='review-item-status-div'>
                    <span className='review-item-status review-item-status-green'>{props.reviewItem.status}</span>
                </div>
                :
                <div className='review-item-status-div'>
                    <span className='review-item-status review-item-status-red'>{props.reviewItem.status}</span>
                    <span className='review-item-reason'>Причина: {props.reviewItem.reason}</span>
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
        </div>
    )
}

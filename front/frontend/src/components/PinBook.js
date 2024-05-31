import React, { useRef, useState } from 'react'
import Button from '../components/Button'
import useScrollBar from '../hooks/use-scrollBar'
import Input from './Input'
import UserService from '../service/UserService'
import UseGetArray from '../hooks/use-getArray'

export default function PinBook(props) {
    const [readers, setReaders] = UseGetArray('api/v1/books/readers')
    // [{ id: 1, name: 'kjnj' }, { id: 2, name: 'kjnj' }, { id: 3, name: 'kjnj' }, { id: 4, name: 'kjnj' }, { id: 5, name: 'kjnj' }, { id: 6, name: 'kjnj' }]

    const [value, setValue] = useState('')
    let selectedItems = 0
    const hasScroll = readers.length > 5
    const filters = useRef(null)

    useScrollBar(filters, hasScroll)

    const filter = readers.filter(el => {
        // return el.name?.toLowerCase()?.includes(value.toLowerCase())
        return el.last_name?.toLowerCase()?.includes(value.toLowerCase()) || el.first_name?.toLowerCase()?.includes(value.toLowerCase())
    })

    async function handleCheckboxChange(el) {
        // console.log(el)
        // const isChecked = selectedItems.includes(el)
        // const promise = new Promise((resolve) => {
        //     if (isChecked) {
        //         selectedItems = selectedItems.filter(item => item !== el)
        //         const interval = setInterval(() => {
        //             if (!selectedItems.includes(el)) {
        //                 clearInterval(interval)
        //                 resolve()
        //             }
        //         }, 100)
        //     } else {
        //         selectedItems.push(el)
        //         const interval = setInterval(() => {
        //             if (selectedItems.includes(el)) {
        //                 clearInterval(interval)
        //                 resolve()
        //             }
        //         }, 100)
        //     }
        // })
        // await promise
        selectedItems = el
        console.log(selectedItems)
    }

    return (
        <div className='pin-book-background'>
            <div className={`${props.className}`}>
                <h1 className='pin-book-name'>Закрепление книги</h1>
                <div className='catalog-filters-item pin-book-readers'
                >
                    <span className='catalog-filters-item-title'>Список читателей</span>
                    <Input placeholder='Введите имя читателя'
                        onChange={(e) => { setValue(e.target.value) }} />
                    <div style={{
                        height: hasScroll ? '155px' : 'auto',
                        paddingRight: '10px',
                    }}
                        ref={filters} >
                        <div className='catalog-filters-item-checkbox-item'>
                            {filter.map(el => (
                                <label key={el.id} className='catalog-filters-item-checkbox-label'
                                // onClick={() => UserService.pinBook(props.bookId, el.id)}
                                >
                                    <input
                                        type='checkbox'
                                        className='catalog-filters-item-checkbox'
                                        onChange={() => handleCheckboxChange(el.id)}
                                    />
                                    <span className='catalog-filters-item-checkbox-custom'></span>
                                    {el.last_name} {el.first_name}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
                <Button
                    title={'Закрепить'}
                    onClick={() =>
                        UserService.pinBook(props.bookId, selectedItems)
                    } />
            </div>
        </div >
    )
}

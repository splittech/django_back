import React, { useRef, useState } from 'react'
import useScrollBar from '../hooks/use-scrollBar'
import Input from './Input'

export default function Filter(props) {
    const [value, setValue] = useState('')
    let selectedItems = []

    const hasScroll = props.items.length > 5
    const filters = useRef(null)

    useScrollBar(filters, hasScroll)

    const filter = props.items.filter(el => {
        return el.name?.toLowerCase()?.includes(value.toLowerCase())
    })

    function qwerty() {
        if (props.placeholder != null) {
            return '1/3'
        } else {
            return ''
        }
    }

    async function handleCheckboxChange(el) {
        const isChecked = selectedItems.includes(el)
        const promise = new Promise((resolve) => {
            if (isChecked) {
                selectedItems = selectedItems.filter(item => item !== el)
                const interval = setInterval(() => {
                    if (!selectedItems.includes(el)) {
                        clearInterval(interval)
                        resolve()
                    }
                }, 100)
            } else {
                selectedItems.push(el)
                const interval = setInterval(() => {
                    if (selectedItems.includes(el)) {
                        clearInterval(interval)
                        resolve()
                    }
                }, 100)
            }
        })
        await promise
        props.updateSelectedItems(selectedItems)
    }

    return (
        <div className='catalog-filters-item' style={{ gridRow: qwerty() }} >
            {props.title != null && <span className='catalog-filters-item-title'>{props.title}</span>}
            {props.placeholder != null
                && <Input placeholder={props.placeholder}
                    onChange={(e) => { setValue(e.target.value) }} />
            }
            <div style={{
                height: hasScroll ? '155px' : 'auto',
                paddingRight: '10px',
            }}
                ref={filters} >
                <div className='catalog-filters-item-checkbox-item'>
                    {filter.map(el => (
                        <label key={el.id} className='catalog-filters-item-checkbox-label'>
                            <input
                                type='checkbox'
                                className='catalog-filters-item-checkbox'
                                onChange={() => handleCheckboxChange(el.name)}
                            />
                            <span className='catalog-filters-item-checkbox-custom'></span>
                            {el.name}
                        </label>
                    ))}
                </div>
            </div>
        </div>
    )
}

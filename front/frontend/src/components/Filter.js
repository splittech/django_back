import React, { useRef, useState } from 'react'
import useScrollBar from '../hooks/use-scrollBar'
import Input from './Input'

export default function Filter(props) {
    const [value, setValue] = useState('')

    const hasScroll = props.items.length > 5
    const filters = useRef(null)

    useScrollBar(filters, hasScroll)

    const filter = props.items.filter(el => {
        return el.toLowerCase().includes(value.toLowerCase())
    })

    function qwerty() {
        if (props.placeholder != null) {
            return '1/3'
        } else {
            return ''
        }
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
                        <label key={el} className='catalog-filters-item-checkbox-label'><input type='checkbox' className='catalog-filters-item-checkbox' />
                            <span className='catalog-filters-item-checkbox-custom'></span>
                            {el}
                        </label>
                    ))}
                </div>
            </div>
        </div>
    )
}

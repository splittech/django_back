import React from 'react'
import { useLocation, useNavigate } from 'react-router'
import { routes } from '../routes'

export default function Path(props) {
    const navigate = useNavigate()
    const location = useLocation()

    const previous = routes.find((route) => {
        const pathSegments = location.pathname.split('/')
        pathSegments.pop()
        const previousPath = pathSegments.join('/')
        return route.path === previousPath
    })?.name || 'Назад'
    const current = routes.find((route) => route.path === location.pathname)?.name || props.current

    return (
        <div className='path'>
            {previous === 'Назад' ?
                <a onClick={() => navigate(-1)} className='path-link'>← {previous}</a> :
                <>
                    <a onClick={() => navigate(-1)} className='path-link'>{previous}</a>
                    <span className='path-link'> {' > '} </span>
                    <a onClick={() => navigate(0)} className='path-link'>{current}</a>
                </>
            }
        </div>
    )
}

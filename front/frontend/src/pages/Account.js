import React, { Component } from 'react'
import { Navigate } from 'react-router-dom'

let isAuthorized = true
let isReader = true

export default class Account extends Component {
    render() {
        return (
            <div>
                {!isAuthorized ?
                    <Navigate to={'/authorization'} />
                    : (isReader ? <Navigate to={'/account/reader'} />
                        : <Navigate to={'/account/librarian'} />)
                }
            </div>
        )
    }
}

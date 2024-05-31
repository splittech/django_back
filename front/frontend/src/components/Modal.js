import React from 'react'

export default function Modal({ active, setActive, children }) {
    return (
        <div className={`modal-background ${active && 'active'}`} onClick={() => setActive(false)}>
            <div className={`modal-content ${active && 'active'}`} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div >
    )
}

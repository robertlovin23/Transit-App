import React from 'react'
import ReactDOM from 'react-dom'

const Modal = ({schedules}) => {
    console.log(schedules)
    return(
        ReactDOM.createPortal(
            <div className="ui modal">
                 <div className="header">hi</div>
            </div>, document.querySelector('#modal')
        )
    )
}


export default Modal
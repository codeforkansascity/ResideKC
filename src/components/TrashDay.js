import React from 'react';

export default function TrashDay(props) {

    return (
        <div className="trashDay">
            <h2>Your trash pickup day is {props.trashDay}</h2>
        </div>
    )
}
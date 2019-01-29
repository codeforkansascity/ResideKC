import React from 'react';

const TrashDay = props =>  {

    return (
        <div className="trashDay">
            <h2>Your trash pickup day is {props.trashDay}</h2>
        </div>
    )
}

export default TrashDay;
import React from 'react';

const TrashDay = props =>  {

    return (
        <div className="trashDay">
            <h1>Your trash infomation</h1>
            <p>You trash will be picked up on <strong>{props.trashDay}</strong> by Provider: <strong>{props.trashProvider}</strong></p>
            <p>Any bulky items will be picked up on the <strong>{props.bulkyItems}</strong> of the month.</p>
        </div>
    )
}

export default TrashDay;
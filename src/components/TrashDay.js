import React from 'react';

const TrashDay = ({trashDay, trashProvider, bulkyItems}) =>  {
    return (
        <div className="trashDay">
            <h1>Your trash infomation</h1>
            <p>You trash will be picked up on <strong>{trashDay}</strong> by Provider: <strong>{trashProvider}</strong></p>
            <p>Any bulky items will be picked up on the <strong>{bulkyItems}</strong> of the month.</p>
        </div>
    )
}

export default TrashDay;
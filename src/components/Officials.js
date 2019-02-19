import React from 'react';


const Officials = ({ offices, officials, }) => {
    const defaultImage = 'https://via.placeholder.com/150';
    const renderedList = offices.map((office,i) => {
        return (
            <div> 
                <img width="150" src={officials[i].photoUrl ? officials[i].photoUrl : defaultImage } />
                <p><strong>{office.name}</strong></p>
                <p>{officials[i].name}</p>
            </div>
        )
    })
    return <div className="ui relaxed divided list">{renderedList}</div>
}



export default Officials;
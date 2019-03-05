import React from 'react';


const Officials = ({ offices, officials ,list }) => {
    const defaultImage = 'https://via.placeholder.com/150';

    
    const stateRenderedList = offices.map((office,i) => {
        if (i >= 3) {
            return (
                <div> 
                    <img width="150" src={officials[i].photoUrl ? officials[i].photoUrl : defaultImage } />
                    <p><strong>{office.name}</strong></p>
                    <p>{officials[i].name}</p>
                </div>
            )
        }     
    })

    const federalRenderedList = offices.map((office,i) => {
        if (i < 3) {
            return (
                <div> 
                    <img width="150" src={officials[i].photoUrl ? officials[i].photoUrl : defaultImage } />
                    <p><strong>{office.name}</strong></p>
                    <p>{officials[i].name}</p>
                </div>
            )
        }
    })


    if (list="stateList") {
        return <div className="ui relaxed divided list">{stateRenderedList}</div>
    } else {
        return <div className="ui relaxed divided list">{federalRenderedList}</div>
    }
}



export default Officials;
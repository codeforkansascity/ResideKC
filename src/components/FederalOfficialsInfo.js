import React from 'react';

const FederalOfficialsInfo =  props => {
    return (
        <div className="otherInfo">
            <h2> The Senators are {props.electedFeds[0].name} and {props.electedFeds[1].name}</h2>
            <div>
                <img src={props.electedFeds[0].photoURL} alt={props.electedFeds[0].photoURL} />
                <img src={props.electedFeds[1].photoURL} alt={props.electedFeds[1].photoUR} />
            </div>
            <h2>The House Representative is {props.electedFeds[2].name}</h2>
            <img src={props.electedFeds[2].photoURL} alt={props.electedFeds[2].photoURL} />
        </div>
    );
}

export default FederalOfficialsInfo;
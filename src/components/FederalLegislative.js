import React from 'react';

export default function ElectedOffialsInfo(props) {
    return (
        <div className="otherInfo">
            <h2> The Senators are {props.electedFeds[0].name} and {props.electedFeds[1].name}</h2>
            <div>
                <img src={props.electedFeds[0].photoURL} />
                <img src={props.electedFeds[1].photoURL} />
            </div>
            <h2>The House Representative is {props.electedFeds[2].name}</h2>
            <img src={props.electedFeds[2].photoURL} />
        </div>
    );
}
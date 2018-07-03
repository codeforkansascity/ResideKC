import React from 'react';


export default function ElectedOffialsInfo(props){
    return(
        <div className="otherInfo">
            <h2> The Senators are {props.electedInfo[2][1]} and {props.electedInfo[3][1]}</h2>
                <div>
                <img src ={props.electedInfo[2][2]} />
                <img src ={props.electedInfo[3][2]} />
                </div>
            <h2>The House Representative is {props.electedInfo[4][1]}</h2>
            <img src={props.electedInfo[4][2]} />
        </div>
    );
}
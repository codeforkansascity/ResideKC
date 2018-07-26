import React from 'react';




export default function OtherInfo(props) {

   let stateOfficials = props.electedState;

  return (
    <div className="otherInfo">
      {stateOfficials.map((item, i) => <div>
        <h2 key={i}>The {item.title} is {item.name}</h2>
        <img src={item.photoURL} />
        </div>)}
    </div>
  );
}
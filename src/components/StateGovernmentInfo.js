import React from 'react';

const StateGovernmentInfo = props => {
  const stateOfficials = props.electedState;

  return (
    <div className="otherInfo">
      {stateOfficials.map((item, i) => <div>
        <h2 key={i}>The {item.title} is {item.name}</h2>
        <img src={item.photoURL} alt={item.photoURL} />
      </div>)}
    </div>
  )
}

export default StateGovernmentInfo;
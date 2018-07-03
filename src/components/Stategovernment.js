import React from 'react';

export default function OtherInfo(props) {
  return (
      <div className="otherInfo">
          <h2>The Governer is {props.electedInfo[5][1]}</h2>
          <img src={props.electedInfo[5][2]} />
          <h2>The Lt. Governer is {props.electedInfo[6][1]}</h2>
          <img src={props.electedInfo[6][2]} />
          <h2>Your State senate representative is {props.electedInfo[7][1]}</h2>
          <img src={props.electedInfo[7][2]} />
          <h2>Your State house representative is {props.electedInfo[8][1]}</h2>
          <img src={props.electedInfo[8][2]} />
          <h2>Your State Auditor is {props.electedInfo[9][1]}</h2>
          <img src={props.electedInfo[9][2]} />
          <h2>Your State treasurer is {props.electedInfo[10][1]}</h2>
          <img src={props.electedInfo[10][2]} />
      </div>
  )
}
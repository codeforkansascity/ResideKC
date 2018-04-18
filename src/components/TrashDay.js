import React from 'react';
import './TrashDay.css';

export default function TrashDay(props) {
  return (
      <div className="trashDay">
          <h2>Your trash pickup day is {props.trashDay}</h2>
      </div>
  )
}
import React from 'react';

export default function Die(props) {
  return (
    <div
      className="die"
      style={{ backgroundColor: props.isHeld ? '#59E391' : '#ffffff' }}
      onClick={props.holdDice}
    >
      <span className="die-dot">
        {(props.value === 4 || props.value === 5 || props.value === 6) && '•'}
      </span>
      <span></span>
      <span className="die-dot">
        {(props.value === 2 ||
          props.value === 3 ||
          props.value === 4 ||
          props.value === 5 ||
          props.value === 6) &&
          '•'}
      </span>
      <span className="die-dot">{props.value === 6 && '•'}</span>
      <span className="die-dot">
        {(props.value === 1 || props.value === 3 || props.value === 5) && '•'}
      </span>
      <span className="die-dot">{props.value === 6 && '•'}</span>
      <span className="die-dot">
        {(props.value === 2 ||
          props.value === 3 ||
          props.value === 4 ||
          props.value === 5 ||
          props.value === 6) &&
          '•'}
      </span>
      <span></span>
      <span className="die-dot">
        {(props.value === 4 || props.value === 5 || props.value === 6) && '•'}
      </span>
    </div>
  );
}

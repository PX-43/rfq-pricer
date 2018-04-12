import React from 'react';

export default props => {
  const numberOfRfqs = props.numberOfNewRfqs ? <span>{props.numberOfNewRfqs} new</span> : null;

  return (
    <div className='element-header'>
      <div className='element-header__text'>
        <span>Sessions</span>
        {numberOfRfqs}
      </div>
     <hr className='element-header__line'/>
    </div>
  );
}

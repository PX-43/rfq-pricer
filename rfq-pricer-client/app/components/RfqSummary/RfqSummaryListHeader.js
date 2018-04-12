import React from 'react';

export default props => {
  return (
    <div className='element-header'>
      <div className='element-header__text'>
        <span>Sessions</span>
        <span>0 pending, 0 done</span>
      </div>
     <hr className='element-header__line'/>
    </div>
  );
}

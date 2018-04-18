import React from 'react';
import RfqActionButtonsContainer from '../RfqActionButtons/RfqActionButtonsContainer';

export default props => {
  return (
    <div className='element-header'>
      <div className='element-header__text'>
        <span>Selected Session</span>
        <RfqActionButtonsContainer />
      </div>
      <hr className='element-header__line'/>
    </div>
  );
}

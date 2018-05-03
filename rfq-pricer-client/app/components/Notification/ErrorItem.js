import React from 'react';


export default props => {

  return (
    <div className='error-item'>
      <div className='error-item__icon' >icon</div>
      <div className='error-item__text' >{props.error}</div>
      <div className='error-item__count' >{props.count}</div>
    </div>
  )
}

import React from 'react';

export default props => {

  const className = props.isOpen ? 'menu-button--open' : 'menu-button';

  return (
    <div className={className} onClick={props.toggle}>
      <div className='bar1' />
      <div className='bar2'/>
      <div className='bar3'/>
    </div>
  );
}

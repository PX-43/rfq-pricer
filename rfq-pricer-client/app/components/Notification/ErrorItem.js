import React from 'react';
//fa-exclamation-circle
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faExclamationCircle from '@fortawesome/fontawesome-free-solid/faExclamationCircle';

class ErrorItem extends React.PureComponent {

  constructor(props){
    super(props);
  }

//todo: start two timers on render
   //  1. should slowly reduce opacity
   //  2. should send message to parent to remove errors



  render() {
    console.log('ERROR ITEM LOADING...');

    if(!this.props.count)
      return null;

    return (
      <div className='error-item'>
        <div className='error-item__icon' >
          <FontAwesomeIcon icon={faExclamationCircle} />
        </div>
        <div className='error-item__text' >{this.props.error}</div>
        <div className='error-item__count' >{this.props.count}</div>
      </div>
    )
  }

}

export default ErrorItem;

import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faExclamationCircle from '@fortawesome/fontawesome-free-solid/faExclamationCircle';

class ErrorItem extends React.PureComponent {

  constructor(props){
    super(props);
  }

//todo: start two timers on render
   //  1. should slowly reduce opacity
   //  2. should send message to parent to remove errors

  deleteError = () => {
    this.props.deleteError(this.props.error);
  };

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
        <div className='error-item__count-container'>
          {
            this.props.count > 1 && <div className='error-item__count' >{this.props.count}</div>
          }
        </div>
        <button className='error-item__close-button' onClick={this.deleteError}>x</button>
      </div>
    )
  }

}

export default ErrorItem;

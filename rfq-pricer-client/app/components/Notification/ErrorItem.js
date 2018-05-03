import React from 'react';
//fa-exclamation-circle
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faExclamationCircle from '@fortawesome/fontawesome-free-solid/faExclamationCircle';

class ErrorItem extends React.PureComponent {

  constructor(props){
    super(props);
  }



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

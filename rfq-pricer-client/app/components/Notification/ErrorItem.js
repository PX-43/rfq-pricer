import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faExclamationCircle from '@fortawesome/fontawesome-free-solid/faExclamationCircle';

const TIME_OUT = 4000;

class ErrorItem extends React.Component {

  constructor(props){
    super(props);

    this.timeoutId = null;
  }

  componentDidUpdate() {
    if(this.timeoutId){
      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => this.deleteError(), TIME_OUT);
    }
  }

  componentDidMount() {
    this.timeoutId = setTimeout(() => this.deleteError(), TIME_OUT);
  }

  componentWillUnmount(){
    if(this.timeoutId){
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  deleteError = () => {
    this.props.deleteError(this.props.error);
  };

  render() {

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

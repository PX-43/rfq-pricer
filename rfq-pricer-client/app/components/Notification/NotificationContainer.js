import React, {PureComponent} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { errorSelector } from '../../modules/selectors';
import { viewConstants as vc } from "../../constants";

import './NotifiationContainer.less';

class NotificationContainer extends PureComponent {

  constructor(props){
    super(props);
    this.notificationDivRef = React.createRef();
  }


  dismiss = () =>{
    console.log('dismissed');
  };

  render(){

    if(this.notificationDivRef &&
      this.notificationDivRef.current &&
      this.notificationDivRef.current.classList.contains('notification--show')){
      this.notificationDivRef.current.classList.remove('notification--show');
    }

    const className = this.props.error !== vc.NO_ERROR ? 'notification notification--show' : 'notification';

    return (
      <div className={className} ref={this.notificationDivRef}>
        <p className='notification__error-message'>
          {this.props.error}
        </p>
        <button className='notification__close-button' onClick={this.dismiss}>dismiss</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: errorSelector.getError(state)
  };
};

const mapDispatchToProps = dispatch =>  bindActionCreators({

}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NotificationContainer);

import React, {PureComponent} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { errorListSelector } from '../../modules/selectors';
import ErrorItem from './ErrorItem';
import {rfqPricerFlowActions} from '../../modules/actions';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';

import './NotifiationContainer.less';

class NotificationContainer extends PureComponent {

  constructor(props){
    super(props);
  }

  render(){

    let className = 'notification';
    let errorItems = null;

    if(this.props.errorList.length > 0){

      errorItems = this.props.errorList.map((e, i) =>
        <CSSTransition
          key={i}
          classNames={className}
          timeout={{ enter: 300, exit: 300 }}>

            <ErrorItem
              error={e.error}
              count={e.count}
              deleteError={this.props.deleteError}
            />

        </CSSTransition>)
    }

    return (
        <div className={className}>
          <TransitionGroup>
            { errorItems }
          </TransitionGroup>
        </div>

      /*<div className={className} >
      {errorItems}*/


    );
  }
}

const mapStateToProps = state => {
  return {
    errorList: errorListSelector.getErrors(state)
  };
};

const mapDispatchToProps = dispatch =>  bindActionCreators({
  deleteError: rfqPricerFlowActions.onDeleteServerError
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NotificationContainer);

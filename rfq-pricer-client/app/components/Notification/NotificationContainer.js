import React, {PureComponent} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { errorListSelector } from '../../modules/selectors';
import ErrorItem from './ErrorItem';
import {rfqPricerFlowActions} from '../../modules/actions';

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
          <ErrorItem
            key={i}
            error={e.error}
            count={e.count}
            deleteError={this.props.deleteError}
          />)
    }

    return (
      <div className={className} >
          {errorItems}
      </div>
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

import React, {PureComponent} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { rfqPricerFlowActions } from './../../modules/actions';
import {rfqSelector, rfqSummaryListSelector} from '../../modules/selectors';
import RefreshButton from './RefreshButton';
import RejectButton from './RejectButton';
import AcceptButton from './AcceptButton';

import './RfqActionButtonsContainer.less';


class RfqActionButtonsContainer extends PureComponent {

  constructor(props){
    super(props);
  }

  rejectRfq = () => {
    //const newSelectedRfqId = this.props.rfqIdList.length ? '' : this.props.rfqIdList[0];
    this.props.reject(this.props.selectedRfqId);
  };


  render(){
    return (
      <div className='buttonContainer'>
        <RejectButton reject={this.rejectRfq}/>
        <RefreshButton refresh={this.props.refresh} />
        <AcceptButton accept={this.props.accept}/>
      </div>
    );
  }


}

const mapStateToProps = state => {
  return {
    selectedRfqId : rfqSelector.getSelectedRfqId(state),
    rfqIdList : rfqSummaryListSelector.getRfqIdList(state),
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  accept:rfqPricerFlowActions.onAccept,
  reject:rfqPricerFlowActions.onReject,
  refresh:rfqPricerFlowActions.onRefresh,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RfqActionButtonsContainer);

import React, {PureComponent} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { rfqPricerFlowActions } from './../../modules/actions';
import { rfqSelector } from '../../modules/selectors';
import { viewConstants as vc } from '../../constants';
import RefreshButton from './RefreshButton';
import RejectButton from './RejectButton';
import AcceptButton from './AcceptButton';
import RemoveButton from './RemoveButton';

import './RfqActionButtonsContainer.less';


class RfqActionButtonsContainer extends PureComponent {

  constructor(props){
    super(props);
  }

  rejectRfq = () => this.props.reject(this.props.selectedRfqId);
  removeRfq = () => this.props.remove(this.props.selectedRfqId);
  acceptRfq = () => this.props.accept(this.props.selectedRfqId);
  refreshRfq = () => this.props.refresh(this.props.selectedRfqId);

  render(){

    const noRfqSelected = this.props.selectedRfqId === vc.NO_SELECTED_RFQ;
    const buttonContainerStyle = noRfqSelected ? 'buttonContainer-disabled' : 'buttonContainer';

    return (
      <div className={buttonContainerStyle}>
        <RemoveButton remove={this.removeRfq} visible={this.props.selectedRfqHasError}/>
        <RejectButton reject={this.rejectRfq}/>
        <RefreshButton refresh={this.refreshRfq} />
        <AcceptButton accept={this.acceptRfq}/>
      </div>
    );
  }


}

const mapStateToProps = state => {
  return {
    //we don't need to send the selected rfq id, as it is
    //available in the sate, but it makes the intention cleaner
    selectedRfqId : rfqSelector.getSelectedRfqId(state),
    selectedRfqHasError : rfqSelector.getSelectedRfqHasError(state)
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  accept:rfqPricerFlowActions.onAccept,
  reject:rfqPricerFlowActions.onReject,
  remove:rfqPricerFlowActions.onRemove,
  refresh:rfqPricerFlowActions.onRefresh,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RfqActionButtonsContainer);

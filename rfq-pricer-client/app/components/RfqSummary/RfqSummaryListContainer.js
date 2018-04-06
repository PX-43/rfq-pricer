import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './RfqSummaryListContainer.less';
import { rfqSummaryListSelector, rfqSelector } from '../../modules/selectors';
import { rfqPricerFlowActions } from './../../modules/actions'
import RfqSummary from './RfqSummary';

class RfqSummaryListContainer extends PureComponent {

  constructor(props){
    super(props);
  }


  render(){

    console.log('rendering RfqSummaryListContainer');

    const items = this.props.rfqInfoList.map(rfqInfo =>
      <RfqSummary
        key={rfqInfo.rfq.id}
        rfq={rfqInfo.rfq}
        ccyPairs={rfqInfo.ccyPairs}
        selectedRfqChanged={this.props.selectedRfqChanged}
        selectedRfqId={this.props.selectedRfqId}/>
    );

    return(
      <div className='rfq-summary-list-container'>
        <ul>
          {items}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    rfqInfoList : rfqSummaryListSelector.getRfqSummaryList(state),
    selectedRfqId : rfqSelector.getSelectedRfqId(state),
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  selectedRfqChanged: rfqPricerFlowActions.onSelectedRfqChanged
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RfqSummaryListContainer);

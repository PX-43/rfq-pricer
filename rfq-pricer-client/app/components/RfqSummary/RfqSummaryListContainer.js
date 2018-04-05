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

    const items = this.props.rfqs.map(rfq =>
      <RfqSummary
        key={rfq.id}
        rfq={rfq}
        selectedRfqChanged={this.props.selectedRfqChanged}
        selectedRfq={this.props.selectedRfq}/>
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
    rfqs : rfqSummaryListSelector.getRfqSummaryList(state),
    selectedRfq : rfqSelector.getSelectedRfqId(state),
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  selectedRfqChanged: rfqPricerFlowActions.onSelectedRfqChanged
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RfqSummaryListContainer);

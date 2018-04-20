import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { rfqSummaryListSelector, rfqSelector } from '../../modules/selectors';
import { rfqPricerFlowActions } from './../../modules/actions'
import RfqSummary from './RfqSummary';
import RfqSummaryHeader from './RfqSummaryListHeader';
import RfqSummaryListPlaceholder from './RfqSummaryListPlaceholder';

import './RfqSummaryListContainer.less';

class RfqSummaryListContainer extends React.Component {

  constructor(props){
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    return (this.props.rfqInfoList.length !== nextProps.rfqInfoList.length ||
            this.props.selectedRfqId !== nextProps.selectedRfqId);
  }

  //todo: wrong solution
 /* selectFirstRfq = () =>{
    if(this.props.selectedRfqId === ''){

    }
  };*/

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

    const placeholder = this.props.rfqInfoList.length > 0 ?
                        null :
                        <RfqSummaryListPlaceholder />;

    return(
      <div className='rfq-summary-list-container'>
        <RfqSummaryHeader numberOfNewRfqs={this.props.numberOfNewRfqs} />
        {placeholder}
        <div className='rfq-summary-list'>
          <ul>
            {items}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    rfqInfoList : rfqSummaryListSelector.getRfqSummaryList(state),
    numberOfNewRfqs : rfqSummaryListSelector.getNumberOfNewRfqs(state),
    selectedRfqId : rfqSelector.getSelectedRfqId(state),
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  selectedRfqChanged: rfqPricerFlowActions.onSelectedRfqChanged
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RfqSummaryListContainer);

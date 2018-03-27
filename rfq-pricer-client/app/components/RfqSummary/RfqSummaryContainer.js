import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './RfqSummaryContainer.less';
import { rfqSummaryListSelector } from '../../modules/selectors';
import RfqSummary from './RfqSummary';

class RfqSummaryContainer extends PureComponent {

  constructor(props){
    super(props);
  }


  render(){

    const items = this.props.rfqs.map(rfq =>
      <RfqSummary
        key={rfq.id}
        rfq={rfq}
        currencies={this.props.currencies[rfq.id]} />
    );

    return(
      <div className='rfqSummaryContainer'>
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
    currencies : rfqSummaryListSelector.getCurrencies(state)
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RfqSummaryContainer);

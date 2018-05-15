import React, {PureComponent}  from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import RfqGrid from './RfqGrid';
import RfqGridHeader from './RfqGridHeader';
import {rfqSelector} from '../../modules/selectors';

import './RfqGridContainer.less';

class RfqGridContainer extends PureComponent {

  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className='rfq-details-container'>
        <RfqGridHeader />
        <div className='rfq-grid-container'>
          <RfqGrid
            onFwdPointsChanged={this.props.onFwdPointsChanged}
            onSpotChanged={this.props.onSpotChanged}
            onRevertingSpot={this.props.onRevertingSpot}
            onRevertingFwdPoints={this.props.onRevertingFwdPoints}
            rfqData={this.props.rfqData}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    rfqData : rfqSelector.getSelectedRfqData(state),
  }
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    onFwdPointsChanged: action => action,
    onSpotChanged: action => action,
    onRevertingSpot: action => action,
    onRevertingFwdPoints: action => action,
  }, dispatch);



export default connect(mapStateToProps, mapDispatchToProps)(RfqGridContainer);

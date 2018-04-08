import React, {PureComponent}  from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import RfqGrid from './RfqGrid';
import {rfqSelector} from '../../modules/selectors';

import './RfqGridContainer.less';
import {rfqPricerFlowActions} from "../../modules/actions";

class RfqGridContainer extends PureComponent {

  constructor(props){
    super(props);
  }

  render(){
    console.log('rendering RfqGridContainer');
    return(
      <div className='rfq-grid-container'>
        <RfqGrid
          onFwdPointsChanged={this.props.onFwdPointsChanged}
          onSpotChanged={this.props.onSpotChanged}
          rfqData={this.props.rfqData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    rfqData : rfqSelector.getRfqData(state),
  }
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    onFwdPointsChanged: action => action,
    onSpotChanged: action => action,
  }, dispatch);


/*const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};*/


export default connect(mapStateToProps, mapDispatchToProps)(RfqGridContainer);

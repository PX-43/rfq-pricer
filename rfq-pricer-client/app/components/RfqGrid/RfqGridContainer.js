import React, {PureComponent}  from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import RfqGrid from './RfqGrid';
import {rfqSelector} from '../../modules/selectors';

import './RfqGridContainer.less';

class RfqGridContainer extends PureComponent {

  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className='rfq-grid-container'>
        <RfqGrid rfqData={this.props.rfqData} />
      </div>
    );
  }


}

const mapStateToProps = state => {
  return {
    rfqData : rfqSelector.getRfqData(state),
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(RfqGridContainer);

import React, { PureComponent } from 'react';
import { func } from 'prop-types';
import noop from 'lodash/noop';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RfqRequest from './RfqRequest';
import { rfqPricerFlowActions } from './../../modules/actions'
import ScenarioTesting from './ScenarioTesting';
import './HeaderPaneContainer.less';

class HeaderPaneContainer extends PureComponent {

  constructor(props) {
    super(props);
  }

  render(){
    console.log('rendering HeaderPaneContainer');
    return (
      <div className='controlContainer'>
        <RfqRequest requestNewRfq={this.props.requestNewRfq} />
        <ScenarioTesting />
      </div>
    );
  }

}

HeaderPaneContainer.propTypes = {
  requestNewRfq: func
};
HeaderPaneContainer.defaultProps = {
  requestNewRfq: noop
};

// whatever is returned shows up in props of this container
const mapDispatchToProps = dispatch => bindActionCreators({
  requestNewRfq: rfqPricerFlowActions.requestNewRfq
}, dispatch);

// whatever is returned shows up in props of this container
const mapStateToProps = state => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderPaneContainer);

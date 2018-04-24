import React, { PureComponent } from 'react';
import { func } from 'prop-types';
import noop from 'lodash/noop';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RfqRequest from './RfqRequest';
import { rfqPricerFlowActions } from './../../modules/actions'
import { scenarioSelector } from '../../modules/selectors';
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
        <ScenarioTesting
          serverResponseScenario={this.props.serverResponseScenario}
          delayBy={this.props.delayBy}
          serverResponseScenarioChanged={this.props.serverResponseScenarioChanged}
          scenarioDelayedByParamChanged={this.props.scenarioDelayedByParamChanged}
        />
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
  requestNewRfq: rfqPricerFlowActions.requestNewRfq,
  scenarioDelayedByParamChanged: rfqPricerFlowActions.scenarioDelayedByParamChanged,
  serverResponseScenarioChanged: rfqPricerFlowActions.serverResponseScenarioChanged,

}, dispatch);

// whatever is returned shows up in props of this container
const mapStateToProps = state => ({
  delayBy: scenarioSelector.getDelayBy(state),
  serverResponseScenario: scenarioSelector.getServerResponseScenario(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderPaneContainer);

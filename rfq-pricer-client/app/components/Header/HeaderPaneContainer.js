import React, { PureComponent } from 'react';
import { func } from 'prop-types';
import noop from 'lodash/noop';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { rfqPricerFlowActions } from './../../modules/actions'
import { scenarioSelector } from '../../modules/selectors';
import MenuButton from './MenuButton';
import HeaderPane from './HeaderPane';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';

import './HeaderPaneContainer.less';

class HeaderPaneContainer extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isOpen:false,
    }
  }

  toggle = () =>{
    if(this.state.isOpen){
      this.setState({ isOpen: false });
    } else {
      this.setState({ isOpen: true });
    }
  };

  render(){

    return (
      <div className='header-container'>
        <MenuButton isOpen={this.state.isOpen} toggle={this.toggle} />
        <TransitionGroup>
          {this.state.isOpen &&
            <CSSTransition
              classNames="control-container"
              timeout={{ enter: 200, exit: 200 }}>
              <HeaderPane {...this.props}  />
            </CSSTransition>}
        </TransitionGroup>
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

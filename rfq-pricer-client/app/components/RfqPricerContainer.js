import React, { PureComponent } from 'react';
import { bool, string } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HeaderPaneContainer from "./Header/HeaderPaneContainer";
import RfqSummaryContainer from "./RfqSummary/RfqSummaryContainer";
import './RfqPricerContainer.less';

class RfqPricerContainer extends PureComponent {

  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div>
       <HeaderPaneContainer />
       <RfqSummaryContainer />
      </div>
    );
  }

}

RfqPricerContainer.propTypes = {};
RfqPricerContainer.defaultProps = {};

const mapDispatchToProps = dispatch => bindActionCreators({
//add actions
}, dispatch);

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(RfqPricerContainer);

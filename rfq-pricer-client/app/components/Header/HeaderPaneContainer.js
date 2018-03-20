import React, { PureComponent } from 'react';
import { bool, string } from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './HeaderPaneContainer.less';


class HeaderPaneContainer extends PureComponent {

  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div>
        HeaderPaneContainer things...
      </div>
    );
  }

}

HeaderPaneContainer.propTypes = {};
HeaderPaneContainer.defaultProps = {};

const mapDispatchToProps = dispatch => bindActionCreators({
//add actions
}, dispatch);

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderPaneContainer);

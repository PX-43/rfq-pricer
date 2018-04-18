import React, {PureComponent} from 'react';
import RefreshButton from './RefreshButton';
import RejectButton from './RejectButton';
import AcceptButton from './AcceptButton';
import './RfqActionButtonsContainer.less';


class RfqActionButtonsContainer extends PureComponent {

  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className='buttonContainer'>
        <RejectButton/>
        <RefreshButton/>
        <AcceptButton/>
      </div>
    );
  }


}


export default RfqActionButtonsContainer;

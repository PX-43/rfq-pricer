import React from 'react';
import {viewConstants as vc} from "../../../../constants";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faKey from '@fortawesome/fontawesome-free-solid/faKey'

export default props => {

  if(props.isVisible){
    return <div className={vc.EDITABLE_CELL_STYLE_CHANGED_LOCK}><FontAwesomeIcon icon={faKey} title='Revert change'/></div>;
  } else {
    return null;
  }
}

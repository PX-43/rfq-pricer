import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faTrashAlt from '@fortawesome/fontawesome-free-solid/faTrashAlt'

export default props => {

  if(props.visible){
    return (
      <div>
        <button className='removeButton' title='Remove' onClick={props.remove}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
    );
  }

  return null;
}

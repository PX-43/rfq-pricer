import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faCheckCircle from '@fortawesome/fontawesome-free-solid/faCheckCircle'

export default props => {


  return (
    <div>
      <button className='acceptButton' title='Accept'>
        <FontAwesomeIcon icon={faCheckCircle} />
      </button>
    </div>
  );

}

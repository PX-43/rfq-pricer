import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faTimesCircle from '@fortawesome/fontawesome-free-solid/faTimesCircle'

export default props => {


  return (
    <div>
      <button className='rejectButton' title='Reject'>
        <FontAwesomeIcon icon={faTimesCircle} />
      </button>
    </div>
  );

}

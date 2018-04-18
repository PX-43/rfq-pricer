import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faSyncAlt from '@fortawesome/fontawesome-free-solid/faSyncAlt'

export default props => {


  return (
    <div>
      <button className='refreshButton' title='Refresh'>
        <FontAwesomeIcon icon={faSyncAlt} />
      </button>
    </div>
  );

}

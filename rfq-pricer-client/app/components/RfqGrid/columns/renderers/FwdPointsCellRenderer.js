import React from 'react';
import { products } from '../../../../constants';

//todo: check this api thingy what's it's purpose
//todo: otherwise, convert this into a react component and use state to update text box value - although that is WRONG
// NO LONGER UNI DIRECTIONAL WORKFLOW AND THERE ISN'T A SINGLE STATE
const update = (evt, api) =>{
  //api.dispatchEvent()
  console.log(evt.target.value);
};

const FwdPointsCellRenderer = props =>{
  const {api, data: {fwdPoints, legType}, node: {level}} = props;

  if(level !== 1)
    return null;

  console.log('rendering FwdPointsCellRenderer');

  if(legType === products.SPOT){
    return '-';
  }

  return(
    <div className='editable-cell-content'>
      <input type='text' value={fwdPoints} onChange={evt => update(evt, api)} />
    </div>
  );

};


export default FwdPointsCellRenderer;

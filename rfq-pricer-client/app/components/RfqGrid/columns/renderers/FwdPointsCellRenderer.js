import React from 'react';

const update = (evt, api) =>{
  //api.dispatchEvent()
  console.log(evt.target.value);
};

const FwdPointsCellRenderer = props =>{
  const {api, data: {fwdPoints}, node: {level}} = props;

  if(level !== 1)
    return null;

  return(
    <div className='editable-cell-content'>
      <input type='text' value={fwdPoints} onChange={evt => update(evt, api)} />
    </div>
  );

};


export default FwdPointsCellRenderer;

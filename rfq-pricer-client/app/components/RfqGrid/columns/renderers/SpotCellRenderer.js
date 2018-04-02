import React from 'react';

const update = (evt, api) =>{
  //api.dispatchEvent()
  console.log(evt.target.value);
};

const SpotCellRenderer = props =>{
  const {api, data: {spot}, node: {level}} = props;

  if(level > 0)
    return null;

  return(
    <div className='editable-cell-content'>
      <input type='text' value={spot} onChange={evt => update(evt, api)} />
    </div>
  );

};


export default SpotCellRenderer;

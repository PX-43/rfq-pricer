import React from 'react';
import { rfqPricerFlowActions } from "../../../../modules/actions";
import { priceUtils } from '../../../../utils';

const update = (api, id, rfqId, spot, originalValue) => {
  //todo: validate
  const newSpot = Number.parseFloat(spot);
  if(newSpot !== originalValue)
    api.dispatchEvent(rfqPricerFlowActions.onSpotChanged(id, rfqId, newSpot));
};

const handleOnBlur = (evt, originalValue, id, rfqId, api) =>{
  const spot = evt.target.value;
  update(api, id, rfqId, spot, originalValue);
};

const handleKeyPress = (evt, originalValue, id, rfqId, api) => {
  if(evt.key === 'Enter'){
    const spot = evt.target.value;
    update(api, id, rfqId, spot, originalValue);
  }
};

export default (props) =>{
  const {api, data: {spot, id, rfqId, precision}, node: {level}} = props;

  if(level > 0)
    return null;

  console.log('rendering SpotCellRenderer');

  const formattedSpot = priceUtils.addTrailingZeros(spot, precision);

  const originalValue = spot;
  return(
    <div className='editable-cell-content'>
      <input type='text' defaultValue={formattedSpot}
             onBlur={evt => handleOnBlur(evt, originalValue, id, rfqId, api)}
             onKeyPress={evt => handleKeyPress(evt, originalValue, id, rfqId, api)} />
    </div>
  );

};

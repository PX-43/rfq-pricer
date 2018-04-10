import React from 'react';
import { products } from '../../../../constants';
import { rfqPricerFlowActions } from "../../../../modules/actions";

const update = (api, id, rfqId, fwdPoints, ccyNodeId, originalValue) => {
  //todo: validate
  const newFwdPoints = Number.parseFloat(fwdPoints);
  if(newFwdPoints !== originalValue)
    api.dispatchEvent(rfqPricerFlowActions.onFwdPointsChanged(id, rfqId, ccyNodeId, newFwdPoints));
};

const handleOnBlur = (evt, originalValue, id, rfqId, ccyNodeId, api) =>{
  const fwdPoints = evt.target.value;
  update(api, id, rfqId, fwdPoints, ccyNodeId, originalValue);
};

const handleKeyPress = (evt, originalValue, id, rfqId, ccyNodeId, api) => {
  if(evt.key === 'Enter'){
    const fwdPoints = evt.target.value;
    update(api, id, rfqId, fwdPoints, ccyNodeId, originalValue);
  }
};

export default props => {
  const {api, data: {fwdPoints, legType, id, rfqId, ccyNodeId}, node: {level}} = props;

  if(level !== 1)
    return null;

  console.log('rendering FwdPointsRenderer');

  if(legType === products.SPOT){
    return '-';
  }

  const originalValue = fwdPoints;
  return(
    <div className='editable-cell-content'>
      <input type='text' defaultValue={fwdPoints}
             onBlur={evt => handleOnBlur(evt, originalValue, id, rfqId, ccyNodeId, api)}
             onKeyPress={evt => handleKeyPress(evt, originalValue, id, rfqId, ccyNodeId, api)} />
    </div>
  );
};

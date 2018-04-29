import React, {PureComponent} from 'react';
import { rfqPricerFlowActions } from "../../../../modules/actions";
import { priceUtils } from '../../../../utils';
import {viewConstants as vc} from "../../../../constants";
import PriceLock from './PriceLock';

class SpotRenderer extends PureComponent {

  constructor(props){
    super(props);
  }

  update = (updatedValue) => {
    const {api, data: {spot, id, rfqId}} = this.props;
    //todo: validate
    const newSpot = Number.parseFloat(updatedValue);
    if(newSpot !== spot)
      api.dispatchEvent(rfqPricerFlowActions.onSpotChanged(id, rfqId, newSpot));
  };

  revertSpot = () =>{
    const {api, data: {id, rfqId}} = this.props;
    api.dispatchEvent(rfqPricerFlowActions.onRevertingSpot(id, rfqId));
  };

  render(){
    const {data: {spot, spotLocked, precision}, node: {level}} = this.props;

    if(level > 0)
      return null;

    let editableStyle = spotLocked ? vc.EDITABLE_CELL_STYLE_CHANGED : vc.EDITABLE_CELL_STYLE;

    const formattedSpot = priceUtils.addTrailingZeros(spot, precision);

    return(
      <div className={editableStyle}>
        <PriceLock isVisible={spotLocked} revert={this.revertSpot}/>
        <input type='text' defaultValue={formattedSpot}
               onBlur={evt => this.update(evt.target.value)}
               onKeyPress={evt => (evt.key === vc.KEYS.ENTER) ? this.update(evt.target.value) : null} />
      </div>
    );
  }
}

export default SpotRenderer;

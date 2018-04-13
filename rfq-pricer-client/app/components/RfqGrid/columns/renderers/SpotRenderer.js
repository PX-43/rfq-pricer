import React, {PureComponent} from 'react';
import { rfqPricerFlowActions } from "../../../../modules/actions";
import { priceUtils } from '../../../../utils';

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

  render(){
    const {data: {spot, precision}, node: {level}} = this.props;

    if(level > 0)
      return null;

    console.log('rendering SpotRenderer');

    const formattedSpot = priceUtils.addTrailingZeros(spot, precision);

    return(
      <div className='editable-cell-content'>
        <input type='text' defaultValue={formattedSpot}
               onBlur={evt => this.update(evt.target.value)}
               onKeyPress={evt => (evt.key === 'Enter') ? this.update(evt.target.value) : null} />
      </div>
    );
  }
}

export default SpotRenderer;

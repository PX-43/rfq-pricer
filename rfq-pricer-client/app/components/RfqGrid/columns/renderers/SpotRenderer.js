import React, {PureComponent} from 'react';
import { rfqPricerFlowActions } from "../../../../modules/actions";
import { priceUtils } from '../../../../utils';
import {viewConstants as vc} from "../../../../constants";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faKey from '@fortawesome/fontawesome-free-solid/faKey'

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
    const {data: {spot, systemSpot, precision}, node: {level}} = this.props;

    if(level > 0)
      return null;

    console.log('rendering SpotRenderer');

    let editableStyle = vc.EDITABLE_CELL_STYLE;
    let lockedIcon = null;
    if(spot !== systemSpot ){
      editableStyle = vc.EDITABLE_CELL_STYLE_CHANGED;
      lockedIcon = <div className={vc.EDITABLE_CELL_STYLE_CHANGED_LOCK}><FontAwesomeIcon icon={faKey} /></div>;
    }

    const formattedSpot = priceUtils.addTrailingZeros(spot, precision);

    return(
      <div className={editableStyle}>
        {lockedIcon}
        <input type='text' defaultValue={formattedSpot}
               onBlur={evt => this.update(evt.target.value)}
               onKeyPress={evt => (evt.key === vc.KEYS.ENTER) ? this.update(evt.target.value) : null} />
      </div>
    );
  }
}

export default SpotRenderer;

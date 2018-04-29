import React, {PureComponent} from 'react';
import {products, viewConstants as vc} from '../../../../constants';
import { rfqPricerFlowActions } from "../../../../modules/actions";
import PriceLock from './PriceLock';

class FwdPointsRenderer extends PureComponent {
  constructor(props){
    super(props);
  }

  update = (updatedValue) => {
    const {api, data: {fwdPoints, id, ccyNodeId, rfqId}} = this.props;
    //todo: validate
    const newFwdPoints = Number.parseFloat(updatedValue);
    if(newFwdPoints !== fwdPoints)
      api.dispatchEvent(rfqPricerFlowActions.onFwdPointsChanged(id, rfqId, ccyNodeId, newFwdPoints));
  };

  revertFwdPoints = () => {
    const {api, data: {id, ccyNodeId, rfqId}} = this.props;
    api.dispatchEvent(rfqPricerFlowActions.onRevertingFwdPoints(id, rfqId, ccyNodeId));
  };

  render(){
    const {data: {fwdPoints, fwdPointsLocked, legType}, node: {level}} = this.props;

    if(level !== 1 || legType === products.SPOT)
      return null;

    let editableStyle = fwdPointsLocked ? vc.EDITABLE_CELL_STYLE_CHANGED : vc.EDITABLE_CELL_STYLE;

    return(
      <div className={editableStyle}>
        <PriceLock isVisible={fwdPointsLocked} revert={this.revertFwdPoints}/>
        <input type='text' defaultValue={fwdPoints}
               onBlur={evt => this.update(evt.target.value)}
               onKeyPress={evt => (evt.key === vc.KEYS.ENTER) ? this.update(evt.target.value) : null} />
      </div>
    );
  }
}

export default FwdPointsRenderer;

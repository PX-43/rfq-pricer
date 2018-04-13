import React, {PureComponent} from 'react';
import { rfqPricerFlowActions } from "../../../../modules/actions";
import { priceUtils } from '../../../../utils';

class SpotRenderer extends PureComponent {

  constructor(props){
    super(props);
    this.editableElementContainer = React.createRef();
  }

  update = (updatedValue) => {
    const {api, data: {spot, id, rfqId}} = this.props;
    //todo: validate
    const newSpot = Number.parseFloat(updatedValue);
    if(newSpot !== spot)
      api.dispatchEvent(rfqPricerFlowActions.onSpotChanged(id, rfqId, newSpot));
  };

  handleOnBlur = (evt) => {
    const spot = evt.target.value;
    this.update(spot);
  };

  handleKeyPress = (evt) => {
    if(evt.key === 'Enter'){
      const spot = evt.target.value;
      this.update(spot);
    }
  };

  componentDidMount() {
    const cell = this.editableElementContainer.current.parentElement;
    console.log(cell);
  }


  render(){

    const {data: {spot, precision}, node: {level}} = this.props;

    if(level > 0)
      return null;

    console.log('rendering SpotRenderer');

    const formattedSpot = priceUtils.addTrailingZeros(spot, precision);

    return(
      <div className='editable-cell-content' ref={this.editableElementContainer}>
        <input type='text' defaultValue={formattedSpot}
               onBlur={evt => this.handleOnBlur(evt)}
               onKeyPress={evt => this.handleKeyPress(evt)} />
      </div>
    );
  }

}

export default SpotRenderer;

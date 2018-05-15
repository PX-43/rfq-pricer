import React  from 'react';
import CcyList from './CcyList';

//It's not a presentational component because we want to control rendering (see shouldComponentUpdate).
//There is no point in using PureComponent here as shouldComponentUpdate is overwritten.
class RfqSummary extends React.Component {

  constructor(props){
    super(props)
  }

  isSelected = () => this.props.selectedRfqId ===  this.props.rfq.id;

  //improve performance by not rendering component unnecessarily
  shouldComponentUpdate(nextProps) {
    if(this.isSelected()){
      return nextProps.selectedRfqId !== this.props.rfq.id; //being unselected
    } else {
      return nextProps.selectedRfqId === this.props.rfq.id  //being selected
    }
  }

  onClick = () => this.props.selectedRfqChanged(this.props.rfq.id);

  render(){
    let classNames;
    if (this.props.hasError) {
      classNames = this.isSelected() ? 'rfq-summary--withError--selected' : 'rfq-summary--withError';
    } else {
      classNames = this.isSelected() ? 'rfq-summary--selected' : 'rfq-summary';
    }

    classNames += ' rfq-summary--rounded';

    return (
      <li>
        <div className={classNames} onClick={this.onClick}>
          <div className='rfq-summary__top'>
            <div className='rfq-summary__name'>{this.props.rfq.client}</div>
            <div>{this.props.rfq.status}</div>
          </div>
          <div className='rfq-summary__bottom'>
            <div>{this.props.rfq.productType}</div>
            <CcyList ccyPairs={this.props.ccyPairs} />
          </div>
        </div>
      </li>
    );
  }

}

export default RfqSummary;

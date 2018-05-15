import React, {PureComponent} from 'react';
import {viewConstants as vc} from "../../constants";

class RfqRequest extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      rfqCounter: 1
    };
  }

  setRfqCounter = (evt) =>  {
    const input = evt.target.value;
    const val = Number.parseInt(input);

    if(input === ''){//if last character is deleted
      this.setState({
        rfqCounter: ''
      });
    }else if(val > 0){
      this.setState({
        rfqCounter: val
      });
    }
  };

  requestNewRfq = () => this.props.requestNewRfq(this.state.rfqCounter);

  preventDefault = evt => {
    if(evt.key === vc.KEYS.ENTER){
      evt.preventDefault();
      return false;
    }
  };

  render(){
    return (
      <div className='rfq-request'>
        <button className='rfq-request__button'
                onClick={this.requestNewRfq}
                onKeyPress={this.preventDefault}>
          Request
        </button>
        <input type='text' value={this.state.rfqCounter}
               onChange={evt => this.setRfqCounter(evt)}
               placeholder='how many?' />
        <label>{this.state.rfqCounter === 1 ? 'RFQ' : 'RFQs'}</label>
      </div>
    )
  }

}

export default RfqRequest;

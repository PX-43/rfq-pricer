import React, {PureComponent} from 'react';
import { serverResponseTestScenario as scenarios } from '../../constants';


class ScenarioTesting extends PureComponent {

  constructor(props){
    super(props);
  }

  delayByValueChanged = evt => {
    const input = evt.target.value;
    const val = Number.parseInt(input);

    if(input === ''){//if last character is deleted
      this.props.scenarioDelayedByParamChanged(0);
    }else if(val > 0){
      this.props.scenarioDelayedByParamChanged(val);
    }
  };

  handleScenarioChange = evt => {
    this.props.serverResponseScenarioChanged(evt.target.value);
  };

  render() {

    return (
      <div className='scenario-testing'>
        <div>
          <label>
            <input type='radio' value={scenarios.NORMAL}
                   checked={this.props.serverResponseScenario === scenarios.NORMAL}
                   onChange={this.handleScenarioChange}/>
            Normal response
          </label>
        </div>
        <div>
          <label>
            <input type='radio' value={scenarios.ERROR}
                   checked={this.props.serverResponseScenario === scenarios.ERROR}
                   onChange={this.handleScenarioChange}/>
            Response with error
          </label>
        </div>
        <div className='scenario-testing__delayBy'>
          <label>
            Delay response by
            <input type='text' value={this.props.delayBy}
                   onChange={this.delayByValueChanged} />
            <span className='scenario-testing__delayBy--ms'>ms</span>
          </label>
        </div>
      </div>
    );
  }


}

export default ScenarioTesting;

import React from 'react';
import ScenarioTesting from './ScenarioTesting';
import RfqRequest from './RfqRequest';

export default props => {


  return (
      <div className='control-container' >
        <RfqRequest requestNewRfq={props.requestNewRfq} />
        <ScenarioTesting
          serverResponseScenario={props.serverResponseScenario}
          delayBy={props.delayBy}
          serverResponseScenarioChanged={props.serverResponseScenarioChanged}
          scenarioDelayedByParamChanged={props.scenarioDelayedByParamChanged} />
      </div>
  );

}





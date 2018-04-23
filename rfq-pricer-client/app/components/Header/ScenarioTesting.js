import React from 'react';

const scenarioOptionsChanged = props => {

};


export default props => {


  return (
    <div className='scenario-testing'>
      <div>
        <label>
          <input type='radio' value='normal'
                 checked={props.delayBy === 0 && !props.hasError && !props.noResponse}
                 onChange={props.scenarioOptionsChanged}/>
          Normal response
        </label>
      </div>
      <div className='scenario-testing__delayBy'>
        <label>
          <input type='radio' value='delayBy'
                 checked={props.delayBy > 0}
                 onChange={props.scenarioOptionsChanged}/>
          Delay response by
        </label>
        <input type='text' defaultValue='0'  />
        <span className='scenario-testing__delayBy--ms'>ms</span>
      </div>
      <div>
        <label>
          <input type='radio' value='hasError'
                 checked={props.hasError}
                 onChange={props.scenarioOptionsChanged}/>
          Response with error
        </label>
      </div>
      <div>
        <label>
          <input type='radio' value='noResponse'
                 checked={props.noResponse}
                 onChange={props.scenarioOptionsChanged}/>
          No response
        </label>
      </div>
    </div>
  );

}

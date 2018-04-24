import { createSelector } from 'reselect';

const serverResponseScenario = state => state.scenarioTesting.serverResponseScenario;
const delayBy = state => state.scenarioTesting.delayBy;

export const getServerResponseScenario = createSelector( [serverResponseScenario], val => val);
export const getDelayBy = createSelector( [delayBy], delay => delay);

export const getAllServerResponseParams = createSelector(
  [getServerResponseScenario, getDelayBy],
  (scenario, delayLength) => {
    return {
      scenario,
      delayLength
    }
  }
);

import * as ccys from "./ccys";

const DEFAULT_RATE_CHANGE = [0.0001, 0.002]; //get random change amount that is between these two values
const DEFAULT_DEVIATION = 0.04; //if spot rate has is this far from the original (+/-), force opposite change direction
const DEFAULT_SPREAD_RATIO = 1000; //divide spread with this to calculate the correct fwd price
const ccyMap = new Map([
    [ccys.AUDUSD, {rate: 0.7679, change:DEFAULT_RATE_CHANGE, deviation:DEFAULT_DEVIATION, spreadRatio:DEFAULT_SPREAD_RATIO}],
    [ccys.EURUSD, {rate: 1.2324, change:DEFAULT_RATE_CHANGE, deviation:DEFAULT_DEVIATION, spreadRatio:DEFAULT_SPREAD_RATIO}],
    [ccys.GBPUSD, {rate: 1.4015, change:DEFAULT_RATE_CHANGE, deviation:DEFAULT_DEVIATION, spreadRatio:DEFAULT_SPREAD_RATIO}],
    [ccys.USDCAD, {rate: 1.2915, change:DEFAULT_RATE_CHANGE, deviation:DEFAULT_DEVIATION, spreadRatio:DEFAULT_SPREAD_RATIO}],
    [ccys.USDCHF, {rate: 0.9541, change:DEFAULT_RATE_CHANGE, deviation:DEFAULT_DEVIATION, spreadRatio:DEFAULT_SPREAD_RATIO}],
    [ccys.USDJPY, {rate: 106.28, change:[0.01, 0.2],         deviation:4.0,               spreadRatio:10}],
    [ccys.NZDUSD, {rate: 0.7237, change:DEFAULT_RATE_CHANGE, deviation:DEFAULT_DEVIATION, spreadRatio:DEFAULT_SPREAD_RATIO}],
]);

export const getSpotRate = ccy => ccyMap.has(ccy) ? ccyMap.get(ccy).rate : 1.0;
export const getChangeRange = ccy => ccyMap.has(ccy) ? ccyMap.get(ccy).change : DEFAULT_RATE_CHANGE;
export const getAllowedDeviation = ccy => ccyMap.has(ccy) ? ccyMap.get(ccy).deviation : DEFAULT_DEVIATION;
export const getSpreadRatio = ccy => ccyMap.has(ccy) ? ccyMap.get(ccy).spreadRatio : DEFAULT_SPREAD_RATIO;
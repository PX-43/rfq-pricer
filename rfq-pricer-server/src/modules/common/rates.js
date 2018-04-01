import * as ccys from "./ccys";

const DEFAULT_RATE_CHANGE = [0.0001, 0.003]; //get random change amount that is between these two values
const DEFAULT_DEVIATION = 0.04; //if spot has moved this far from the original (+/-), force opposite change direction
const DEFAULT_PRECISION = 10000; //e.g. divide spread with this to calculate the correct fwd price
const ccyMap = new Map([
    [ccys.AUDUSD, {baseSpot: 0.7679, change:DEFAULT_RATE_CHANGE,
                    deviation:DEFAULT_DEVIATION, precision:DEFAULT_PRECISION}],
    [ccys.EURUSD, {baseSpot: 1.2324, change:DEFAULT_RATE_CHANGE,
                    deviation:DEFAULT_DEVIATION, precision:DEFAULT_PRECISION}],
    [ccys.GBPUSD, {baseSpot: 1.4015, change:DEFAULT_RATE_CHANGE,
                    deviation:DEFAULT_DEVIATION, precision:DEFAULT_PRECISION}],
    [ccys.USDCAD, {baseSpot: 1.2815, change:DEFAULT_RATE_CHANGE,
                    deviation:DEFAULT_DEVIATION, precision:DEFAULT_PRECISION}],
    [ccys.USDCHF, {baseSpot: 0.9541, change:DEFAULT_RATE_CHANGE,
                    deviation:DEFAULT_DEVIATION, precision:DEFAULT_PRECISION}],
    [ccys.USDJPY, {baseSpot: 106.25, change:[0.01, 0.2],
                    deviation:4.0, precision:100}],
    [ccys.NZDUSD, {baseSpot: 0.7237, change:DEFAULT_RATE_CHANGE,
                    deviation:DEFAULT_DEVIATION, precision:DEFAULT_PRECISION}],
]);

export const get = ccy => ccyMap.has(ccy) ? ccyMap.get(ccy) : {};
export const getBaseSpot = ccy => ccyMap.has(ccy) ? ccyMap.get(ccy).baseSpot : 1.0;
export const getChangeRange = ccy => ccyMap.has(ccy) ? ccyMap.get(ccy).change : DEFAULT_RATE_CHANGE;
export const getAllowedDeviation = ccy => ccyMap.has(ccy) ? ccyMap.get(ccy).deviation : DEFAULT_DEVIATION;
export const getPrecision = ccy => ccyMap.has(ccy) ? ccyMap.get(ccy).precision : DEFAULT_PRECISION;
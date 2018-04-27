import * as rates from '../common/rates';
import * as tenors from '../common/tenors';
import random from 'lodash/random';

const roundBy = (precision, val) => {
   return Math.round(val * precision) / precision ;
};

const getRandomChange = (ccy) => {
    const {precision, change} = rates.get(ccy);
    const changeVal = random(...change);
    return roundBy(precision, changeVal);
};

//+ or -
const randomiseOp = (val, change, ccy) => {
    const precision = rates.getPrecision(ccy);
    const result =  (random(1, 100) % 2 === 0) ? val - change : val + change;
    return roundBy(precision, result);
};

export const getFwdPrice =  (ccy, spot, tenor) => {
    const precision = rates.getPrecision(ccy);
    const fwdPoints = tenors.getSpread(tenor);
    return {
        fwdPoints, //todo: add some randomness to fwd points
        fwdPrice: roundBy(precision, spot + (fwdPoints / precision)),
    };
};

export const getMidPrice = (ccy, price) => randomiseOp(price, getRandomChange(ccy), ccy);

export const getSpot = (ccy, currentSpot) => {
    const { baseSpot, deviation, precision } = rates.get(ccy);
    const change = getRandomChange(ccy);
    const spot = (!!currentSpot) ? currentSpot : baseSpot;

    if((spot + change) > (baseSpot + deviation)){
        return roundBy(precision, spot - change);
    } else if((spot - change) < (baseSpot - deviation)){
        return roundBy(precision, spot + change);
    } else {
        return randomiseOp(spot, change, ccy);
    }
};
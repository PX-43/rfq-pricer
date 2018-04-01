import * as rates from '../common/rates';
import * as tenors from '../common/tenors';
import products from '../common/products';
import random from 'lodash/random';

const roundBy = (precision, val) => Math.round(val * precision) / precision ;

const getRandomChange = (ccy) => {
    const {precision, change} = rates.get(ccy);
    const changeVal = random(...change);
    return roundBy(precision, changeVal);
};

//+ or -
const randomiseOp = (val, change) => {
    return (random(1, 100) % 2 === 0) ? val - change : val + change;
};

const getSpot = (ccy, currentSpot) => {
    const {baseSpot, deviation} = rates.get(ccy);
    const change = getRandomChange(ccy);
    const spot = (!!currentSpot) ? currentSpot : baseSpot;

    if((spot + change) > (baseSpot + deviation)){
        return spot - change;
    } else if((spot - change) < (baseSpot - deviation)){
        return spot + change;
    } else {
        return randomiseOp(spot, change);
    }
};

const getMidPrice = (ccy, price) => randomiseOp(price, getRandomChange(ccy));
const getFwdPoints =  tenor => tenors.getSpread(tenor);
const getFwdPrice =  (ccy, spot, tenor) => {
    const precision = rates.getPrecision(ccy);
    const fwdPoints = getFwdPoints(tenor);
    return spot + roundBy(precision, fwdPoints);
};

const createPrice = ( spot = 0, midPrice = 0, fwdPrice = 0, fwdPoints = 0) => {
    return  {
        spot,
        fwdPoints,
        fwdPrice,
        midPrice
    };
};

export default getPrice = (ccy, product, tenor, currentSpot) => {

    const spot = getSpot(ccy, currentSpot);

    switch (product){
        case products.PRODUCT_FWD :
            const fwdPrice = getFwdPrice(ccy, spot, tenor);
            return createPrice (
                spot,
                getMidPrice(ccy, fwdPrice),
                fwdPrice,
                getFwdPoints(tenor),
            );
        case product.PRODUCT_SPOT :
            return createPrice (
                spot,
                getMidPrice(ccy, spot)
            );
        default: return createPrice();
    }
};
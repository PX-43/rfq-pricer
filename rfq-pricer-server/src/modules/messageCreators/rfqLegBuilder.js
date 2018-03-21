import * as parts from './rfqParts';
import * as pricing from '../pricing/pricingService';
import {CCY_PAIRS} from "../common/ccys";
import _ from 'lodash';

const MAX_STRATEGIES = CCY_PAIRS.length; //strategies are defined by ccy pairs
const MAX_LEG_GROUPS = 4;
const MAX_LEGS = 4;

const getValueDate = (productType, excludedTenors) => {
    let result = {tenor:'', valueDate:''};
    if(productType === parts.PRODUCT_SPOT){
        result.valueDate = parts.getSpotValueDate();
    } else if(productType === parts.PRODUCT_FWD){
        const tenor = parts.getTenor(excludedTenors);
        result.tenor = tenor;
        result.valueDate = parts.getFwdValueDate(tenor);
    }

    return result;
};

const getExcludedCcyPairs = legs => _.uniq(_.map(legs, 'ccyPair'));

const getExcludedTenors = (legs, ccyPair) => _.uniq(_.map(_.filter(legs, {'ccyPair':ccyPair}), 'tenor'));

const getExcludedLegTypes = (legs, ccyPair) => {
    //allow only one spot group per ccy pair
    const hasSpot = _.find(_.filter(legs, {'ccyPair':ccyPair}), leg => leg.legType === parts.PRODUCT_SPOT);
    return hasSpot ? [parts.PRODUCT_SPOT] : [];
};

export const createLegs = () => {
    let legs = {};

    _.times(_.random(1, MAX_STRATEGIES), strategyIndex => {
        const ccyPair = parts.getCcyPair(getExcludedCcyPairs(legs));
        const dealCcy = parts.getDealCcy(ccyPair);
        //const spot = pricing.getSpotPrice(ccyPair);

        _.times(_.random(1, MAX_LEG_GROUPS), groupIndex => {
            const legType = parts.getLegType(getExcludedLegTypes(legs, ccyPair));
            const valueDate = getValueDate(legType, getExcludedTenors(legs, ccyPair));

            _.times(_.random(1, MAX_LEGS), legIndex => {
                const stamm = parts.getStamm();
                const legId = parts.getUniqueId();
                legs[legId] = {
                    legId,
                    strategyIndex,
                    groupIndex,
                    legIndex,
                    side: parts.getSide(),
                    amount: parts.getAmount(),
                    fund: parts.getFund(stamm),
                    spot: null,
                    fwdPoint:null,
                    fwdPrice:null,
                    midPrice:null,
                    ccyPair,
                    dealCcy,
                    stamm,
                    legType,
                    ...valueDate,
                };
            });
        });
    });

    return legs;
};
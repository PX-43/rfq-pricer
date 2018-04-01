import * as parts from './rfqParts';
import getPrice from '../pricing/pricingService';
import {CCY_PAIRS} from "../common/ccys";
import products from "../common/products";
import _ from 'lodash';

const MAX_STRATEGIES = CCY_PAIRS.length; //strategies are defined by ccy pairs
const MAX_LEG_GROUPS = 4;
const MAX_LEGS = 6;

const getValueDate = (productType, excludedTenors) => {
    let result = {tenor:'', valueDate:''};
    if(productType === products.PRODUCT_SPOT){
        result.valueDate = parts.getSpotValueDate();
    } else if(productType === products.PRODUCT_FWD){
        const tenor = parts.getTenor(excludedTenors);
        result.tenor = tenor;
        result.valueDate = parts.getFwdValueDate(tenor);
    }

    return result;
};

const getExcludedCcyPairs = legs => _.uniq(_.map(legs, 'ccyPair'));

const getExcludedTenors = (legs, ccyPair) => _.uniq(_.map(_.filter(legs, {'ccyPair':ccyPair}), 'tenor'));

const getExcludedProductTypes = (legs, ccyPair) => {
    //allow only one spot group per ccy pair
    const hasSpot = _.find(_.filter(legs, {'ccyPair':ccyPair}), leg => leg.legType === products.PRODUCT_SPOT);
    return hasSpot ? [products.PRODUCT_SPOT] : [];
};

export const createLegs = () => {
    let legs = [];

    _.times(_.random(1, MAX_STRATEGIES), strategyIndex => {
        const ccyPair = parts.getCcyPair(getExcludedCcyPairs(legs));
        const dealCcy = parts.getDealCcy(ccyPair);

        _.times(_.random(1, MAX_LEG_GROUPS), groupIndex => {
            const product = parts.getProductType(getExcludedProductTypes(legs, ccyPair));
            const {valueDate, tenor} = getValueDate(product, getExcludedTenors(legs, ccyPair));

            _.times(_.random(1, MAX_LEGS), legIndex => {
                const stamm = parts.getStamm();
                const id = parts.getUniqueId();
                legs.push({
                    id,
                    strategyIndex,
                    groupIndex,
                    legIndex,
                    side: parts.getSide(),
                    amount: parts.getAmount(),
                    fund: parts.getFund(stamm),
                    ccyPair,
                    dealCcy,
                    stamm,
                    legType: product,
                    valueDate,
                    tenor,
                    ...getPrice(ccyPair, product, tenor)
                });
            });
        });
    });

    return legs;
};
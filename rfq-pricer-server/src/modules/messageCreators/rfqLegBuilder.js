import * as parts from './rfqParts';
import * as prices from '../pricing/pricingService';
import {CCY_PAIRS} from "../common/ccys";
import products from "../common/products";
import _ from 'lodash';

const MAX_STRATEGIES = CCY_PAIRS.length; //strategies are defined by ccy pairs
const MAX_LEG_GROUPS = 4;
const MAX_LEGS = 6;

const getValueDate = (productType, excludedTenors) => {
    let result = {tenor:'', valueDate:''};
    if(productType === products.SPOT){
        result.valueDate = parts.getSpotValueDate();
    } else if(productType === products.FWD){
        const tenor = parts.getTenor(excludedTenors);
        result.tenor = tenor;
        result.valueDate = parts.getFwdValueDate(tenor);
    }

    return result;
};

const getExcludedCcyPairs = legs => _.uniq(_.map(legs, 'ccyPair'));

const getExcludedTenors = legs => _.uniq(_.map(legs, 'tenor'));

const getExcludedProductTypes = legs => {
    //exclude spot if it has one already: allow only one spot group per ccy pair
    const hasSpot = _.find(legs, leg => leg.legType === products.SPOT);
    return hasSpot ? [products.SPOT] : [];
};

const isFwd = product => product === products.FWD;
const isBuy = side => side === parts.SIDE_BUY;

const getAmount = children => {
    if(!children || children.length === 0){
        return 0;
    }
    if(children.length === 1){
        return children[0].amount;
    } else {
        return children.reduce((total, child) => {
            if(isBuy(child.side)){
                return total + child.amount;
            }
            return total - child.amount;
        }, 0);
    }
};

const getSide = amount => amount < 0 ? parts.SIDE_SELL : parts.SIDE_BUY;

export const createGroupedLegs = () => {
    let ccyNodes = [];

    _.times(_.random(1, MAX_STRATEGIES), () => {
        const ccyPair = parts.getCcyPair(getExcludedCcyPairs(ccyNodes));
        const spot = prices.getSpot(ccyPair);
        const ccyNode = {
            id:parts.getUniqueId(),
            dealCcy: parts.getDealCcy(ccyPair),
            ccyPair,
            spot,
            side:'',
            amount:0,
            valueDateNodes: []
        };
        ccyNodes.push(ccyNode);

        _.times(_.random(1, MAX_LEG_GROUPS), () => {
            const product = parts.getProductType(getExcludedProductTypes(ccyNode.valueDateNodes));
            const { valueDate, tenor } = getValueDate(product, getExcludedTenors(ccyNode.valueDateNodes));
            const { fwdPoints = 0, fwdPrice = 0 } = isFwd(product) ? prices.getFwdPrice(ccyPair, spot, tenor) : {};

            const valueDateNode = {
                id:parts.getUniqueId(),
                legType: product,
                valueDate,
                tenor,
                fwdPoints,
                fwdPrice,
                midPrice: prices.getMidPrice(ccyPair, isFwd(product) ? fwdPrice : spot),
                side:'',
                amount:0,
                legs: []
            };
            ccyNode.valueDateNodes.push(valueDateNode);

            _.times(_.random(1, MAX_LEGS), () => {
                const stamm = parts.getStamm();
                const leg = {
                    id: parts.getUniqueId(),
                    fund: parts.getFund(stamm),
                    side: parts.getSide(),
                    amount: parts.getAmount(),
                    stamm,
                };
                valueDateNode.legs.push(leg);

                const valueDateNodeAmount = getAmount(valueDateNode.legs);
                valueDateNode.side = getSide(valueDateNodeAmount);
                valueDateNode.amount = Math.abs(valueDateNodeAmount);

                const ccyNodeAmount = getAmount(ccyNode.valueDateNodes);
                ccyNode.side = getSide(ccyNodeAmount);
                ccyNode.amount = Math.abs(ccyNodeAmount);
            });
        });
    });

    return ccyNodes;
};
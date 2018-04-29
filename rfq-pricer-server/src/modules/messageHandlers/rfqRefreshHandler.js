import * as prices from '../pricing/pricingService';

import topics from './../common/topics';
import { publishCustomResponse } from './customResponsePublisher';
import products from '../common/products';

const getRfqWithNewPrices = rfq => {

    rfq.ccyNodes.forEach(ccyNode => {
        const ccyPair = ccyNode.ccyPair;
        const newSpot = prices.getSpot(ccyNode.ccyPair, ccyNode.spot);
        ccyNode.spot = newSpot;
        ccyNode.valueDateNodes.forEach(valueDateNode => {
            const isFwd = valueDateNode.legType === products.FWD;
            const tenor = valueDateNode.tenor;
            const { fwdPoints = 0, fwdPrice = 0 } = isFwd ? prices.getFwdPrice(ccyPair, newSpot, tenor) : {};
            const midPrice = prices.getMidPrice(ccyPair, isFwd ? fwdPrice : newSpot);
            valueDateNode.fwdPoints = fwdPoints;
            valueDateNode.fwdPrice = fwdPrice;
            valueDateNode.midPrice = midPrice;
        })
    });

    return rfq;
};

export const handleRefresh = (payload, send) => {

    const rfqWithNewPrices = getRfqWithNewPrices(payload.rfq);

    publishCustomResponse(
        topics.REFRESH_RFQ,
        rfqWithNewPrices,
        payload.serverResponseScenario,
        'An error has occurred. RFQ prices could not be refreshed.',
        send
    );
};
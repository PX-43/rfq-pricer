import * as rates from '../common/rates';

export const getSpotPrice = ccyPair => rates.getSpotRate(ccyPair);

import * as parts from './rfqParts';
import {createLegs} from './rfqLegBuilder';
import _ from 'lodash';


export const createRfq = () =>  {
    const id = parts.getUniqueId();
    const legs = createLegs();
    return {
        rfq:{
            [id]:{
                messageId: id,
                rfqId: id,
                productType : parts.getRfqType(),
                client: parts.getClient(),
                legIds: _.keys(legs)
            }
        },

        legs
    };
};
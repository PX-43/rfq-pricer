import * as parts from './rfqParts';
import {createLegs} from './rfqLegBuilder';
import _ from 'lodash';


export const createRfq = () =>  {
    const id = parts.getUniqueId();
    const legs = createLegs();
    return {
        rfq:{
            [id]:{
                id,
                productType : parts.getRfqType(),
                client: parts.getClient(),
                status:'New',
                legIds: _.keys(legs)
            }
        },

        legs
    };
};
import * as parts from './rfqParts';
import {createLegs} from './rfqLegBuilder';


export const createRfq = () =>  {
    const id = parts.getUniqueId();
    return {
        messageId: id,
        rfqId: id,
        productType : parts.getRfqType(),
        client: parts.getClient(),

        legs: createLegs()
    };
};
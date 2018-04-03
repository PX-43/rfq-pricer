import * as parts from './rfqParts';
import {createGroupedLegs} from './rfqLegBuilder';

export const createRfq = () => {
    return {
        rfq: {
            id: parts.getUniqueId(),
            productType: parts.getRfqType(),
            client: parts.getClient(),
            status: 'New',
            allocations: createGroupedLegs()
        }
    };
};
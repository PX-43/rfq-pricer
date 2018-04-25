import topics from './../common/topics';
import { publishCustomResponse } from './customResponsePublisher';

export const handleReject = (payload, send) => {

    publishCustomResponse(
        topics.REJECT_RFQ,
        payload.rfqId,
        payload.serverResponseScenario,
        'An error has occurred. RFQ could not be rejected.',
        send
    );

};
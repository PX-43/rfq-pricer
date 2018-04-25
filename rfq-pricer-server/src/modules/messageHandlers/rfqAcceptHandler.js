import topics from './../common/topics';
import { publishCustomResponse } from './customResponsePublisher';

export const handleAccept = (payload, send) => {

    publishCustomResponse(
        topics.ACCEPT_RFQ,
        payload.rfqId,
        payload.serverResponseScenario,
        'An error has occurred. RFQ could not be accepted.',
        send
    );

};
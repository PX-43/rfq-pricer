import topics from './../common/topics';
import { publishCustomResponse } from './customResponsePublisher';

export const handleReject = (payload, send) => {

    publishCustomResponse(
        topics.REJECT_RFQ,
        payload.rfqId,
        payload.serverResponseScenario,
        'RFQ could not be rejected. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        send
    );

};
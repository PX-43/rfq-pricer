import topics from './../common/topics';

const publishResponse = (send, rfqId) => {

    send(topics.REJECT_RFQ, rfqId);
};


export const handleReject = (payload, send) => {

    publishResponse(send, payload.rfqId);

};
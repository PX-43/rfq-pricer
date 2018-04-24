import topics from './../common/topics';
import responses from '../common/responses';
import delay from 'lodash/delay';


const publishResponse = (send, payload) => {

    const responseScenario = payload.serverResponseScenario;

    if(responseScenario && responseScenario.scenario !== responses.NORMAL) {
        const scenario = responseScenario.scenario;
        switch (scenario){
            case responses.DELAY :
                console.log('SCENARIO TEST: DELAY');
                delay(() => send(topics.REJECT_RFQ, payload.rfqId), responseScenario.delayLength);
                break;
            case responses.ERROR :
                console.log('SCENARIO TEST: ERROR');
                send(topics.REJECT_RFQ, payload.rfqId, 'An error has occurred. RFQ could not be rejected.');
                break;
            case responses.NO_RESPONSE :
                console.log('SCENARIO TEST: NO RESPONSE');
                return null;
            default:
                send(topics.REJECT_RFQ, payload.rfqId);
        }
    } else {
        send(topics.REJECT_RFQ, payload.rfqId);
    }
};


export const handleReject = (payload, send) => {

    publishResponse(send, payload);

};
import {publishRfq} from './rfqPublisher'
import { handleReject } from './rfqRejectHandler';
import { handleAccept } from './rfqAcceptHandler';
import topics from './../common/topics';

export const handleRequest = (msg, send) => {

    if(msg == null || msg.payload == null){
        console.log('Cannot parse incoming message. It should be {topic:topic, data:data}.');
        return;
    }

    switch (msg.topic){

        case topics.SUBSCRIBE_RFQ :
            publishRfq(msg.payload, send);
            break;
        case topics.REJECT_RFQ :
            handleReject(msg.payload, send);
            break;
        case topics.ACCEPT_RFQ :
            handleAccept(msg.payload, send);
            break;
        case topics.GET_PRICE :
            break;
        case topics.SUBSCRIBE_PRICE:
            break;
        default:
            break;
    }
};
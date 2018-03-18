import {publishRfq} from './rfqPublisher'
import topics from './../common/topics';

export const handleRequest = (msg, send) => {
    //TODO: ADD LOGIC FOR SPECIFIC SUBSCRIPTION REQUESTS FROM CLIENT

    if(msg == null){
        console.log('Cannot parse incoming message. It should be {topic:topic, data:data}.');
        return;
    }

    switch (msg.topic){

        case topics.SUBSCRIBE_RFQ :
            publishRfq(msg.data, send);
            break;
        case topics.GET_PRICE :
            break;
        case topics.SUBSCRIBE_PRICE:
            break;
        default:
            break;
    }
};
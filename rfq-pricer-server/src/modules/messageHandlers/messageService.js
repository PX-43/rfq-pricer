import {publishRfq} from './rfqPublisher'

const SUBSCRIBE_RFQ = 'subscribe_to_rfq';
const SUBSCRIBE_PRICE = 'subscribe_to_prices';
const GET_PRICE = 'get_price';


export const handleRequest = (msg, send) => {
    //TODO: ADD LOGIC FOR SPECIFIC SUBSCRIPTION REQUESTS FROM CLIENT

    if(msg == null){
        console.log('Cannot parse incoming message. It should be {topic:topic, data:data}.');
        return;
    }

    switch (msg.topic){

        case SUBSCRIBE_RFQ :
            publishRfq(msg.data, send);
            break;
        case GET_PRICE :
            break;
        case SUBSCRIBE_PRICE:
            break;
        default:
            break;
    }
};
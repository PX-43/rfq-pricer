import _ from 'lodash';
import {createRfq} from "../messageCreators/rfqBuilder";
import topics from './../common/topics';

const publish = send => {
    try {
        const rfq = createRfq();
        send(topics.RFQ, rfq);
        console.log('New RFQ was sent to client. RFQ Id: ' + rfq.rfqId);
    } catch (err){
        console.log('An error has occurred. RFQ could not be sent to client. ' + err);
    }
};


export const publishRfq = (numberOfRfqs, send) => {
    let wait = 0;
    _.times(numberOfRfqs, index => {
        if(index === 0){
            publish(send); //send the first one immediately
        } else {
            wait += _.random(1000, 10000);
            _.delay(() => publish(send), wait);
        }
    });
};



import _ from 'lodash';
import {createRfq} from "../messageCreators/rfqBuilder";
import topics from './../common/topics';

const publish = send => {
    //try {
        const rfq = createRfq();
        send(topics.RFQ, rfq);
    //} catch (err){
     //   console.log('An error has occurred. RFQ could not be sent to client. ' + err);
   // }
};


export const publishRfq = (payload, send) => {
    const numberOfRfqs = payload.rfqCount;
    let wait = 0;
    _.times(numberOfRfqs, index => {
        if(index === 0){
            publish(send); //send the first one immediately
        } else {
            wait += _.random(0, 1);
            _.delay(() => publish(send), wait);
        }
    });
};



import responses from "../common/responses";
import delay from "lodash/delay";


export const publishCustomResponse = (topic, payload, responseScenario, err, send) =>{

    if(responseScenario) {
        const customSend = getCustomSender(topic, payload, responseScenario, err, send);

        console.log(responseScenario.delayLength);

        if(responseScenario.delayLength > 0){
            console.log('sending delayed');
            delay(customSend, responseScenario.delayLength);
        } else {
            console.log('not sending delayed');
            customSend();
        }
    } else {
        console.log('normal send...');
        send(topic, payload);
    }
};

const getCustomSender = (topic, payload, responseScenario, err, send) => {

    switch (responseScenario.scenario){
        case responses.ERROR :
            return () => send(topic, payload, err);
        case responses.NO_RESPONSE :
            return null;
        default:
            return () => send(topic, payload);
    }
};
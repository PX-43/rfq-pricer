import responses from "../common/responses";
import delay from "lodash/delay";


export const publishCustomResponse = (topic, payload, responseScenario, err, send) =>{

    if(responseScenario && responseScenario.scenario !== responses.NORMAL) {
        const scenario = responseScenario.scenario;
        switch (scenario){
            case responses.DELAY :
                delay(() => send(topic, payload), responseScenario.delayLength);
                break;
            case responses.ERROR :
                send(topic, payload, err);
                break;
            case responses.NO_RESPONSE :
                return null;
            default:
                send(topic, payload);
        }
    } else {
        send(topic, payload);
    }

};
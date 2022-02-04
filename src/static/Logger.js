import {
    ENABLE_LOGGER
} from './GlobalConfigs';

export default class Logger {

    /**
     * Console.log if enabled
     * @param {String} text 
     */
    static LogInfo(text){
        if(ENABLE_LOGGER){
            console.log(text);
        }
    }
}
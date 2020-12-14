import {
    ENABLE_LOGGER
} from './GlobalConfigs';

export default class Logger {

    static isLoggerEnabled = ENABLE_LOGGER;
    /**
     * Console.log if enabled
     * @param {String} text 
     */
    static LogInfo(text){
        if(isLoggerEnabled){
            console.log(text);
        }
    }
}
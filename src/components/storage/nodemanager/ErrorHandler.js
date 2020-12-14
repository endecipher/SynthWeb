import {
    FinalizeWarnings
} from './../../../static/Messages';
import {
    ERROR,
    WARNING,
    INFORMATION
} from '../../../redux/actions/alert';

export default class ErrorHandler{
    constructor(){
        /**
         * @type {Array<Object>} Errors {msg : "", type : ""}
         */
        this.Errors = [];
        this.ErrorTypes = {
            ERROR : ERROR,
            WARNING : WARNING,
            INFORMATION : INFORMATION
        }
        this.hasCompilationFailed = false;
    }

    /**
     * Add a new Error
     * @param {String} err 
     */
    addError(err){
        this.Errors.push({
            msg : err,
            type : this.ErrorTypes.ERROR
        });

        this.hasCompilationFailed = true;
    }

    /**
     * Add a new Warning
     * @param {String} warning 
     */
    addWarning(warning){
        this.Errors.push({
            msg : warning,
            type : this.ErrorTypes.WARNING
        });
    }

    /**
     * Returns the Errors Array
     * @returns {Object} 
     */
    getMessages(){
        return {
            hasCompilationFailed : this.hasCompilationFailed,
            messages : this.Errors
        };
    }

    /**
     * Does Final Cleanup on the error Messages
     * @returns {void}
     */
    finalize(){
        if(this.Errors.length > 0 
            && !this.hasCompilationFailed 
                && this.Errors.some(err => err.type === this.ErrorTypes.WARNING))
        {
            this.Errors.unshift({
                msg : FinalizeWarnings,
                type : this.ErrorsTypes.INFORMATION
            });
        }
    }
}
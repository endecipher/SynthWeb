import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from '../types';

export const WARNING = 'warning';
export const ERROR = 'danger';
export const INFORMATION = 'info';
export const PRIMARY = 'primary';
export const SUCCESS = 'success';

export const AlertTypes = [ WARNING, ERROR, INFORMATION, PRIMARY, SUCCESS ];

export const setAlert = (msg, alertType, timeOut = 3000) => dispatch => {
    const id = uuidv4();

    if(!(alertType in AlertTypes))
        alertType = INFORMATION;

    dispatch({
        type: SET_ALERT,
        payload: {
            msg, alertType, id
        }
    });

    setTimeout(() => {
        dispatch({
            type: REMOVE_ALERT,
            payload: {
                id
            }
        });
    }, timeOut);
};
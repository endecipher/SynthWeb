export const keyBindings = {
    'a': 130.8,
    'w': 138.6,
    's': 146.8,
    'e': 155.6,
    'd': 164.8,
    'f': 174.6,
    't': 185.0,
    'g': 196.0,
    'y': 207.7,
    'h': 220.0,
    'u': 233.1,
    'j': 246.9
};

export const getNotes = () => {
    return [
        'c',
        'cs',
        'd',
        'ds',
        'e',
        'f',
        'fs',
        'g',
        'gs',
        'a',
        'as',
        'b'
    ]
};

/**
 * Checks if Key is Black (true) or White (false)
 * @param {String} key 
 * @example if key is 'cs' indicating c#, then it's black
 */
export const checkIfKeyIsBlack = (key) => {
    return (key.length > 1); 
}

export const highlightDetails = {
    key : ''
};

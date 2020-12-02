const ErrorPassed = (str) => str ? `Error : ${str}` : "";

export const ThrowOscillatorKeyOutOfBoundsException = (str = null) => {
    throw new Error(`AYAN_ERROR! Oscillator Key not defined. ${ErrorPassed(str)}`);
};

export const ThrowNodeUUIDNotFoundException = (str = null) => {
    throw new Error(`AYAN_ERROR! Node UUID Passed is not valid. ${ErrorPassed(str)}`);
};

export const ThrowUnidentifiedNodeTypeAccessException = (str = null) => {
    throw new Error(`AYAN_ERROR! The Node Type that was being tried to access is not present. ${ErrorPassed(str)}`);
};

export const ThrowAudioNodeManagerInitializationException = (str = null) => {
    throw new Error(`AYAN_ERROR! ANM initialization error. ${ErrorPassed(str)}`);
};

export const ThrowInvalidBooleanForDispatchException = (str = null) => {
    throw new Error(`AYAN_ERROR! Invalid Boolean Value passed to Redux action Dispatcher. ${ErrorPassed(str)}`);
};

export const ThrowInvalidAudioNodeException = (str = null) => {
    throw new Error(`AYAN_ERROR! Invalid Audio Node Creation Type. ${ErrorPassed(str)}`);
};

export const ThrowPerformOnAudioWrapperException = (str = null) => {
    throw new Error(`AYAN_ERROR! Perform Function On Node Threw an error. ${ErrorPassed(str)}`);
};

export const ThrowScrambledCompilationOrderException = (str = null) => {
    throw new Error(`AYAN_ERROR! Compile Order is different. ${ErrorPassed(str)}`);
};

export const ThrowCompilationFailedException = (str = null) => {
    throw new Error(`AYAN_ERROR! Compilation Failed ${ErrorPassed(str)}`);
};

export const ThrowInvalidPropertyToConnectException = (str = null) => {
    throw new Error(`AYAN_ERROR! Invalid Property to connect to ${ErrorPassed(str)}`);
};

export const ThrowConnectionFailedException = (str = null) => {
    throw new Error(`AYAN_ERROR! Connection Failed! ${ErrorPassed(str)}`);
};

export const ThrowNodeChangeStateFailedException = (str = null) => {
    throw new Error(`AYAN_ERROR! Node Change State Failed! ${ErrorPassed(str)}`);
};

export const ThrowFetchActiveStateFailedException = (str = null) => {
    throw new Error(`AYAN_ERROR! Node Change State Failed! ${ErrorPassed(str)}`);
};
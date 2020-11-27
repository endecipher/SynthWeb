const ErrorPassed = (str) => str ? `Error : ${str}` : "";

export const ThrowOscillatorKeyOutOfBoundsException = (str = null) => {
    throw new Error(`AYAN_ERROR! Oscillator Key not defined. ${ErrorPassed(str)}`);
};

export const ThrowNodeUUIDNotFoundException = (str = null) => {
    throw new Error(`AYAN_ERROR! Node UUID Passed is not valid. ${ErrorPassed(str)}`);
};

export const ThrowUnidentifiedFXChainKeyException = (str = null) => {
    throw new Error(`AYAN_ERROR! FX Chain key passed is not FX1 or FX2. ${ErrorPassed(str)}`);
};

export const ThrowUnidentifiedNodeTypeAccessException = (str = null) => {
    throw new Error(`AYAN_ERROR! The Node Type that was being tried to access is not present. ${ErrorPassed(str)}`);
};

export const ThrowAudioNodeManagerInitializationException = (str = null) => {
    throw new Error(`AYAN_ERROR! ANM initialization error. ${ErrorPassed(str)}`);
};

export const ThrowInvalidAudioNodeException = (str = null) => {
    throw new Error(`AYAN_ERROR! Invalid Audio Node Creation Type. ${ErrorPassed(str)}`);
};

export const ThrowScrambledCompilationOrderException = (str = null) => {
    throw new Error(`AYAN_ERROR! Compile Order is different. ${ErrorPassed(str)}`);
};

export const ThrowFXChainCompilationException = (str = null) => {
    throw new Error(`AYAN_ERROR! Error ocurred while compiling FXChains ${ErrorPassed(str)}`);
};

export const ThrowCompilationFailedException = (str = null) => {
    throw new Error(`AYAN_ERROR! Compilation Failed ${ErrorPassed(str)}`);
};
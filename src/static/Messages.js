import {
    OUTPUT,
    MIN_LENGTH_OF_USER_INPUT
} from '../components/storage/Types';

//Global Structure
export const InvalidConfiguration 
= 'Compilation failed there is some missing information to be added in the .synthweb configuration. ';

export const FinalizeWarnings 
= 'Compilation has succeeded. However the following errors were suppressed: ';

//StructureFormat Messages
export const InvalidStructureFormat 
= 'Compilation failed because the uploaded .synthweb file is not properly defined. ';

//NodeStructure
export const InvalidUserNodeOutput 
= `User Named node cannot be ${OUTPUT}. `;

export const InvalidNodeAsAlreadyExists 
= `The name of the Node already exists in the global configuration. `;

export const InvalidAudioNodeType 
= `Invalid Audio Node encountered. `;

export const InvalidPropertyOfAudioNode 
= `Invalid Property of Audio Node encountered. `;

export const InvalidNodeName
= `Invalid Node Name entered. The Name should be alphanumeric and have minimum ${MIN_LENGTH_OF_USER_INPUT} letters. `;

//AdjacencyList
export const InvalidFromNodeOutput 
= `No connections can be made from the ${OUTPUT} node. `;

export const InvalidNodeForConnection 
= `No connections can be made for the node since it's not defined in the Node Structure. `;

export const InvalidPropertyOfAudioNodeForConnection
= `Invalid Property of Audio Node for Connection encountered. `;

export const InvalidOperationSinceLinkAlreadyExists
= `The Link/Connection is already defined once in the AdjacencyList. `;

//Node Addition
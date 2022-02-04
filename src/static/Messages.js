import {
    OUTPUT
} from '../components/storage/Types';
import { MIN_LENGTH_OF_USER_INPUT } from './GlobalConfigs';

//Global Structure
export const InvalidConfiguration 
= 'Compilation failed as there is some missing information. ';

export const FinalizeWarnings 
= 'Compilation has succeeded. However the following errors were suppressed: ';

//StructureFormat Messages
export const InvalidStructureFormat 
= 'Compilation failed because the configuration is not properly defined. ';

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

export const InitializationException 
= `An exception was thrown and suppressed while the configuration was being parsed.. `;




//File Reading
export const FileReaderError = `Failed to read uploaded file.. `;
export const FileReaderReading = `Reading.. `;
export const FileReaderSuccess = `Uploaded File read successfully! Initializing.. `;
export const FileParseInformationStructureError 
= `Your saved JSON configuration is corrupted as it could not be parsed. Exploring Default Configuration..  `;

import { 
    InvalidMessage,
} from './../../../static/Errors';
import Structure from './Structure';
import EntityNodeFactory from './../EntityNodeFactory';
import { 
    OUTPUT
} from '../Types';
import {
    MIN_LENGTH_OF_USER_INPUT
} from '../../../static/GlobalConfigs';
import ErrorHandler from './ErrorHandler';
import EntityManager from './EntityManager';
import { 
    InvalidStructureFormat, 
    InvalidUserNodeOutput,
    InvalidNodeAsAlreadyExists,
    InvalidAudioNodeType,
    InvalidPropertyOfAudioNode,
    InvalidNodeName,
    InvalidFromNodeOutput,
    InvalidNodeForConnection,
    InvalidOperationSinceLinkAlreadyExists,
    InvalidPropertyOfAudioNodeForConnection,
    InvalidConfiguration
} from '../../../static/Messages';
import GraphInfoManager from './../GraphInfoManager';
import { ERROR } from '../../../redux/actions/alert';

export default class Validator{
    
    /**
     * 
     * @param {EntityManager} manager 
     * @param {GraphInfoManager} graphManager 
     */
    constructor(manager, graphManager){
        this.errorHander = new ErrorHandler();
        this.entityManager = manager;
        this.graphInfoManager = graphManager;
    }

    /**
     * 
     * @param {Object} informationStructure Complex Object describing the NodeStructure and AdjacencyList
     * @returns {Structure} A New structure with Validated Formatting
     */
    ValidateStructure(informationStructure)
    {
        try{
            const {
                NodeStructure,
                AdjacencyList
            } = informationStructure;

            if (NodeStructure && AdjacencyList && NodeStructure.length > 0 && AdjacencyList.length > 0)
            {
                return new Structure(NodeStructure, AdjacencyList);
            }
            else
            {
                this.errorHander.addWarning(InvalidStructureFormat);
                return new Structure();
            }
        }
        catch(err)
        {
            this.errorHander.addWarning(InvalidStructureFormat + err);
            return new Structure();
        }
    }

    /**
     * Checks if Valid Node Item Properties
     * @param {Object} NodeEntityProperties 
     */
    IsValidNodeEntity(NodeEntityProperties, index){
        const {
            name,
            type,
            properties
        } = NodeEntityProperties;

        let isValid = true; 

        if(!Validator.IsUserStringAlphaNumericAndValid(name)){
            isValid = false;
            this.errorHander.addWarning(
                InvalidMessage(InvalidNodeName, `At Position: ${index + 1}`));
        }

        if(name === OUTPUT){
            isValid = false;
            this.errorHander.addWarning(
                InvalidMessage(InvalidUserNodeOutput, `At Position: ${index + 1}`));
        }

        if(this.entityManager.NodeMap.has(name)){
            isValid = false;
            this.errorHander.addWarning(
                InvalidMessage(InvalidNodeAsAlreadyExists, `At Position: ${index + 1}`));
        }

        if(!EntityNodeFactory.getAllTypesOfAudioNodesToAdd().includes(type)){
            isValid = false;
            this.errorHander.addWarning(
                InvalidMessage(InvalidAudioNodeType, `Node: ${name} Type: ${type}`));
        }

        let validProperties = EntityNodeFactory.getValidPropertiesForAudioNodeType(type);

        Object.keys(properties).forEach(key => {
            if(!validProperties.includes(key)){
                isValid = false;
                this.errorHander.addWarning(
                    InvalidMessage(InvalidPropertyOfAudioNode, `Node: ${name} Type: ${type} Property: ${key}`));
            }
        });

        return isValid;
    }

    /**
     * Checks if valid From Adjacency Object
     * @param {Object} adj 
     */
    IsFromValidAdjacency(adj){
        return this.IsValidAdjacency(adj, true);
    }

    /**
     * Checks if valid To Adjacency Object
     * @param {Object} fromAdj 
     * @param {Object} toAdj 
     */
    IsToValidAdjacency(fromAdj, toAdj){
        let isValid = true;

        if(!this.IsValidAdjacency(toAdj, false)){
            return false;
        }

        if(this.graphInfoManager.hasLinkInfo(fromAdj.name, toAdj.name, fromAdj.property, toAdj.property)){
            isValid = false;
            this.errorHander.addWarning(
                InvalidMessage(InvalidOperationSinceLinkAlreadyExists, 
                    `From Node ${fromAdj.name} ${ fromAdj.property ? `'s property - ${fromAdj.property}` : ''} to Node ${toAdj.name} ${ toAdj.property ? `'s property - ${toAdj.property}` : ''}`));
        }

        return isValid;
    }

    /**
     * Check if Valid Adjacency
     * @param {Object} adj 
     * @param {Boolean} isFrom - Signifies whether the name and property of the adjacency object supplied is coming from or going to.
     */
    IsValidAdjacency(adj, isFrom = true){

        const {
            name : nodeName,
            property : audioNodeProperty
        } = adj;

        let isValid = true;

        if(nodeName === OUTPUT && isFrom){
            isValid = false;
            this.errorHander.addWarning(InvalidMessage(InvalidFromNodeOutput));
        }

        if(nodeName !== OUTPUT){
            if(!this.entityManager.NodeMap.has(nodeName)){
                isValid = false;
                this.errorHander.addWarning(InvalidMessage(InvalidNodeForConnection, nodeName));
            }

            let entityType = this.entityManager.NodeMap.get(nodeName).getType();

            if(!Validator.IsValidTypeProperty(entityType, audioNodeProperty)){
                isValid = false;
                this.errorHander.addWarning(
                    InvalidMessage(InvalidPropertyOfAudioNodeForConnection, `Node: ${nodeName} Type: ${entityType} Property: ${audioNodeProperty}`));
            }
        }

        return isValid;
    }

    
    /**
     * @returns {Object} 
     */
    GetMessages(){
        return this.errorHander.getMessages();
    }

    IsCompilationSuccessul(){
        if(this.entityManager.isValid()){
            this.errorHander.finalize();
            return true;
        }else{
            this.errorHander.addError(InvalidMessage(InvalidConfiguration));
            return false;
        }
    }

    /**
     * ##########################################################################
     * Helper Methods Region
     */

    /**
     * Checks if the property specified is Valid of the Type specified
     * @param {String} type 
     * @param {String} property 
     */
    static IsValidTypeProperty(type, property){
        return property == null ? true : EntityNodeFactory.getAvailableConnectsForAudioNodeType(type).includes(property);
    }


    /**
     * To check if the string has atleast 3 letters and is Alpha Numeric. Returns true if valid.
     * @param {String} str 
     */
    static IsUserStringAlphaNumericAndValid = (str) => {
        
        if(str.length < MIN_LENGTH_OF_USER_INPUT)
            return false;
        
        let code, i, len;
      
        for (i = 0, len = str.length; i < len; i++) {
          code = str.charCodeAt(i);
          if (!(code > 47 && code < 58) && 
              !(code > 64 && code < 91) && 
              !(code > 96 && code < 123)) { 
            return false;
          }
        }
        return true;
    };

    /**
     * Returns null if string is empty, else returns the value
     * @param {String} str 
     */
    static GetNullableStringValue = (str) => {
        if(str.length === 0)
            return null;
        else
            return str;
    }

}
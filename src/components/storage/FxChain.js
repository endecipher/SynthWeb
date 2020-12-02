import EntityNodeFactory from './EntityNodeFactory';
import { 
    ThrowNodeUUIDNotFoundException, 
    ThrowScrambledCompilationOrderException, 
    ThrowUnidentifiedFXChainKeyException,
    ThrowUnidentifiedNodeTypeAccessException 
} from '../../static/Errors';
import {
    BIQUADFILTER, CONVOLVER, GAIN, DELAY, DYNAMICSCOMPRESSOR, OSCILLATOR, WAVESHAPER
} from './Types';
import BaseContext from './BaseContext';
import { v4 as uuidv4 } from 'uuid';
import EntityNode from './EntityNode';

/**
 * @deprecated
 * @description DO NOT USE ANYMORE!
 */
export default class FxChain {

    /**
     * 
     * @param {string} str
     * @description Initializes an FxChain with the given Id 
     * @example str could be FX1 or FX2 
     */
    constructor(str){
        this.FxChainId = str;
        this.NodeFactory = new EntityNodeFactory();
        this.TypeIdMap = {
            //Type : UUID
        }
        this.EntityIdMap = {
            //uuid : some EntityNode having our classes in AudioNode
        };
        this.MapEntitiesWithOrder = {
            //1 : uuid
        };
    }

    /**
     * 
     * @param {BaseContext} Context
     * @description Initializes the FxChain 
     */
    initialize(Context) {
        var osc = this.NodeFactory.createNode(Context)(OSCILLATOR);
        let id = osc.getId();
        this.EntityIdMap[id] = osc;
        this.MapEntitiesWithOrder[0] = id;
        this.TypeIdMap[OSCILLATOR] = id;
    }
  
    /**
     * @param {BaseContext} Context 
     * @description Compiles the FxChain
     */
    compile(Context){
        try{
            this.disconnectNodes();

            let previousOrder = 0;
            let previousEntity = null;

            Object.entries(this.MapEntitiesWithOrder).forEach(([keyOrder, valueId]) => {
                if (keyOrder >= previousOrder){
                    let currentEntity = this.EntityIdMap[valueId];
                    if (previousEntity){
                        previousEntity.performFunctionOnNode((previousNode) => {
                            previousNode.connect(currentEntity.getAudioNode());
                        });
                    }
                    previousEntity = currentEntity;
                    previousOrder = keyOrder;
                }
            });

            previousEntity.performFunctionOnNode((previousNode) => {
                previousNode.connect(Context.getAudioContext().destination);
            });
        }catch(err){
            throw err;
        }
    }

    /**
     * @description Disconnects all nodes
     * @returns {void}
     */
    disconnectNodes(){
        Object.entries(this.EntityIdMap).forEach(([key, entity]) => {
            entity.performFunctionOnNode((node) => {
                node.disconnect();
            });
        });
    }

    /**
     * @returns {Object} Object
     * @description Returns the FxChain's Map of Order to UUID
     * @example return { 1 : uuid } 
     */
    getOrder(){
        return this.MapEntitiesWithOrder;
    }

    updateOrder(){
        return (mappedOrder) => {
            //TODO: This will be fired whenever an FX Chain order has been fired

            // mappedOrder = {
            //     1 : uuid2,
            //     2 : uuid1,
            //     3 : uuid3
            // }

            this.MapEntitiesWithOrder = mappedOrder;
        }
    }

    
    /**
     * 
     * @returns { (uuid:string) =>  EntityNode.performFunctionOnNode }  }
     * @description Returns function which accepts uuid and returns 
     * performFunctionOnNode() from mapped EntityNode
    */
    performFunction(){
        return (uuidId) => {
            try{
                return this.EntityIdMap[uuidId].performFunctionOnNode;
            }catch(err){
                ThrowNodeUUIDNotFoundException(err);
            }
        }
    }

    /**
     * 
     * @param {string} nodeType
     *  
     */
    getIdForType(nodeType){
        try{
            return this.TypeIdMap[nodeType];
        }catch(err){
            ThrowUnidentifiedNodeTypeAccessException(err);
        }
    }
}
import BaseContext from './BaseContext';
import FxChain from './FxChain';
import { FX1, FX2 } from './Types';
import { ThrowUnidentifiedFXChainKeyException, ThrowFXChainCompilationException } from '../../static/Errors';
import { Initialize } from './nodemanager/InitializeNodeManager';

export default class AudioNodeManager {

    constructor() {
        this.Context = new BaseContext();
        this.FxChains = {
            [FX1] : new FxChain(FX1),
            [FX2] : new FxChain(FX2)
        };

        Initialize(this);
        Object.entries(anm.FxChains).forEach(([key, chain]) => {
            chain.initialize(this.Context);
        });
    }
  
    /**
     * 
     * @param {string} FxChainId 
     */
    perform(FxChainId){
        if(this.validateFxChainId(FxChainId)){
            return this.FxChains[FxChainId].performFunction();
        }
    }

    updateGlobalOrder(newStateOrder){
        let fx1Order = newStateOrder[FX1];
        let fx2Order = newStateOrder[FX2];

        if(fx1Order){
            this.updateOrderOnChain(FX1)(fx1Order);
        }

        if(fx2Order){
            this.updateOrderOnChain(FX2)(fx2Order);
        }        
    }

    updateOrderOnChain(FxChainId){
        if(this.validateFxChainId(FxChainId)){
            return this.FxChains[FxChainId].updateOrder();
        }
    }

    compile(){
        try{
            this.FxChains[FX1].compile(this.Context);
            this.FxChains[FX2].compile(this.Context);

            return true;
        }catch(err){
            ThrowFXChainCompilationException(err);
        }
    }

    /**
     * @returns {Object} 
     * @description Returns the 
     */
    getGlobalStateOrder(){
        return {
            [FX1] : this.FxChains[FX1].getOrder(),
            [FX2] : this.FxChains[FX2].getOrder()
        }
    }

    /**
     * 
     * @param {string} FxChainId 
     * @param {string} NodeType
     * @description NodeType refers to constant strings such as OSCILLATOR, etc 
     */
    getUniqueId(FxChainId, NodeType){
        if(this.validateFxChainId(FxChainId)){
            return this.FxChains[FxChainId].getIdForType(NodeType);
        }
    }

    /**
     * 
     * @param {string} FxChainId 
     * @returns {boolean} 
     * @description Checks whether FxChainId is valid or not
     */
    validateFxChainId = (FxChainId) => {
        if(FxChainId){
            switch(FxChainId){
                case FX1:
                case FX2:
                    return true;
                default:
                    ThrowUnidentifiedFXChainKeyException();
            }
        }

        return false;
    }
}
import EntityNode from './../EntityNode';

export default class EntityManager {
    constructor() {

        /**
         * @type {Map<string, EntityNode>} Key: unique name as string Value: EntityNode 
         */
        this.NodeMap = new Map();
        this.NodeStructure = [];
        this.AdjacencyList = [];
    }

    /**
     * Clears all properties
     * @returns {void}
     */
    clear(){
        this.NodeMap.clear();
        this.NodeStructure.length = 0;
        this.AdjacencyList.length = 0;
    }

    /**
     * Checks if the new Information Structure has Valid Entities
     * @returns {Boolean} 
     */
    isValid(){
        return this.NodeMap.size > 0 && this.NodeStructure.length > 0 && this.AdjacencyList.length > 0;
    }
}
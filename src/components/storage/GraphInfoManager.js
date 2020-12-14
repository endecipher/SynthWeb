export default class GraphInfoManager {
    constructor(){
        this.GraphNodes = [];
        this.GraphLinks = [];
        this.LinkInfoDelimiter = "_";

        /**
         * @type {Map<String, Array>}
         * 
         * @description For each unique key, it will contain the array of { fromProperty, toProperty }
         * The Map's key format is as such: `${Source}${LinkInfoDelimiter}${Target}`
         */
        this.GraphLinkInfo = new Map();
    }


    /**
     * Add a new NodeName to GraphNodes
     * @param {String} nodeObject
     */
    addNewGraphNode(nodeName){
        this.GraphNodes.unshift({
            id : nodeName
        });
    }

    /**
     * Adds Graph Links and property connecting information
     * @param {String} source - Source NodeName
     * @param {String} target - Target NodeName
     * @param {String} source - Source Node Property
     * @param {String} target - Target Node Property
     */
    addNewGraphLinkInfo(sourceNodeName, targetNodeName, sourceProperty, targetProperty){

        const appendLinkInfo = (key, sourceProperty, targetProperty) => {
            this.GraphLinkInfo.set(key, [
                ...this.GraphLinkInfo.get(key),
                {
                    from : sourceProperty,
                    to : targetProperty
                }
            ])
        }

        let key = sourceNodeName.concat(this.LinkInfoDelimiter, targetNodeName);

        if(!this.GraphLinkInfo.has(key)){
            this.GraphLinks.unshift({
                source : sourceNodeName,
                target : targetNodeName
            });
        }

        appendLinkInfo(key, sourceProperty, targetProperty);
    }

    /**
     * Checks if Graph Link is present
     * @param {String} source - Source NodeName
     * @param {String} target - Target NodeName
     * @param {String} source - Source Node Property
     * @param {String} target - Target Node Property
     */
    hasLinkInfo(sourceNodeName, targetNodeName, sourceProperty, targetProperty){

        let key = sourceNodeName.concat(this.LinkInfoDelimiter, targetNodeName);

        if(!this.GraphLinkInfo.has(key))
            return false;

        if(this.GraphLinkInfo.get(key)
            .filter(info => info.from == sourceProperty && info.to == targetProperty).length == 0)
            return false;

        return true;
    }

    /**
     * Clears all Graph Plotting Information
     */
    clearAll(){
        this.GraphNodes.length = 0;
        this.GraphLinks.length = 0;
        this.GraphLinkInfo.clear();
    }

    /**
     * Returns the Input formatted as towards the React D3 Graph
     */
    getGraphicalData(){
        return {
            nodes : this.GraphNodes,
            links : this.GraphLinks
        };
    }

    /**
     * Returns the GraphLinkInfo Map where link information is further described.
     */
    getLinkInformation(){
        return this.GraphLinkInfo;
    }
}
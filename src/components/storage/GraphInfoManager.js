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

        const appendLinkInfo = (graphLinkInfo, key, sourceProperty, targetProperty) => {
            
            graphLinkInfo.set(key, [
                ...(graphLinkInfo.get(key) ?? []),
                {
                    from : sourceProperty,
                    to : targetProperty
                }
            ])
        }

        let key = sourceNodeName.concat(this.LinkInfoDelimiter, targetNodeName);

        if(!this.GraphLinkInfo.has(key)){
            this.GraphLinks.push({
                source : sourceNodeName,
                target : targetNodeName
            });
        }

        appendLinkInfo(this.GraphLinkInfo, key, sourceProperty, targetProperty);
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

    /**
     * 
     * @param {String} source 
     * @param {String} target 
     * @returns {String} User Readable String to display on click of Graph Link
     */
    getConnectingLinks(source, target){
        let key = source.concat(this.LinkInfoDelimiter, target);

        if(!this.GraphLinkInfo.has(key))
            return null;

        let propertyArray = this.GraphLinkInfo.get(key);

        let returnString = `Accessed Link:  \n`;

        propertyArray.forEach((detail, index) => {
            let fromPropertyString = detail.fromProperty ? `.${detail.fromProperty}` : ``;
            let toPropertyString = detail.toProperty ? `.${detail.toProperty}` : ``;
            returnString = returnString.concat(`${index+1} - Connected ${source}${fromPropertyString} to ${target}${toPropertyString}\n`);
        });

        return returnString;
    }
}
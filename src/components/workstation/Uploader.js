import React, { useState, useRef, Fragment } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    exploreDefault
} from './../../redux/actions/combinedActions';
import Button from 'react-bootstrap/Button';
import {
    setAlert,
    SUCCESS,
    PRIMARY,
    ERROR
} from './../../redux/actions/alert';
import { FileReaderError, FileReaderSuccess, FileReaderReading, FileParseInformationStructureError } from './../../static/Messages';
import AudioNodeManager from './../storage/AudioNodeManager';


const Uploader = ({
    anm,
    exploreDefault,
    setAlert
}) => {

    const [uploadedFileName, setUploadedFileName] = useState(null);
    const inputRef = useRef(null);

    const handleUpload = () => {
        inputRef.current?.click();
    };

    const handleDisplayFileDetails = () => {
        if (inputRef.current?.files){
            var file = inputRef.current.files[0];
            setUploadedFileName(file.name);
            const reader = new FileReader();
            reader.onerror = function(e) {
                setAlert(FileReaderError + reader.error, ERROR);
            };
            reader.onloadend = function () {
                if(reader.readyState == 2){
                    setAlert(FileReaderSuccess, SUCCESS);
                    var filetext = reader.result;
                    parseFileTextAndInitialize(filetext);
                }else{
                    setAlert(FileReaderReading, PRIMARY);
                }
            };
            reader.readAsText(file);
        }        
    };

    /**
     * Convert the fileText read to an InformationStructure for compilation
     * @param {String} filetext 
     */
    const parseFileTextAndInitialize = (filetext) => {

        let infoStructure = {
            nodeStructure : [],
            adjacencyList : []
        };

        /**
         * @type {AudioNodeManager}
         */
        let audioNodeManager = anm.current;

        try {
            infoStructure = JSON.parse(filetext);
        }
        catch(err){
            setAlert(FileParseInformationStructureError + err, ERROR);

            anm.current.initializeAudioNodeManager();
            const {
                NodeStructure,
                AdjacencyList
            } = anm.current.getInformationStructure();
            exploreDefault(NodeStructure, AdjacencyList);
            return;
        }

        let compileInfo = audioNodeManager
                .initializeAudioNodeManager(infoStructure.nodeStructure, infoStructure.adjacencyList);

        if (!compileInfo.hasCompilationFailed)
        {
            let informationStructure = audioNodeManager.getInformationStructure();
            exploreDefault(informationStructure.NodeStructure, informationStructure.AdjacencyList);
            return;
        }

        compileInfo.messages.forEach(message => {
            setAlert(message.msg, message.type);
        });
    };

    const uploadText = () => {
        return (
            <Fragment>
                <i className="fa fa-file-text-o" aria-hidden="true"></i>
                <span className="padLeft">Read your saved configuration!</span>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <input
                ref={inputRef}
                accept=".txt"
                onChange={handleDisplayFileDetails}
                style={{ display: "none" }}
                type="file"
                value=""/>
            <Button size="lg" key="upload" variant={uploadedFileName ? "success" : "primary"} onClick={(e) => handleUpload(e)}>
                {uploadedFileName ? uploadedFileName : uploadText()}
            </Button>
        </Fragment>
    )
}

Uploader.propTypes = {
    anm : PropTypes.object.isRequired,
    exploreDefault : PropTypes.func.isRequired,
    setAlert : PropTypes.func.isRequired,
}

export default connect(null, {
    exploreDefault,
    setAlert
})(Uploader)

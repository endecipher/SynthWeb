import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import AudioNodeManager from '../../../storage/AudioNodeManager';

const ExportAll = ({
    anm,
    nodeStructure,
    adjacencyList
}) => {

    const fetchInformationStructure = (e) => {
        
        /**
         * @type {AudioNodeManager}
         */
        let audioNodeManager = anm.current;
        
        let nodeStructureCopy = []

        nodeStructure.forEach(element => {
            nodeStructureCopy.push(audioNodeManager.fetchNodeActiveState(element.name))
        });

        let informationStructure = {
            nodeStructure : nodeStructureCopy,
            adjacencyList
        };

        return (
            <Fragment>
                {JSON.stringify(informationStructure, null, 5)}
            </Fragment>
        )
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Fragment>
        <Button
            key="exportAll"
            variant="success"
            name="exportAll"
            onClick={(e) => handleShow(e)}
        >
            <i className="fa fa-file-export"></i>
        </Button>
        {
            show ? 
            <div className="informationStructureModal">
            <Modal.Dialog centered scrollable size="lg">
                <Modal.Header>
                    <Modal.Title>Save your progress in a .txt file and reupload to resume!</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <code>{fetchInformationStructure()}</code>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={(e) => handleClose(e)}>Understood</Button>
                </Modal.Footer>
            </Modal.Dialog>
            </div>
            : null
        }
        </Fragment>
    );
}

ExportAll.propTypes = {
    nodeStructure : PropTypes.array.isRequired,
    adjacencyList : PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
    nodeStructure : state.audioNodeManager.nodeStructure,
    adjacencyList : state.audioNodeManager.adjacencyList,
});

export default connect(mapStateToProps, {  })(ExportAll);

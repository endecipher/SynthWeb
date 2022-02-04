import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

const PropertyButtonGroup = ({
    optionArray,
    selectedValue,
    eventHandler
}) => {

    const [selectedOption, changeSelectedOption] = useState(selectedValue);

    return (
        <ButtonGroup className="ptyBtnGroup" aria-label="Type">
            {
                optionArray.map((typeString) => (
                    <Button 
                        className={`ptyBtnOption ${selectedOption === typeString ? 'selected' : ''}`}
                        name={typeString}
                        key={typeString}
                        onClick={(e) => {
                            changeSelectedOption(typeString);
                            eventHandler(typeString);
                        }}>
                        <span>{typeString}</span>
                    </Button>
                ))
            }
        </ButtonGroup>
    )
}

PropertyButtonGroup.propTypes = {
    optionArray: PropTypes.array.isRequired,
    selectedValue: PropTypes.string.isRequired,
    eventHandler : PropTypes.func.isRequired,
}

export default PropertyButtonGroup

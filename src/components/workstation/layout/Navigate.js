import React from 'react';

const Navigate = ({
    
}) => {

    return (
        <nav className="navbar bg-dark customNav">        
            <h1>
                <i className="fa fa-keyboard-o"></i>
                <span>SynthWeb</span>
            </h1>
            <ul>
                <li>
                    <i className="fa fa-rocket"></i> 
                    <span>Explore Below!</span>
                </li>
            </ul>
        </nav>
    )
}

Navigate.propTypes = {
};

export default Navigate


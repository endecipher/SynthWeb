import React, { Fragment, useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';


const Knob = ({
    properties,
    eventHandler,
    styling
}) => {   
    
    const {
        min,
        max,
        value,
        name
    } = properties;

    const R2D = 180 / Math.PI;
    const normalizeRotation = (degrees) => {
        const angle = degrees % 360;
        return angle < 0 ? angle + 360 : angle;
    }

    const stateInfo = useRef({
        active : false,
        angle : 0,
        rotation : 0,
        startAngle : 0,
        center : {
            x: 0,
            y: 0
        },
    });

    const [rotationalState, changeRotation] = useState({
        angle : 0,
        rotation : 0,
    }); 

    const [computedValue, reComputeValue] = useState(value); 
    /**
     * To be executed once at the start. Initialize the starting angle of the Knob.
     */
    useEffect(() => {
        
        let initialAngle = 360 * (value/(max - min));
        
        stateInfo.current.angle = initialAngle;
        stateInfo.current.rotation = initialAngle;

        changeRotation({
            angle : initialAngle,
            rotation : initialAngle
        });
    }, [value, max, min])

    /**
     * Event handler passed as props will be executed whenever the rotation stops, 
     * and isActive is false.
     */
    useEffect(() => {
        if(!stateInfo.current.active){
            const finalDegree = normalizeRotation(rotationalState.angle);
            console.log(`Final Angle ${finalDegree}`);
            let reComputedValue = (finalDegree / 360) * (max - min);
            eventHandler([name], reComputedValue);
            reComputeValue(reComputedValue);
        }
    }, [rotationalState.angle, eventHandler, name, max, min])

    const rotator = (event) => {
        if (stateInfo.current.active === true) {
            event.preventDefault();
            var x = event.clientX - stateInfo.current.center.x,
                y = event.clientY - stateInfo.current.center.y,
                d = R2D * Math.atan2(y, x);
            stateInfo.current.rotation = d - stateInfo.current.startAngle;
            console.log(`Rotating StartAngle: ${stateInfo.current.startAngle} SAng:${stateInfo.current.angle} SRot:${stateInfo.current.rotation} Angle:${rotationalState.angle} Rot:${rotationalState.rotation}`)
            changeRotation({
                ...rotationalState,
                rotation: (stateInfo.current.angle + stateInfo.current.rotation)
            });
        }
    }

    const stopper = (event) => {
        event.preventDefault();
        if(stateInfo.current.rotation !== 0)
        {
            console.log(`Stopping SAng:${stateInfo.current.angle} SRot:${stateInfo.current.rotation} Angle:${rotationalState.angle} Rot:${rotationalState.rotation}`)
            stateInfo.current.angle += stateInfo.current.rotation;
            changeRotation({
                ...rotationalState,
                angle : stateInfo.current.angle % 360,
            });
        }
        stateInfo.current.active = false;
        stateInfo.current.rotation = 0;
        return false;
    }

    const start = function(e) {
        e.preventDefault();
        var bb = e.target.getBoundingClientRect(),
          t = bb.top,
          l = bb.left,
          h = bb.height,
          w = bb.width;
        stateInfo.current.center = {
          x: l + (w / 2),
          y: t + (h / 2)
        };
        let x = e.clientX - stateInfo.current.center.x;
        let y = e.clientY - stateInfo.current.center.y;
        stateInfo.current.startAngle = R2D * Math.atan2(y, x);
        stateInfo.current.active = true;
        return true;
    };
   
    return (
        <Fragment>
            <div className={`knobcontainer`} onMouseMove={(e) => rotator(e)} onMouseUp={(e) => stopper(e)}>
                <div className={`knobdraggable`}>
                    <div className={`knobrotate ${styling}`} onMouseDown={(e) => start(e)} 
                        style={
                            {
                                transform: `rotate(${rotationalState.rotation}deg)`,
                                WebkitTransform : `rotate(${rotationalState.rotation}deg)`
                            }
                        }>
                    </div>
                    <div className={`knobdrag ${styling}`}>
                        <span className={`knobdragspan ${styling}`}>{Math.round(computedValue * 100) / 100}</span>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

Knob.propTypes = {
    styling : PropTypes.string.isRequired,
    eventHandler : PropTypes.func.isRequired,
    properties : PropTypes.object.isRequired,
}

export default Knob;

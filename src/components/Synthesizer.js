import React, { Fragment } from 'react';
import Navigate from './workstation/layout/Navigate';
import Alert from './workstation/Alert';
import AudioContext from './workstation/AudioContext';
import { Container, Row, Col } from 'react-bootstrap';

const Synthesizer = props => {
    return (
        <div className="omni">
            <Navigate/>
            <Container className="mainContainer">
                <Alert/>
                <AudioContext/> 
            </Container>
        </div>    
    )
}

/*

Visualization:
--Idea Scrapped. 
--Too much of a less scope for change. 
--Users wil get bored unless they themselves are able to change configuration.
--Allow dynmaic export of configuration

------------------------------------------------------------------
 Menu - Properties/Help - Key Mappings to frequencies - Other
------------------------------------------------------------------
Oscillator1                 | Osc1/2 FXChain |  FX Properties
                            |----------------|
Properties                  |___Reverb_____ #|  Define properties 
----------------------------|___Delay _____ #|      & widgets
Oscillator2                 |___Gain  _____ #|
                            |___Sweep______ #|
Properties                  |___Scroll_____ #|
----------------------------|--------------------------------------
    LFO1    |   LFO2    |   Mixer (Opens hovering component)
-------------------------------------------------------------------
    Keys highlighted when somekey pressed (dynamically update)
-------------------------------------------------------------------

Before a key gets pressed (i.e make a specific functionality to expose 
    keys component to signify it's okay to play now once connected), we need to build the audio chain (Connect it)
Once done, automatically, whenever a key gets pressed, the oscillators start to play with the proper frequency from key mappings.


--New Plan
------------------------------------------------------------------
 Menu - Properties/Help - Key Mappings to frequencies - Other
------------------------------------------------------------------

    O------>O------>O-------->O
            |       |
    O-------|       |   //BAsically have a graph present which can be modified (Allow users to create FX Chains)
                    |
    O---------------|

----------------------------|--------------------------------------
    LFO1    |   LFO2    |   Mixer (Opens hovering component)
______TOGGLE BETWEEN SHOWING PROPERTIES OF A CLICKED GRAPH NODE AND THE KEYBOARD____
    Allow Starting Molded Oscillators to play whenever a key is hit.
-------------------------------------------------------------------

*/

Synthesizer.propTypes = {

}

export default Synthesizer;


/*


Okay, now that we're getting into the Redux part, it's best to make sure the plan is set

values : {
    hasColdStarted : true
    showKeyboard : false
    hasValuesChanged : true
    hasCompiled: false
}

activeState : {
    details : {

    }
}

audioNodeManager : {
    nodeStructure : [],
    adjacencyList : []
}

Synthesizer
    AudioContext
        --This Component will create a new AudioNodeManager (ANM) object and hold it to pass to all child Comps.
        --ANM will be uninitialized
        --If hasColdStarted === true
        --  render the Home Component
        --Else if hasColdStarted === false  
        --  if hasCompiled === true
        --      render the AudioGraph and ResponsiveTransform
        --  Else
        --      render Spinner for Compiling.....
        Home
            --Allow user to choose one from below:
            --1) Upload .synthweb file via Uploader
            --2) Explore a default configuration
            Uploader
                --TODO://////
            ExploreDefault
                --##################
                --No MapStateToProps, only MapDispatchToProps. Receive a newly created ANM (Uninitialized) from props. 
                --Call ANM.Initialize() without passing any NodeStructure/AdjacencyList
                --Once ANM has initialized everything properly, do the following -> (Maybe try to encompass the below as a combined thing to do, since Uploader will also use it)
                -->) Dispatch hasColdStarted : false
                --1) Dispatch NodeStructure from ANM
                --2) Dispatch AdjacencyList from ANM
                --3) Dispatch hasValuesChanged as false
                --4) Dispatch activeState.details as Null
                --5) Dispatch showKeyboard as true
                --6) Finally, dispatch hasCompiled: true
                --##################
        AudioGraph 
            DynamicNodeChanger
                --######################
                --This component will allow the users to add or delete nodes
                --It will receive the ANM
                --It will have 2 buttons for [+] and [-]
                --On click of any of the above two, a new panel will be visible 
                --This component's internal state will have isActive as null, Add or Delete
                --If isActive has value then 
                --a) show the desired panel with confirmation button (Submit)
                --b) show another button [X] to close and change the internal state isActive to null
                --Else don't show anything
                Add
                    --##########
                    --This component will be subscribed to Redux NodeStructure and AdjacencyList
                    --[+] To add node, the component will allow the user to mention the following:
                    --1) The Name of the Node (Must be unique) (User Provided)
                    --2) The Type of the Node (Dropdown)
                    --3) From Connection (Optional)
                        --a) The Name of the Node (Dropdown)
                        --b) If name of the node ain't empty, then choose the available connect (Dropdown)
                    --4) To Connection (Mandatory)
                        --a) The Name of the node (Dropdown)
                        --b) If name of the node ain't empty, then choose the available connects/OUTPUT (Dropdown)
                    --5) The component will allow dynamic dropdowns for the name of the nodes and connects
                    --6) There should be proper validation on Submit, else alert should be raised
                    --7) If everything goes well, do the following:
                        --a) Use ANM to fetch the default details of the newly added node 
                        --b) Unshift Node to NodeStructure array
                        --c) Loop through links and add the proper To and From Connects
                        --d) dispatch new NodeStructure with added Node
                        --e) dispatch new AdjacencyList with added links
                        --f) dispatch hasCompiled: false
                    --##########
                Delete
                    --##########
                    --[-] To Delete a node
                    --1) A dropdown will allow the user to delete an already present node
                    --2) On click of Submit the following should occur
                        --a) Filter existing NodeStructure to remove selected Node
                        --b) Filter existing links from Adjacency Structure
                        --c) dispatch new NodeStructure 
                        --d) dispatch new AdjacencyList 
                        --e) dispatch hasCompiled: false
                    --##########
                --######################

            GraphPlotter
                --######################
                --This component will accept the ANM as props
                --It will plot the graph div
                --Clicking on any node will do the following:
                --1) change redux activeState.details to the current node's properties 
                --2) dispatch showKeyboard : false
                --#####################
            NodeValueChanger
                --#######################
                --This will be subscribed to hasValuesChanged
                --If hasValuesChanged === true
                --  it will take the redux activeState.details, and use it to call performFunctionOnNode (using ANM ref)
                --  it will then dispatch hasValuesChanged : false
                --######################
            InputCutoff
                --#######################
                --This will be subscribed to showKeyboard.
                --If showKeyboard === false
                --  it will call ANM.stopAllInputs() which will make the Input Oscillators.stop()
                --######################
            Compile (a.k.a Initialize From scratch)
                --#######################
                --The Only place where ANM's Re-Compile can be performed
                --This component will be subscribed to the redux states ANM NodeStructure and ANM AdjacencyList and hasCompiled
                --If NodeStructure !== [] and AdjacencyList !== [] and hasCompiled === false do the following
                --1) Call ANM.Initialize(NodeStructure, AdjacencyList) //Both taken from redux
                --2) Wait for the above, if any errors, throw Alerts
                --3) Dispatch hasValuesChanged as false
                --4) Dispatch activeState.details as Null
                --5) Dispatch showKeyboard as true
                --6) Finally, dispatch hasCompiled: true
        ResponsiveTransform
            --##################
            --This component will be subscribed to showKeyBoard.
            --If showKeyboard === false 
            --  it will render the AudioProperties
            --  it will also render a button to "Show Keyboard" which when clicked, will dispatch showKeyboard: true
            --Else 
            --  it will render Keyboard.
            --##################
            AudioProperties
                --####################
                --This component will NOT receive ANM
                --This component will be subscribed to activeState.details
                --If activeState.details === null
                --  then don't render the child components, instead render showing, click on the Graph Plot to modify a node
                --Else
                --  Then Conditionally render the Type of component mentioned in the activeState.details 
                --#####################
                Conditionally render Oscillator
                Conditionally render Gain
                Conditionally render All other Components
                    --###################
                    --For this context, ECCR = Each Component Conditionally Rendered
                    --ECCR will receive Props as the activeStateDetails
                    --ECCR will not have access to mapStateToProps
                    --ECCR will only have mapDispatchToProps 
                    --ECCR will have a local useState and set to the activeState.details taken from the props
                    --ECCR will allow the user to change the properties of the Audio Node in the useState.
                    --Whenever this component gets to unmount, do the following:
                    --If not same, then on unmount (as told above), we will do the following:
                    --1) dispatch ANM hasValuesChanged : true
                    --2) wait until the above is done (How? Check Promises), i.e hasValuesChanged turns to false automatically from NodeValueChanger
                    --###################
            Keyboard
                --#######################
                --This component will show a KeyBoard and will handle KeyPresses
                --Whenever a key is pressed, the Inputs Oscillators get activated. (Call using ANM)
                --Whenever a key is upped, the Input Oscillators stop.
                --As Part of new features, it's imperative to think about the following:
                --1) Changeable Key Bindings
                --2) Dynamic User Input Delegates to be added so that not only Input Oscillators can be controlled.
                --#######################













*/

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ERROR, INFORMATION, PRIMARY, SUCCESS, WARNING } from '../../redux/actions/alert';

const Alert = ({
    alerts
}) => {

    const getAlertIcon = (alertType) => {
        switch(alertType){
            case PRIMARY:
            case INFORMATION:
                return (
                    <i className="fa fa-info" aria-hidden="true"></i>
                );
            case WARNING:
                return (
                    <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
                )
            case ERROR:
                return (
                    <i className="fa fa-bug" aria-hidden="true"></i>
                )
            case SUCCESS:
                return (
                    <i className="fa fa-magic" aria-hidden="true"></i>
                )
            default:
                return (
                    <i className="fa fa-ban" aria-hidden="true"></i>
                )
        }
    }

    let hasAlerts = 
    alerts !== null 
      && alerts.length > 0;
        
    let returnMessage = "";  

    if(hasAlerts){
        returnMessage = alerts.map(alert => (
            <div key={alert.id} className={`alert alert-${alert.alertType}`}>
               {alert.alertType.toUpperCase()}{` `}{getAlertIcon(alert.alertType)}{` `}{alert.msg}
            </div>
        ));
    }

    return (
        <Fragment>
            {returnMessage}
        </Fragment>
    );
};

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps, null)(Alert)

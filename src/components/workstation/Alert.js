import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({
    alerts
}) => {

    let hasAlerts = 
    alerts !== null 
      && alerts.length > 0;
        
    let returnMessage = "";  

    if(hasAlerts){
        returnMessage = alerts.map(alert => (
            <div key={alert.id} className={`alert alert-${alert.alertType}`}>
               {alert.alertType} {alert.msg}
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

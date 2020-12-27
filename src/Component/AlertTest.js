import React, { Component } from 'react';
import { Alert, AlertContainer } from "react-bs-notifier";
import { connect } from 'react-redux';

class AlertTest extends Component {
    render() {
        // console.log(this.props.alertCheck);
        if (!this.props.state.alertCheck) return null
        return (

            <AlertContainer>
                {/* timeout là thời gian tự kích hoạt onDismiss */}
                <Alert onDismiss={() => { this.props.handle() }} timeout={500} type={this.props.state.alertColor}><h5>{this.props.state.alertContent}</h5></Alert>
            </AlertContainer>


        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        state: state.all
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handle: () => {
            dispatch({ type: "OFF ALERT" })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertTest)
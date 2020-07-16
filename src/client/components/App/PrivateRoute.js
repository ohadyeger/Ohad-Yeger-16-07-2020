import React from "react";
import AppActions from "./actions"
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import Cookies from 'js-cookie';

class PrivateRoute extends React.Component{

    // componentWillUpdate(){
    //     const { page_permissions } = this.props
    //     //this.props.authenticate( { page_permissions })
    // }

    componentWillUpdate(nextProps, nextState, nextContext) {
    }

    constructor(props) {
        super(props);
    }

    render() {
        const { component: Component, ...rest } = this.props;
        return (
            <Route {...rest} render={(props) => (
                this.props.login_status === 1?
                    this.props.page_permissions <= this.props.permissions ? <Component {...props} /> :
                        <p>you dont have permissions.</p> :
                    this.props.login_status === -1?
                   <Redirect to='/login' />:
                        <label>Loading...</label>
            )} />

        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        login_status: state["authenticationForm"].get("login_status"),
        permissions: state["authenticationForm"].get("permissions")
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: (page_permissions) => dispatch(AppActions.authenticate(page_permissions))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)
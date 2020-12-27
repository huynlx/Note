import React, { Component } from 'react';
import { connect } from 'react-redux';
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     a
// } from "react-router-dom";

class Nav extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-dark" style={{ backgroundColor: 'black' }}>
                <a className="navbar-brand" href="/">Note</a>
                <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation"><i className="fa fa-bars" aria-hidden="true" /></button>
                <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavId">
                    <ul className="navbar-nav  mt-2 mt-lg-0">
                        {/* <li className="nav-item active">
                            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                        </li> */}
                        <li className="nav-item">
                            <a className="nav-link" href='/' onClick={(e) => { e.preventDefault();this.props.add() }}>Thêm nội dung</a>
                        </li>
                        {/* <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/" id="dropdownId" data-toggle="dropdown" aria-expanded="false">Dropdown</a>
                            <div className="dropdown-menu" aria-labelledby="dropdownId" style={{minWidth:"unset"}}>
                                <a className="dropdown-item" href="/">Action 1</a>
                                <a className="dropdown-item" href="/">Action 2</a>
                            </div>
                        </li> */}
                    </ul>
                </div>
            </nav>
        );
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        add: () => {
            dispatch({ type: "CLICK_ADD" })
        }
    }
}
export default connect(null, mapDispatchToProps)(Nav)
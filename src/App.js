import React, { Component } from 'react';
import './App.css';
import Nav from './Component/Nav';
import Content from './Component/Content';
import Form from './Component/Form';
import * as firebase from './firebase';
import { nodeData } from './firebase';
import { connect } from 'react-redux';
import AlertTest from './Component/AlertTest';
// validate required input form thêm


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: true
    }
  }






  render() {
    const mystyle = {
      paddingLeft: "50px",
      paddingRight: "50px"
    };
    // console.log(this.props.state);
    return (
      <div className="App">
        <AlertTest></AlertTest>
        <Nav></Nav>
        <div className="container mt-3" style={mystyle}>
          <div className="row">
            <Content></Content>
            <Form></Form>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    state: state
  }
}


export default connect(mapStateToProps)(App)

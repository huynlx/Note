import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import dl from './Data.json';
import { nodeData } from './../firebase';
import { connect } from 'react-redux';


class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentWillMount() {//chay 1 lan
        nodeData.once('value').then((snapshot) => {
            var item = [];
            snapshot.forEach(element => {
                const key = element.key;
                const title = element.val().title;
                const content = element.val().content;
                item.push({
                    key: key,
                    title: title,
                    content: content
                })
            });
            // console.log(item);
            this.setState({
                data: item
            })
            console.log(this.props.state.all);
        })
    }
    componentWillReceiveProps(nextProps, nextState) {
        // console.log(this.props.state.all.edit);
        // console.log(this.props.state.edit);
        nodeData.once('value').then((snapshot) => {
            var item = [];
            snapshot.forEach(element => {
                const key = element.key;
                const title = element.val().title;
                const content = element.val().content;
                item.push({
                    key: key,
                    title: title,
                    content: content
                })
            });
            // console.log(item);
            this.setState({
                data: item
            })
        })
    }

    doIt(value) {
        this.props.edit(value.title, value.content, value.key);
        // var item = {};
        // item.title=value.title;
        // item.content=value.content;
        // this.props.confirmEdit(item, value.key);
    }

    getData() {
        var x = [];
        this.state.data.forEach(element => {
            x.push(element);
        });
        // console.log(x);
        return x.map((value, index) => {
            return (<div className="card" key={index}>
                <div className="card-header" role="tab" id="section1HeaderId">
                    <h5 className="mb-0 d-flex flex-sm-row flex-column justify-content-between">
                        <a className='my-auto  text-md-left text-center' data-toggle="collapse" data-parent="#accordianId" href={"#section" + index + "ContentId"} aria-expanded="true" aria-controls={"section" + index + "ContentId"}>
                            {value.title}</a>
                        <div className="btn-group mt-2 mt-md-0">
                            <button className='btn btn-primary' onClick={() => this.doIt(value)}>Edit</button>
                            <button className='btn btn-danger' onClick={() => { if (window.confirm('Are you sure to delete this row?')) {this.props.alert('XOÁ "' + value.title + '" THÀNH CMN CÔNG', 'danger'); this.props.del(value.key);  }; }}>Delete</button>
                        </div>
                    </h5>

                </div>
                <div id={"section" + index + "ContentId"} className="collapse in" role="tabpanel" aria-labelledby="section1HeaderId">
                    <div className="card-body">
                        {value.content}
                    </div>
                </div>
            </div>)
        })

    }

    render() {
        console.log('content');
        // console.log(this.state.data);
        // console.log('day la content');
        // console.log(this.props.state.all);
        return (
            <div className="col-md col-12 order-md-1 order-2">
                <div id="accordianId" role="tablist" aria-multiselectable="true">
                    {
                        this.getData()
                    }
                </div>
                {/* {
                    this.getFormEdit()
                } */}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        state: state
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        edit: (title, content, key) => {
            dispatch({ type: "CLICK_EDIT", title: title, content: content, key: key })
        },
        del: (key) => {
            dispatch({ type: "DEL DATA", key: key })
        },
        confirmEdit: (item, key) => {
            dispatch({ type: "CONFIRM_EDIT", item: item, key: key })
        },
        alert: (alertContent, color) => {
            dispatch({ type: "ON ALERT", alertContent: alertContent, color })
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Content)
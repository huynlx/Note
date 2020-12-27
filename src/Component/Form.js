import React, { Component } from 'react';
import { nodeData } from './../firebase';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import database from 'firebase/database';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: ''
        }
        //đéo hiểu set state = props lấy từ store kiểu gì
    }

    componentWillReceiveProps(nextProps) {
        console.log('receive props');
        this.setState({
            title: nextProps.state.all.title,
            content: nextProps.state.all.content,
            key: nextProps.state.all.key
        })
    }





    checkInput = (event) => {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ //lưu onchange
            [name]: value
        })
    }
    checkSubmit(e) {
        var item = {};
        item = this.state;
        // alert("them thanh cong");
        this.props.addData(item);
        this.props.add();
        this.props.alert('THÊM THÀNH CMN CÔNG', 'success');
    }
    checkEdit(key) {
        var item = {};
        item = this.state;
        // console.log(item);
        // console.log(key);
        // alert("sua thanh cong");
        this.props.confirmEdit(item, key);
        this.props.alert('SỬA THÀNH CMN CÔNG', 'warning');
    }
    addChange() {
        if (this.props.state.all.add) {
            return (<div className="editForm">
                <form onSubmit={(e) => { e.preventDefault(); this.checkSubmit() }}>
                    <h3>Thêm nội dung</h3>
                    <div className="form-group">
                        <label>Tiêu đề note</label>
                        <input type="text" name='title' className="form-control" aria-describedby="helpId" onChange={(event) => this.checkInput(event)} required />
                    </div>
                    <div className="form-group">
                        <label>Nội dung note</label>
                        <textarea type="text" name='content' className="form-control" aria-describedby="helpId" defaultValue={""} onChange={(event) => this.checkInput(event)} required />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block" >Thêm</button>
                </form>
                <button className="btn btn-secondary btn-block mt-1" onClick={() => this.props.add()}>Close</button>
            </div>
            )
        } else {
            return (<button className="btn btn-dark btn-block mt-1" onClick={() => this.props.add()}>Thêm nội dung</button>)
        }

    }
    editChange() {
        if (this.props.state.all.edit) {
            console.log(this.props.state.all.unlock);
            // var editt = firebase.database().ref('dataForNote/' + this.props.state.all.key);
            // editt.once('value').then((snapshot) => {
            return (<div className="editForm mt-3">
                <form>
                    <h3>Sửa nội dung</h3>
                    <div className="form-group">
                        <label>Tiêu đề note</label>
                        <input type="text" name='title' defaultValue={this.state.title} className="form-control" aria-describedby="helpId" onChange={(event) => this.checkInput(event)} />
                    </div>
                    <div className="form-group">
                        <label>Nội dung note</label>
                        <textarea type="text" name='content' className="form-control" aria-describedby="helpId" defaultValue={this.state.content} onChange={(event) => this.checkInput(event)} />
                    </div>
                    <button type='reset' className="btn btn-primary btn-block" onClick={() => { this.checkEdit(this.state.key) }}>Sửa</button>
                </form>
                {/* <button className="btn btn-secondary btn-block mt-1" onClick={() => this.props.close()}>Close</button> */}
            </div>)

            // })
        }

    }

    render() {
        // console.log(this.state);
        // this.cc();
        // console.log(this.props.state.all.title);

        // console.log(this.props.state.all);
        return (
            <div className='nhucc col-md-4 order-md-2 order-1'>
                {
                    this.addChange()
                }
                {
                    this.editChange()
                }
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        state: state
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addData: (item) => {
            dispatch({
                type: "ADD DATA",
                item: item
            })
        },
        isChange: () => {
            dispatch({
                type: "IS CHANGE"
            })
        },
        edit: () => {
            dispatch({ type: "CLICK_EDIT" })
        },
        confirmEdit: (item, key) => {
            dispatch({ type: "CONFIRM_EDIT", item: item, key: key })
        },
        close: () => {
            dispatch({
                type: "CLOSE_EDIT"
            })
        },
        add: () => {
            dispatch({ type: "CLICK_ADD" })
        },
        alert: (alertContent, color) => {
            dispatch({ type: "ON ALERT", alertContent, color })
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Form)
import { combineReducers } from 'redux';
import { createStore } from 'redux';
import { nodeData } from './../firebase';
import firebase from 'firebase/app';
import 'firebase/database';


const addDataReducerInitialState = { add: true }
const addDataReducer = (state = addDataReducerInitialState, action) => {
    switch (action.type) {
        case 'ADD DATA':
            nodeData.push(action.item);
            return { ...state, add: !state.add }
        default:
            return state;
    }
}

const delDataInitialState = true
const delData = (state = delDataInitialState, action) => {
    switch (action.type) {
        case "DEL DATA":
            nodeData.child(action.key).remove()
            return !state
        default:
            return state
    }
}


const allInitialState = { add: false, edit: false, key: 'ahihi', title: '', content: '', unlock: true, alertCheck: false, alertContent: '' }
const all = (state = allInitialState, action) => {
    switch (action.type) {
        case "OPEN_ADD_CLOSE_EDIT":
            return { ...state, edit: false, add: true }
        case "OPEN_EDIT_CLOSE_ADD":
            return { ...state, edit: true, add: false }
        case "CLOSE_EDIT":
            return { ...state, edit: !state.edit, add: false, title: action.title, content: action.content, key: action.key }
        case "CLOSE_ADD":
            return { ...state, add: false }
        case "CLICK_EDIT":
            return { ...state, edit: !state.edit, add: false, title: action.title, content: action.content, key: action.key }
        case "CLICK_ADD":
            return { ...state, add: !state.add, edit: false }
        case "ON ALERT":
            return { ...state, alertCheck: true, alertContent: action.alertContent,alertColor:action.color }
        case "OFF ALERT":
            return { ...state, alertCheck: false }
        case "CONFIRM_EDIT":
            var x = firebase.database().ref('dataForNote/' + action.key);
            x.set({
                title: action.item.title,
                content: action.item.content
            })
            return { ...state, edit: !state.edit, title: action.item.title, content: action.item.content }
        default:
            return state
    }
}

var allReducer = combineReducers({
    addDataReducer: addDataReducer,
    all: all,
    delData: delData
})
var store = createStore(allReducer);
store.subscribe(() => {
    // console.log(store.getState());
})

// store.dispatch({
//     type:"ADD DATA"
// })


export default store;


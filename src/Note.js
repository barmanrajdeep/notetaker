import React from 'react';
import firebase from 'firebase';
import {throttle} from 'lodash';
import{save,get} from './serverController.js';

//https://firebase.google.com/docs/web/setup
//https://support.google.com/firebase/answer/7015592
const config = {
    apiKey: "AIzaSyBaVNYemk7enFaq9X4SPL5ZAXkVN4RAV24",
    authDomain: "note-taker-5791b.firebaseapp.com",
    databaseURL: "https://note-taker-5791b.firebaseio.com",
    projectId: "note-taker-5791b",
    storageBucket: "note-taker-5791b.appspot.com",
    messagingSenderId: "979835876948",
    appId: "1:979835876948:web:026d5fcbb96bc6f7ca1fc1",
    measurementId: "G-7KE9TBESMG"
  };


export default class Note extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            do:null
        }
        this.newTextHander = this.newTextHander.bind(this); // https://reactjs.org/docs/forms.html#controlled-components
        this.throttledSaveToDatabase = throttle(this.saveToDatabase.bind(this), 2000);
        if (firebase.apps.length === 0) {
            firebase.initializeApp(config);
        }
    }

    render() {
        //https://www.w3schools.com/tags/tag_textarea.asp 
        return (
        <div>
            <h1>{this.props.heading}</h1>
            <p>{this.state.do===null? "" : this.state.do===true? "saved" : "saving..."}
            </p>
            <textarea onChange={this.newTextHander} id="noteArea" rows={window.outerHeight} cols={window.innerWidth
} value={this.state.value}> 
            </textarea>
        </div>);
    }

    newTextHander(event) {
        // throttle the save
        this.setState({ 
            value: event.target.value,
            do: false
        }, this.throttledSaveToDatabase);
    }

    saveToDatabase() {
        var dataToSave = {note: this.state.value};
      save(dataToSave)
      .then(()=>{
          this.setState({
              do: true
          });
      });
    }

    componentDidMount() {
        if (firebase.apps.length>0) {
            this.fetchData();
        }
    }

    fetchData() {
        //https://firebase.google.com/docs/database/security/quickstart
        //https://sebhastian.com/react-firebase-real-time-database-guide
        //https://firebase.google.com/docs/database/web/read-and-write#read_data_once
        //https://sebhastian.com/react-firebase-real-time-database-guide
        var self = this;
       get()
        .then(function (data) {
            self.setState({
                value: data.note
            })
        });
    }
}
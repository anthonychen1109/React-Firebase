import React, { Component } from 'react';
let firebase = require('firebase');

var config = {
  apiKey: "AIzaSyD4bZ7Ok7f6yric9VyifsHW0U6NDpeI-qc",
  authDomain: "usurvey-525ca.firebaseapp.com",
  databaseURL: "https://usurvey-525ca.firebaseio.com",
  projectId: "usurvey-525ca",
  storageBucket: "usurvey-525ca.appspot.com",
  messagingSenderId: "276506602156"
};
firebase.initializeApp(config);

class Authen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      err: ''
    };

    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.logout = this.logout.bind(this);

  }

  login(event) {
    const email = this.refs.email.value; // grab email
    const password = this.refs.password.value; // grab email

    const auth = firebase.auth(); // firebase query

    const promise = auth.signInWithEmailAndPassword(email, password); // returns a promise

    promise.then(user => {
      let err = "Welcome " + user.email;
      let lout = document.getElementById('logout');
      lout.classList.remove('hide');
      this.setState({err});
    });

    promise
    .catch(e => {
      let err = e.message;
      console.log(err);
      this.setState({err});
    });

  } // login button

  signup(event) {
    const email = this.refs.email.value; // grab email
    const password = this.refs.password.value; // grab email

    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email, password);

    promise
    .then(user => {
      let err = "Welcome " + user.email;
      firebase.database().ref('users/'+user.uid).set({
        email: user.email
      });
      console.log(user);
      this.setState({err});
    });
    promise
    .catch(e => {
      let err = e.message;
      console.log(err);
      this.setState({err});
    });
  } // signup

  logout(event) {
    firebase.auth().signOut();
    let lout = document.getElementById('logout');
    lout.classList.add('hide');
    this.setState({err: 'Thank you ' + this.refs.email.value});
  } // logout

  render() {
    return (
      <div>
        <input id="email" ref="email" type="email" placeholder="Enter your email" /> <br />
        <input id="pass" ref="password" type="password" placeholder="Enter your password" /> <br />
        <p>{this.state.err}</p>
        <button onClick={this.login}>Log In</button>
        <button onClick={this.signup}>Sign Up</button>
        <button id="logout" className="hide" onClick={this.logout}>Log Out</button>
      </div>
    );
  }
}

export default Authen;

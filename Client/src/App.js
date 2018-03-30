import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FileList from './FileList'
import FileUpload from './FileUpload'


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <FileList />
        <FileUpload />
      </div>
    );
  }
}

export default App;

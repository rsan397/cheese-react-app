import React, { Component } from 'react';
import {SearchBar} from "./SearchBar";

class App extends Component {
  constructor(){
    super()
    this.state = {}
  }

  render() {
    return (
      <div>
        <SearchBar />
      </div>
    );
  }
}

export default App;

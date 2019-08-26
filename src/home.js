import React, { Component } from "react";
import getDeckNames from "./deck-service";

class Home extends Component {
  render() {
    return (
      <div>
        <h2>Home Page</h2>
        <p>Choose a deck to play:</p>
        <ul>
          {getDeckNames()}
        </ul>
      </div>
    );
  }
}

export default Home;
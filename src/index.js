import React from "react";
import ReactDOM from "react-dom";
import {
  Route,
  NavLink,
  HashRouter,
} from "react-router-dom";
import App from "./app";
import DeckEditor from "./deck-editor";
import Game from "./game";

import "./index.css";

const routing = (
  <HashRouter>
    <div>
      <h1>Simple SPA</h1>
      <ul className="header">
        <li><NavLink exact to="/">Home</NavLink></li>
        <li><NavLink to="/deck-editor">DeckEditor</NavLink></li>
      </ul>
      <div className="content">
        <Route exact path="/" component={App} />
        <Route path="/deck-editor" component={DeckEditor} />
        <Route path="/play/:deckName" component={Game} />
      </div>
    </div>

  </HashRouter>
)

ReactDOM.render(routing, document.getElementById("root"));

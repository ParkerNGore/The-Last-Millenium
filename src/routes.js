import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import App from "./App";
import CharacterListPage from "./containers/CharacterListPage";
import CharacterPage from "./containers/CharacterPage";
import HomePage from "./containers/HomePage";
import WorldPage from "./containers/WorldPage";

const routes = (
  <Router>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/characters" component={CharacterListPage} />
    <Route path="/characters/:characterId" component={CharacterPage} />
    <Route path="/world" component={WorldPage} />
  </Router>
);

export default routes;

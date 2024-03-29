import React from "react";
import "../App.css"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

import { ApolloProvider } from "@apollo/react-hooks"
import ApolloClient from "apollo-boost"
import AddFriend from "./AddFriend";
import AllFriends from "./AllFriends"
import FindFriend from "./FindFriend"
import DeleteFriend from "./DeleteFriend"
import UpdateFriend from "./UpdateFriend"
import Home from "./Home"

const URI = "http://localhost:8080/graphql"

const client = new ApolloClient({
  uri: URI
})

export default function App() {
  return (
    <Router>
      <div>
        <ul className="header">
          <li>
            <NavLink exact activeClassName="selected" to="/">Home</NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="selected" to="/allFriends">All Friends</NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="selected" to="/findFriend">Find Friend</NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="selected" to="/addFriend">Add Friend</NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="selected" to="/updateFriend">Update Friend</NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="selected" to="/deleteFriend">Delete Friend</NavLink>
          </li>
        </ul>

        <hr />
        <ApolloProvider client={client}>
          {/* Alt inde i apollo provideren kan automatisk snakke med vores apollo clienten */}
          <div className="content">
            <Switch>

              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/allFriends">
                <AllFriends />
              </Route>
              <Route path="/findFriend">
                <FindFriend />
              </Route>
              <Route path="/addFriend">
                <AddFriend allowEdit={true} />
              </Route>
              <Route path="/updateFriend">
                <UpdateFriend allowEdit={true} />
              </Route>
              <Route path="/deleteFriend">
                <DeleteFriend />
              </Route>

            </Switch>
          </div>
        </ApolloProvider>
      </div>
    </Router>
  );
}

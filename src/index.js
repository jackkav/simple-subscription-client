import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { Books, Feedback } from "./Query";
import { AddFeedback } from "./Mutation";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});
const App = () => (
  <ApolloProvider client={client}>
    <div>
      <h2>My first Apollo app 🚀</h2>
      <AddFeedback />
      <Feedback />
      <Books />
    </div>
  </ApolloProvider>
);
ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();

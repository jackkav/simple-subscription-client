import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { Books, Feedback } from "./Query";
import { AddFeedback, AddBook } from "./Mutation";
import { Provider } from "./apolloClient";
import { DontReadTheFeedback } from "./Subscription";
import "tachyons";
const App = () => (
  <Provider>
    <div>
      <AddFeedback />
      <Feedback />
      {/* <DontReadTheFeedback /> */}
      <AddBook />
      <Books />
    </div>
  </Provider>
);
ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();

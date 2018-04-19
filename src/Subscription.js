import React from "react";
import { Subscription } from "react-apollo";
import gql from "graphql-tag";

const FEEDBACK_SUBSCRIPTION = gql`
  subscription onFeedbackAdded {
    feedbackAdded {
      id
      text
    }
  }
`;

export const DontReadTheFeedback = () => (
  <Subscription subscription={FEEDBACK_SUBSCRIPTION}>
    {({ data, loading }) => (
      <h4>
        New feedback:
        {console.log(data) ||
          (!loading && data.feedbackAdded && data.feedbackAdded.text)}
      </h4>
    )}
  </Subscription>
);

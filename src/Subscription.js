import React from "react";
import { Subscription } from "react-apollo";
import gql from "graphql-tag";

const FEEDBACK_SUBSCRIPTION = gql`
  subscription onFeedbackAdded {
    feedbackAdded {
      id
      feedback
    }
  }
`;

export const DontReadTheFeedback = () => (
  <Subscription subscription={FEEDBACK_SUBSCRIPTION}>
    {({ data, loading }) => (
      <h4>
        New feedback:
        {!loading && data.feedbackAdded && data.feedbackAdded.feedback}
      </h4>
    )}
  </Subscription>
);

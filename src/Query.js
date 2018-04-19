import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
const FEEDBACK_QUERY = gql`
  {
    feedbacks {
      id
      text
    }
  }
`;
const FEEDBACK_SUBSCRIPTION = gql`
  subscription onFeedbackAdded {
    feedbackAdded {
      id
      text
    }
  }
`;
export const Feedback = () => (
  <Query query={FEEDBACK_QUERY}>
    {({ subscribeToMore, ...result }) => {
      return (
        <FeedbackList
          {...result}
          subscribeToNewComments={() =>
            subscribeToMore({
              document: FEEDBACK_SUBSCRIPTION,
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newFeedItem = subscriptionData.data.feedbackAdded;
                return Object.assign({}, prev, {
                  feedbacks: [newFeedItem, ...prev.feedbacks]
                });
              }
            })
          }
        />
      );
    }}
  </Query>
);
export class FeedbackList extends React.Component {
  componentDidMount() {
    this.props.subscribeToNewComments();
  }
  render() {
    const { data, loading, error } = this.props;
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :( {error.message}</p>;
    return data.feedbacks.map(({ id, text }) => (
      <div key={id}>
        <p>{`${id}: ${text}`}</p>
      </div>
    ));
  }
}
export const Books = () => (
  <Query
    query={gql`
      {
        books {
          title
          author
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :( {error.message}</p>;

      return data.books.map(({ title, author }) => (
        <div key={title}>
          <p>{`${title}: ${author}`}</p>
        </div>
      ));
    }}
  </Query>
);

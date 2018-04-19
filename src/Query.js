import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { SimpleList } from "./components";
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
                return Object.assign({}, prev, {
                  feedbacks: [
                    subscriptionData.data.feedbackAdded,
                    ...prev.feedbacks
                  ]
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
    return <SimpleList list={data.feedbacks} />;
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

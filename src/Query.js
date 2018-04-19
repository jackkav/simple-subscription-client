import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { SimpleList } from "./components";
const FEEDBACK_QUERY = gql`
  {
    feedbacks {
      id
      feedback
    }
  }
`;
const FEEDBACK_SUBSCRIPTION = gql`
  subscription onFeedbackAdded {
    feedbackAdded {
      id
      feedback
    }
  }
`;
export const Feedback = () => (
  <Query query={FEEDBACK_QUERY}>
    {({ subscribeToMore, ...result }) => {
      return (
        <FeedbackList
          {...result}
          subscribeToNew={() =>
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
class FeedbackList extends React.Component {
  componentDidMount() {
    this.props.subscribeToNew();
  }
  render() {
    const { data, loading, error } = this.props;
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :( {error.message}</p>;
    return <SimpleList list={data.feedbacks} fields={["feedback"]} />;
  }
}
const BOOK_QUERY = gql`
  {
    books {
      id
      title
      author
    }
  }
`;
const BOOK_SUBSCRIPTION = gql`
  subscription onBookAdded {
    bookAdded {
      id
      author
      title
    }
  }
`;
export const Books = () => (
  <Query query={BOOK_QUERY}>
    {({ subscribeToMore, ...result }) => {
      return (
        <BookList
          {...result}
          subscribeToNew={() =>
            subscribeToMore({
              document: BOOK_SUBSCRIPTION,
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                return Object.assign({}, prev, {
                  books: [subscriptionData.data.bookAdded, ...prev.books]
                });
              }
            })
          }
        />
      );
    }}
  </Query>
);
class BookList extends React.Component {
  componentDidMount() {
    this.props.subscribeToNew();
  }
  render() {
    const { data, loading, error } = this.props;
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :( {error.message}</p>;
    return <SimpleList list={data.books} fields={["author", "title"]} />;
  }
}

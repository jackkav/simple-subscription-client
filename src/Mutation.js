import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { SimpleInput } from "./components";
const ADD_FEEDBACK = gql`
  mutation addFeedback($data: FeedbackInput!) {
    addFeedback(data: $data) {
      id
      feedback
    }
  }
`;

export const AddFeedback = () => (
  <Mutation mutation={ADD_FEEDBACK}>
    {(addFeedback, { data, loading, error }) => (
      <div>
        <SimpleInput submit={addFeedback} fields={["feedback"]} />
        {loading && <p>Loading...</p>}
        {error && <p>Error :( Please try again {error.message}</p>}
      </div>
    )}
  </Mutation>
);

const ADD_BOOK = gql`
  mutation addBook($data: BookInput!) {
    addBook(data: $data) {
      id
      author
      title
    }
  }
`;

export const AddBook = () => (
  <Mutation mutation={ADD_BOOK}>
    {(addBook, { data, loading, error }) => (
      <div>
        <SimpleInput submit={addBook} fields={["author", "title"]} />
        {loading && <p>Loading...</p>}
        {error && <p>Error :( Please try again {error.message}</p>}
      </div>
    )}
  </Mutation>
);

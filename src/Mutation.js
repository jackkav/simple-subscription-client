import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { SimpleInput } from "./components";
const ADD_FEEDBACK = gql`
  mutation addFeedback($data: FeedbackInput!) {
    addFeedback(data: $data) {
      id
      text
    }
  }
`;

export const AddFeedback = () => (
  <Mutation mutation={ADD_FEEDBACK}>
    {(addFeedback, { data, loading, error }) => (
      <SimpleInput addFeedback={addFeedback} />
    )}
  </Mutation>
);

const ADD_BOOK = gql`
  mutation addBook($data: BookInput!) {
    addBook(data: $data) {
      author
      title
    }
  }
`;

export const AddBook = () => {
  let author, title;

  return (
    <Mutation mutation={ADD_BOOK}>
      {(addBook, { data, loading, error }) => (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault();
              addBook({
                variables: {
                  data: { author: author.value, title: title.value }
                }
              });
              author.value = "";
              title.value = "";
            }}
          >
            <input
              placeholder="title"
              ref={node => {
                title = node;
              }}
            />
            <input
              placeholder="author"
              ref={node => {
                author = node;
              }}
            />
            <button type="submit">Add Book</button>
          </form>
          {loading && <p>Loading...</p>}
          {error && <p>Error :( Please try again {error.message}</p>}
        </div>
      )}
    </Mutation>
  );
};

import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
export const Feedback = () => (
  <Query
    query={gql`
      {
        feedbacks{
          id
          text
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :( {error.message}</p>;
      return data.feedbacks.map(({ id, text }) => (
        <div key={id}>
          <p>{`${id}: ${text}`}</p>
        </div>
      ));
    }}
  </Query>
);
export const Books = () => (
  <Query
    query={gql`
      {
        books{
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
// src/api.js
const API_URL = 'http://graphql.unicaen.fr:4000';

const SIGN_IN = `
mutation SignIn($username: String!, $password: String!) {
  signIn(username: $username, password: $password)
}
`;

export function signIn(username, password) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: SIGN_IN,
      variables: {
        username: username,
        password: password,
      },
    }),
  })
    .then(response => response.json())
    .then(jsonResponse => {
      if (jsonResponse.errors) {
        throw new Error(jsonResponse.errors[0].message);
      }
      return jsonResponse.data.signIn;
    })
    .catch(error => {
      throw new Error(error.message);
    });
}

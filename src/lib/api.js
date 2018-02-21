import { fetch } from 'react-native';
import config from '../../config';

export function signIn(email, password) {
  fetch(`${config.baseUrl}authenticate`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) =>
      response.json())
    .then((responseJson) => {
      return responseJson.token;
    })
    .catch((error) => {
      console.error(error);
    });

  // .then((response) => {
  //   if(response.ok) {
  //     const responseJson = response.json();
  //     return responseJson;
  //   }
  // })
  // .catch((error) => {
  //   console.error(error);
  // })
}


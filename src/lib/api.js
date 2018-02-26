// import { fetch } from 'react-native';
import config from '../../config';

export function signIn(email, password) {
  fetch(`${config.baseUrl}authenticate`, { //eslint-disable-line no-undef
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
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function signUp(email, password) {
  let success = false;
  let message = '';
  const route = `${config.baseUrl}users/signup`;
  try {
    let response = await fetch(route, { //eslint-disable-line no-undef
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        isMobile: true
      }),
    });
    let responseJson = await response.json();
    if (response.ok) {
      success = true;
    }
    if (responseJson.message) {
      message = responseJson.message;
    }
    return { success: success, message: message };
  } catch (error) {
    console.error(error);
  }
}

export function verifyEmail(verificationCode) {
  fetch(`${config.baseUrl}users/confirmation/${verificationCode}`, { //eslint-disable-line no-undef
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) =>
      response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });

}

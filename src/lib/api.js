import config from '../../config';
import * as store from './storage';

export async function signIn(email, password) {
  let success = false;
  let message = '';
  let token = '';
  const route = `${config.baseUrl}authenticate`;
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
    const responseJson = await response.json();
    if (response.ok) {
      success = true;
      token = responseJson.token;
    }
    if (responseJson.message) {
      message = responseJson.message;
    }
    return { success: success, message: message, token: token };
  } catch (error) {
    console.error(error);
  }
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
    const responseJson = await response.json();
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

export async function verifyEmail(verificationCode) {
  const route = `${config.baseUrl}users/confirmation/${verificationCode}`
  let success = false;
  let message = '';
  try {
    let response = await fetch(route, { //eslint-disable-line no-undef
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const responseJson = await response.json();
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

export async function resendVerificationCode(email) {
  const route = `${config.baseUrl}users/resend`
  let success = false;
  let message = '';
  try {
    let response = await fetch(route, { //eslint-disable-line no-undef
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        isMobile: true
      }),
    });
    const responseJson = await response.json();
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

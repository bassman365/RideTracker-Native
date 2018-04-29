import config from '../../config';
import { NetInfo, ToastAndroid } from 'react-native';
import { getTokenAsync } from './storage';

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
    const connected = await NetInfo.isConnected.fetch();
    if (connected) {
      console.info(`Connected value is: ${connected}`);
      ToastAndroid.show(
        'Looks like the something is not working on our end!  Please try again later.',
        ToastAndroid.LONG
      );
    } else {
      console.info(`Connected value is: ${connected}`);
      ToastAndroid.show(
        'You do not currently have a network connection.  Please connect and try again.',
        ToastAndroid.LONG
      );
    }
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

export async function renewToken(token) {
  let success = false;
  let message = '';
  const route = `${config.baseUrl}authenticate/renew`;
  try {
    let response = await fetch(route, { //eslint-disable-line no-undef
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token
      },
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
    const connected = await NetInfo.isConnected.fetch();
    if (connected) {
      console.info(`Connected value is: ${connected}`);
      ToastAndroid.show(
        'Looks like the something is not working on our end!  Please try again later.',
        ToastAndroid.LONG
      );
    } else {
      console.info(`Connected value is: ${connected}`);
      ToastAndroid.show(
        'You do not currently have a network connection.  Please connect and try again.',
        ToastAndroid.LONG
      );
    }
    //console.error(error);
  }
}

export async function submitRideAsync(ride) {
  let success = false;
  let message = '';
  const route = `${config.baseUrl}rides`;

  try {
    const token = await getTokenAsync();
    let response = await fetch(route, { //eslint-disable-line no-undef
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify(ride),
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
    return { success: success, message: message};
  }
}

export async function getRidesAsync() {
  let success = false;
  let message = '';
  let rides = [];
  const route = `${config.baseUrl}rides`;
  try {
    const token = await getTokenAsync();
    let response = await fetch(route, { //eslint-disable-line no-undef
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token
      },
    });
    const responseJson = await response.json();
    if (response.ok) {
      success = true;
      rides = responseJson.rides;
    }
    if (responseJson.message) {
      message = responseJson.message;
    }
    return { success: success, message: message, rides: rides };
  } catch (error) {
    return { success: success, message: message};
  }
}

export async function getProgramCollectionsAsync() {
  let success = false;
  let message = '';
  let programCollections = [];
  const route = `${config.baseUrl}programCollections`;
  try {
    const token = await getTokenAsync();
    let response = await fetch(route, { //eslint-disable-line no-undef
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token
      },
    });
    const responseJson = await response.json();
    if (response.ok) {
      success = true;
      programCollections = responseJson.programCollections;
    }
    if (responseJson.message) {
      message = responseJson.message;
    }
    return { success: success, message: message, programCollections: programCollections };
  } catch (error) {
    return { success: success, message: message};
  }
}

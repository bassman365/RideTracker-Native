import config from '../../config';
import {ToastAndroid} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {getTokenAsync} from './storage';

export async function signInAsync(email, password) {
  const route = `${config.baseUrl}authenticate`;
  let success = false;
  let message = '';
  let token = '';
  try {
    const response = await fetch(route, {
      method: 'POST',
      headers: {
        // eslint-disable-next-line prettier/prettier
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        isMobile: true,
      }),
    });
    if (response.ok) {
      success = true;
      const responseJson = await response.json();
      token = responseJson.token;
      if (responseJson.message) {
        message = responseJson.message;
      }
    } else {
      throw new Error(response.statusText);
    }
    return {success, message, token};
  } catch (error) {
    console.error(error);
    const state = await NetInfo.fetch();
    if (state.isConnected) {
      ToastAndroid.show(
        'Looks like the something is not working on our end!  Please try again later.',
        ToastAndroid.LONG,
      );
    } else {
      ToastAndroid.show(
        'You do not currently have a network connection.  Please connect and try again.',
        ToastAndroid.LONG,
      );
    }
    return {success, message};
  }
}

export async function signUp(email, password) {
  let success = false;
  let message = '';
  const route = `${config.baseUrl}users/signup`;
  try {
    let response = await fetch(route, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        isMobile: true,
      }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      success = true;
    }
    if (responseJson.message) {
      message = responseJson.message;
    }
    return {success: success, message: message};
  } catch (error) {
    console.error(error);
  }
}

export async function verifyEmail(verificationCode) {
  const route = `${config.baseUrl}users/confirmation/${verificationCode}`;
  let success = false;
  let message = '';
  try {
    let response = await fetch(route, {
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
    return {success: success, message: message};
  } catch (error) {
    console.error(error);
  }
}

export async function resendVerificationCode(email) {
  const route = `${config.baseUrl}users/resend`;
  let success = false;
  let message = '';
  try {
    let response = await fetch(route, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        isMobile: true,
      }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      success = true;
    }
    if (responseJson.message) {
      message = responseJson.message;
    }
    return {success: success, message: message};
  } catch (error) {
    console.error(error);
  }
}

export async function renewToken(token) {
  let success = false;
  let message = '';
  const route = `${config.baseUrl}authenticate/renew`;
  try {
    let response = await fetch(route, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
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
    return {success, message, token};
  } catch (error) {
    const state = await NetInfo.fetch();
    if (state.isConnected) {
      console.info(`Connected value is: ${state.isConnected}`);
      ToastAndroid.show(
        'Looks like the something is not working on our end!  Please try again later.',
        ToastAndroid.LONG,
      );
    } else {
      console.info(`Connected value is: ${state.isConnected}`);
      ToastAndroid.show(
        'You do not currently have a network connection.  Please connect and try again.',
        ToastAndroid.LONG,
      );
    }
    return {success, message};
  }
}

export async function submitRideAsync(ride) {
  let success = false;
  let message = '';
  const route = `${config.baseUrl}rides`;

  try {
    const token = await getTokenAsync();
    let response = await fetch(route, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
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
    return {success, message};
  } catch (error) {
    return {success, message};
  }
}

export async function getRidesAsync() {
  let success = false;
  let message = '';
  let rides = [];
  const route = `${config.baseUrl}rides`;
  try {
    const token = await getTokenAsync();
    let response = await fetch(route, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
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
    return {success, message, rides};
  } catch (error) {
    return {success, message};
  }
}

export async function getProgramCollectionsAsync() {
  let success = false;
  let message = '';
  let programCollections = [];
  const route = `${config.baseUrl}programCollections`;
  try {
    const token = await getTokenAsync();
    let response = await fetch(route, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
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
    return {
      success: success,
      message: message,
      programCollections: programCollections,
    };
  } catch (error) {
    return {success: success, message: message};
  }
}

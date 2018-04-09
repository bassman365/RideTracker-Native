import jwt_decode from 'jwt-decode';
import { getToken, setToken, getVerified, VerifiedStates } from './storage';
import { renewToken } from './api';
import Screens from './screens';
import moment from 'moment';

export async function isTokenExpired() {
  try {
    const token = await getToken();
    if (!token) {
      return true;
    }

    const decoded = jwt_decode(token);
    const offsetSeconds = 30;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);

    const currentDate = Math.floor((Date.now().valueOf()));
    const adjustedTime = currentDate + offsetSeconds * 1000;
    const isExpired = date.valueOf() < adjustedTime;
    console.info(`exp time: ${date.valueOf()} and current time: ${adjustedTime}`);
    console.info(`isExpired: ${isExpired}`);
    return isExpired;

  } catch (error) {
    console.error(error);
  }
}

export async function refreshToken() {
  try {
    let success = false;
    const currentToken = await getToken();
    const renewResponse = await renewToken(currentToken);
    if (renewResponse.success) {
      await setToken(renewResponse.token);
      success = true;
      console.info('refresh token success');
      return { success: success };
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getStartScreen() {
  try {
    const verified = await getVerified();
    const isExpired = await isTokenExpired();
    switch (verified) {
    case VerifiedStates.Unverifed:
      return Screens.SIGNIN;
    case VerifiedStates.PendingVerification:
      return Screens.VERIFY;
    case VerifiedStates.Verified:
      if (!isExpired) {
        console.info("I'm going home!");
        return Screens.HOME;
      } else {
        console.info("I'm returning signin");
        return Screens.SIGNIN;
      }
    default:
      return Screens.SIGNIN;
    }
  } catch (error) {
    //TODO handle error
  }
}

export function getDisplayDate(dateString) {
  return moment(dateString).format('dddd MMMM Do YYYY');
}

export function getDisplayTime(dateString) {
  return moment(dateString).format('h:mm a');
}

export function updateYear(dateString, minute) {
  const updatedDate = moment(dateString).set('year', minute);
  return new Date(updatedDate).valueOf();
}

export function updateMonth(dateString, minute) {
  const updatedDate = moment(dateString).set('month', minute);
  return new Date(updatedDate).valueOf();
}

export function updateDay(dateString, minute) {
  const updatedDate = moment(dateString).set('day', minute);
  return new Date(updatedDate).valueOf();
}

export function updateHour(dateString, hour) {
  const updatedDate = moment(dateString).set('hour', hour);
  return new Date(updatedDate).valueOf();
}

export function updateMinute(dateString, minute) {
  const updatedDate = moment(dateString).set('minute', minute);
  return new Date(updatedDate).valueOf();
}

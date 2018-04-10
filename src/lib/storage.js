import { AsyncStorage } from 'react-native'
import jwt_decode from 'jwt-decode';
const userStore = '@RIDE_TRACKER_USER_STORE'
const verifiedKey = 'VERIFIED';
const tokenKey = 'AUTHORIZATION_TOKEN';
const completedRideKey = 'COMPLETED_RIDES';
const inProgressRideKey = 'IN_PROGRESS_RIDES';

export const VerifiedStates = Object.freeze({
  Unverifed: 1,
  PendingVerification: 2,
  Verified: 3
});

export async function setVerifiedAsync(isVerified) {
  try {
    await AsyncStorage.setItem(`${userStore}:${verifiedKey}`, JSON.stringify(isVerified));
  } catch (error) {
    console.error(error);
  }
}

export async function getVerifiedAsync() {
  try {
    const isVerified = await AsyncStorage.getItem(`${userStore}:${verifiedKey}`);
    const returnValue = JSON.parse(isVerified);
    return returnValue;
  } catch (error) {
    console.error(error);
  }
}

export async function setTokenAsync(token) {
  try {
    await AsyncStorage.setItem(`${userStore}:${tokenKey}`, JSON.stringify(token));
  } catch (error) {
    // Error saving data
  }
}

export async function getTokenAsync() {
  try {
    const token = await AsyncStorage.getItem(`${userStore}:${tokenKey}`);
    return JSON.parse(token);
  } catch (error) {
    // Error saving data
  }
}

export async function addInProgressRideAsync(ride) {
  try {
    const inProgressRides = await AsyncStorage.getItem(`${userStore}:${inProgressRideKey}`);
    if (inProgressRides) {
      // const newRides = Object.assign({}, ...JSON.parse(inProgressRides), ride);
      const newRides = [...JSON.parse(inProgressRides), ride];
      await AsyncStorage.setItem(`${userStore}:${inProgressRideKey}`, JSON.stringify(newRides));
    } else {
      await AsyncStorage.setItem(`${userStore}:${inProgressRideKey}`, JSON.stringify([ride]));
    }
  } catch (error) {
    // Error saving data
  }
}

export async function getInProgressRidesAsync() {
  try {
    const inProgressRides = await AsyncStorage.getItem(`${userStore}:${inProgressRideKey}`);
    return JSON.parse(inProgressRides);
  } catch (error) {
    // Error saving data
  }
}

export async function removeInProgressRideAsync(rideDateTime) {
  try {
    const inProgressRides = await AsyncStorage.getItem(`${userStore}:${inProgressRideKey}`);
    if (inProgressRides) {
      const remaingRides = JSON.parse(inProgressRides).filter(x => x.datetime !== rideDateTime);
      await AsyncStorage.setItem(`${userStore}:${inProgressRideKey}`, JSON.stringify(remaingRides));
    }
  } catch (error) {
    // Error removing data
  }
}

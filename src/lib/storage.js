import { AsyncStorage } from 'react-native'

const userStore = '@RIDE_TRACKER_USER_STORE'
const verifiedKey = 'VERIFIED';
const tokenKey = 'AUTHORIZATION_TOKEN';

export const VerifiedStates = Object.freeze({
  Unverifed: 1,
  PendingVerification: 2,
  Verified: 3
});

export async function setVerified(isVerified) {
  try {
    await AsyncStorage.setItem(`${userStore}:${verifiedKey}`, JSON.stringify(isVerified));
  } catch (error) {
    console.error(error);
  }
}

export async function getVerified() {
  try {
    const isVerified = await AsyncStorage.getItem(`${userStore}:${verifiedKey}`);
    const returnValue = JSON.parse(isVerified);
    return returnValue;
  } catch (error) {
    console.error(error);
  }
}

export async function setToken(token) {
  try {
    await AsyncStorage.setItem(`${userStore}:${tokenKey}`, JSON.stringify(token));
  } catch (error) {
    // Error saving data
  }
}

export async function getToken() {
  try {
    return await AsyncStorage.getItem(`${userStore}:${tokenKey}`);
  } catch (error) {
    // Error saving data
  }
}

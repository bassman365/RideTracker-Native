import React, {useState, useEffect} from 'react';
import {StackActions} from '@react-navigation/native';
import {
  getStartScreenAsync,
  refreshProgramCollectionsAsync,
  refreshTokenAsync,
} from '../../lib/helpers';
import {getTokenAsync} from '../../lib/storage';
import {Screens} from '../../lib/screens';

export default function InitialScreen({navigation}) {
  // const [tokenHasBeenRefreshed, setTokenHasBeenRefreshed] = useState(false);
  // const [programsHaveBeenRefreshed, setProgramsHaveBeenRefreshed] = useState(
  //   false,
  // );
  const [hasBeenInitialized, setHasBeenInitialized] = useState(false);

  async function getInitialScreenAsync() {
    let screenName = Screens.SIGNIN;
    try {
      const token = await getTokenAsync();
      if (token) {
        await Promise.all([
          refreshTokenAsync(),
          refreshProgramCollectionsAsync(),
        ]);
      }
      screenName = await getStartScreenAsync();
    } catch (error) {
      console.error(error);
    } finally {
      setHasBeenInitialized(true);
      return screenName;
    }
  }

  useEffect(() => {
    async function loadAsync() {
      const screenName = await getInitialScreenAsync();
      navigation.dispatch(StackActions.replace(screenName));
    }

    if (!hasBeenInitialized) {
      loadAsync();
    }
  }, [hasBeenInitialized, navigation]);

  return null;
}

import {useState, useEffect} from 'react';
import {StackActions} from '@react-navigation/native';
import {
  getStartScreenAsync,
  refreshProgramCollectionsAsync,
  refreshTokenAsync,
} from '../../lib/helpers';
import {submitRideAsync} from '../../lib/api';
import {
  getTokenAsync,
  getCompletedRidesAsync,
  removeCompletedRideAsync,
} from '../../lib/storage';
import {Screens} from '../../lib/screens';

export default function InitialScreen({navigation}) {
  const [hasBeenInitialized, setHasBeenInitialized] = useState(false);

  async function submitAndRemoveAsync(ride) {
    const response = await submitRideAsync(ride);
    if (response.success) {
      await removeCompletedRideAsync(ride.datetime);
    }
  }

  useEffect(() => {
    async function loadAsync() {
      let screenName = Screens.SIGNIN;
      try {
        const attemptCompletedRidesSaveAsync = async () => {
          const completedRides = await getCompletedRidesAsync();

          if (completedRides && completedRides.length > 0) {
            await Promise.all(
              completedRides.map(ride => submitAndRemoveAsync(ride)),
            );
          }
        };

        const token = await getTokenAsync();
        if (token) {
          await Promise.all([
            refreshTokenAsync(),
            refreshProgramCollectionsAsync(),
            attemptCompletedRidesSaveAsync(),
          ]);
        }
        screenName = await getStartScreenAsync();
      } catch (error) {
        console.error(error);
      } finally {
        setHasBeenInitialized(true);
        navigation.dispatch(StackActions.replace(screenName));
      }
    }

    if (!hasBeenInitialized) {
      loadAsync();
    }
  }, [hasBeenInitialized, navigation]);

  return null;
}

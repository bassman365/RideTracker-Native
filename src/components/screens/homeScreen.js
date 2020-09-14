/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Button, View} from 'react-native';
import {getInProgressRidesAsync} from '../../lib/storage';
import {Screens} from '../../lib/screens';

export default function SignInScreen({navigation}) {
  const [inProgressRidesExist, setinProgressRidesExist] = useState(false);
  const [loadingInProgressRides, setloadingInProgressRides] = useState(true);

  async function checkForRidesAsync() {
    setloadingInProgressRides(true);
    try {
      const rides = await getInProgressRidesAsync();
      if (rides && rides.length > 0) {
        setinProgressRidesExist(true);
      } else {
        setinProgressRidesExist(false);
      }
    } catch {
      console.error('failed to get in progress rides');
    } finally {
      setloadingInProgressRides(false);
    }
  }

  useEffect(() => {
    async function loadAsync() {
      await checkForRidesAsync();
    }

    const unsubscribe = navigation.addListener('focus', () => {
      loadAsync();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={{flex: 0.1}} />
      <Button
        onPress={() => navigation.navigate('SignIn')}
        title="Go to Sign In"
      />
      <View style={{flex: 0.1}} />
      {!loadingInProgressRides && (
        <Button
          onPress={() =>
            inProgressRidesExist
              ? navigation.navigate(Screens.FINISH_RIDE)
              : navigation.navigate(Screens.ADD_RIDE)
          }
          title={inProgressRidesExist ? 'Finish your ride!' : 'Add a ride!'}
        />
      )}

      <View style={{flex: 0.1}} />
      <Button
        onPress={() => navigation.navigate(Screens.VIEW_RIDES)}
        title="View Your Rides!"
      />
    </View>
  );
}

/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  ToastAndroid,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {styles} from '../../lib/styles';
import {Screens} from '../../lib/screens';
import {getElapsedTime, getSecondsFromTime} from '../../lib/helpers';
import {submitRideAsync} from '../../lib/api';
import {
  getInProgressRidesAsync,
  addCompletedRideAsync,
  removeInProgressRideAsync,
} from '../../lib/storage';
import {Hoshi} from 'react-native-textinput-effects';

export default function FinishRideScreen({navigation}) {
  const [duration, setDuration] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [inProgressRide, setInProgressRide] = useState({});
  const [distance, setDistance] = useState(0.0);
  const [calories, setCalories] = useState(0.0);
  const [notes, setNotes] = useState('');
  const [minutesPickerItems, setMinutesPickerItems] = useState([]);
  const [hoursPickerItems, setHoursPickerItems] = useState([]);
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    async function loadAsync() {
      const rides = await getInProgressRidesAsync();
      const ride = rides[0];
      setInProgressRide(ride);
      const startTime = ride.datetime;
      const calculatedRideDuration = getElapsedTime(startTime);
      setDuration(calculatedRideDuration);

      let minutesList = [];
      for (let i = 0; i < 60; i++) {
        minutesList.push(i);
      }

      let hoursList = [];
      for (let i = 0; i <= 24; i++) {
        hoursList.push(i);
      }

      const minutesPickerElements = minutesList.map((val, i) => {
        return <Picker.Item key={i} label={val.toString()} value={val} />;
      });

      const hoursPickerElements = hoursList.map((val, i) => {
        return <Picker.Item key={i} label={val.toString()} value={val} />;
      });

      setMinutesPickerItems(minutesPickerElements);
      setHoursPickerItems(hoursPickerElements);
    }

    loadAsync();
  }, []);

  useEffect(() => {
    const seconds = getSecondsFromTime(duration);
    if (seconds > 0 && distance > 0 && calories > 0) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [duration, distance, calories]);

  const updateDurationSeconds = seconds => {
    setDuration(prevState => {
      return {...prevState, seconds};
    });
  };

  const updateDurationMinutes = minutes => {
    setDuration(prevState => {
      return {...prevState, minutes};
    });
  };

  const updateDurationHours = hours => {
    setDuration(prevState => {
      return {...prevState, hours};
    });
  };

  async function handleSubmitRide(ride) {
    try {
      //attempt to send to api
      const response = await submitRideAsync(ride);

      if (response.success) {
        ToastAndroid.show('Ride Saved!', ToastAndroid.LONG);
      } else {
        await addCompletedRideAsync(ride);
        ToastAndroid.show(
          'Could not reach api so ride saved locally',
          ToastAndroid.LONG,
        );
      }
      await removeInProgressRideAsync(inProgressRide.datetime);
    } catch (error) {
      //handle error
    }
  }

  const submitRide = () => {
    //compose full ride
    const ride = {
      program: inProgressRide.program,
      date: inProgressRide.datetime,
      durationSeconds: getSecondsFromTime(duration),
      weight: inProgressRide.weight,
      level: inProgressRide.level,
      distance: distance,
      calories: calories,
      notes: notes,
    };

    handleSubmitRide(ride).then(() => {
      Keyboard.dismiss();
      navigation.navigate(Screens.HOME);
    });
  };

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <View style={{flex: 0.1}} />

      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Text style={styles.titleText}>Ride Tracker</Text>
      </View>

      <View style={{flex: 0.1}} />

      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <View style={{flex: 0.8, borderWidth: 0, height: 55}}>
          <Text style={{paddingLeft: 8}}>Hours</Text>
          <Picker
            onValueChange={(itemValue, itemIndex) =>
              updateDurationHours(itemValue)
            }
            selectedValue={duration.hours}>
            {hoursPickerItems}
          </Picker>
        </View>

        <View style={{flex: 0.8, borderWidth: 0, height: 55}}>
          <Text style={{paddingLeft: 8}}>Minutes</Text>
          <Picker
            onValueChange={(itemValue, itemIndex) =>
              updateDurationMinutes(itemValue)
            }
            selectedValue={duration.minutes}>
            {minutesPickerItems}
          </Picker>
        </View>

        <View style={{flex: 0.8, borderWidth: 0, height: 55}}>
          <Text style={{paddingLeft: 8}}>Seconds</Text>
          <Picker
            onValueChange={(itemValue, itemIndex) =>
              updateDurationSeconds(itemValue)
            }
            selectedValue={duration.seconds}>
            {minutesPickerItems}
          </Picker>
        </View>
      </View>

      <View style={{flex: 0.1}} />

      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Hoshi
          borderColor={'#4359e8'}
          keyboardType="numeric"
          label={'Distance (miles)'}
          maxLength={12}
          onChangeText={value => setDistance(Number.parseFloat(value))}
          style={{flex: 0.8, borderWidth: 0, height: 40}}
        />
      </View>

      <View style={{flex: 0.1}} />

      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Hoshi
          borderColor={'#4359e8'}
          keyboardType="numeric"
          label={'Calories'}
          maxLength={10}
          onChangeText={value => setCalories(Number.parseFloat(value))}
          style={{flex: 0.8, borderWidth: 0, height: 40}}
        />
      </View>

      <View style={{flex: 0.1}} />

      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Hoshi
          borderColor={'#4359e8'}
          label={'Notes'}
          multiline
          numberOfLines={4}
          onChangeText={text => setNotes(text)}
          style={{flex: 0.8, borderWidth: 0, height: 40}}
        />
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableOpacity
          disabled={!canSubmit}
          onPress={submitRide}
          style={canSubmit ? styles.button : styles.disabledButton}
          testID="submitRideButton">
          <Text style={styles.buttonText}>Submit Ride!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

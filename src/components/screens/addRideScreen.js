/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Keyboard} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';
import {Picker} from '@react-native-community/picker';
import {styles} from '../../lib/styles';
import {Screens} from '../../lib/screens';
import {getDisplayDate, getDisplayTime} from '../../lib/helpers';
import {
  addInProgressRideAsync,
  getCachedProgramCollectionsAsync,
} from '../../lib/storage';
import {Hoshi} from 'react-native-textinput-effects';

export default function AddRideScreen({navigation}) {
  const [weight, setWeight] = useState(0.0);
  const [level, setLevel] = useState(2);
  const [program, setProgram] = useState('');
  const [date, setDate] = useState(new Date());
  const [programs, setPrograms] = useState([]);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [dateTimePickerMode, setDateTimePickerMode] = useState([]);

  const onDateTimeChange = (event, newDate) => {
    if (newDate) {
      setShowTimePicker(false);
      setDate(newDate);
    }
  };

  const startRide = () => {
    const ride = {
      weight: weight,
      program: program,
      level: level,
      datetime: date,
    };

    addInProgressRideAsync(ride).then(() => {
      Keyboard.dismiss();
      navigation.navigate(Screens.HOME);
    });
  };

  useEffect(() => {
    async function loadAsync() {
      const programCollections = await getCachedProgramCollectionsAsync();
      if (programCollections && programCollections.length > 0) {
        const cachedPrograms = programCollections[0].programs //only one collection is currently supported
          .map(x => {
            return x.name;
          });
        console.info(`setting programs with ${cachedPrograms.length} programs`);
        setPrograms(cachedPrograms);
        if (programCollections[0].defautProgram) {
          let initialProgram = cachedPrograms.find(
            x => x === programCollections[0].defautProgram,
          );
          if (!initialProgram) {
            initialProgram = cachedPrograms[0];
          }
          setProgram(initialProgram);
        } else {
          setProgram(cachedPrograms[0]);
        }
      }
    }

    loadAsync();
  }, []);

  const programPickerItems = programs.map((x, i) => {
    return <Picker.Item key={i} label={x} value={x} />;
  });

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <View style={{flex: 1}}>
        <View style={{flex: 0.1}} />
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={styles.titleText}>Ride Tracker</Text>
        </View>

        <View style={{flex: 0.1}} />

        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              onPress={() => {
                setDateTimePickerMode('date');
                setShowTimePicker(true);
              }}
              style={styles.dateText}>
              {getDisplayDate(date)}
            </Text>
            <Text
              onPress={() => {
                setDateTimePickerMode('time');
                setShowTimePicker(true);
              }}
              style={styles.dateText}>
              {getDisplayTime(date)}
            </Text>
            {showTimePicker && (
              <DateTimePicker
                mode={dateTimePickerMode}
                value={date}
                onChange={onDateTimeChange}
              />
            )}
          </View>

          <View style={{flex: 0.1}} />

          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Hoshi
              borderColor={'#4359e8'}
              keyboardType="numeric"
              label={'Weight (lbs)'}
              maxLength={6}
              onChangeText={text => setWeight(text)}
              style={{flex: 0.8, borderWidth: 0, height: 40}}
            />
          </View>

          <View style={{flex: 0.1}} />

          <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
            <View style={{flex: 0.1}} />
            <Text style={styles.labelText2}>Program: {program}</Text>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Picker
              onValueChange={(itemValue, itemIndex) => setProgram(itemValue)}
              selectedValue={program}
              style={{flex: 0.8, borderWidth: 0, height: 30}}>
              {programPickerItems}
            </Picker>
          </View>

          <View style={{flex: 0.1}} />

          <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
            <View style={{flex: 0.1}} />
            <Text style={styles.labelText2}>Level: {level}</Text>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Slider
              maximumValue={20}
              minimumValue={1}
              onValueChange={val => setLevel(val)}
              step={1}
              style={{flex: 0.8, borderWidth: 0, height: 40}}
              value={level}
            />
          </View>

          <View style={{flex: 0.1}} />

          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity
              onPress={startRide}
              style={styles.button}
              testID="startRideButton">
              <Text style={styles.buttonText}>Start Ride!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

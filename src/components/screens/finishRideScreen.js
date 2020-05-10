import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Picker,
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Keyboard,
} from 'react-native';
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

export default class FinishRideScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: {
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      inProgressRide: {},
      distance: 0.0,
      calories: 0.0,
      notes: '',
      hoursArray: [],
      minutesArray: [],
      minutesPickerItems: [],
      hoursPickerItems: [],
      canSubmit: false,
    };

    this.updateDurationSeconds = this.updateDurationSeconds.bind(this);
    this.updateDurationMinutes = this.updateDurationMinutes.bind(this);
    this.updateDurationHours = this.updateDurationHours.bind(this);
    this.updateCalories = this.updateCalories.bind(this);
    this.updateDistance = this.updateDistance.bind(this);
    this.evaluateCanSubmit = this.evaluateCanSubmit.bind(this);
    this.submitRide = this.submitRide.bind(this);
    this.handleSubmitRide = this.handleSubmitRide.bind(this);
  }

  componentDidMount() {
    getInProgressRidesAsync().then(rides => {
      this.setState({inProgressRide: rides[0]}); //eslint-disable-line  react/no-set-state
      const startTime = this.state.inProgressRide.datetime;
      const calculatedRideDuration = getElapsedTime(startTime);
      this.setState({duration: calculatedRideDuration}); //eslint-disable-line  react/no-set-state

      let minutesList = [];
      for (let i = 0; i < 60; i++) {
        minutesList.push(i);
      }

      let hoursList = [];
      for (let i = 0; i <= 24; i++) {
        hoursList.push(i);
      }

      this.setState({hoursArray: hoursList}); //eslint-disable-line  react/no-set-state
      this.setState({minutesArray: minutesList}); //eslint-disable-line  react/no-set-state

      const minutesPickerStuff = minutesList.map((val, i) => {
        return <Picker.Item key={i} label={val.toString()} value={val} />;
      });

      const hoursPickerStuff = hoursList.map((val, i) => {
        return <Picker.Item key={i} label={val.toString()} value={val} />;
      });

      this.setState({minutesPickerItems: minutesPickerStuff}); //eslint-disable-line  react/no-set-state
      this.setState({hoursPickerItems: hoursPickerStuff}); //eslint-disable-line  react/no-set-state
    });
  }

  updateDurationSeconds(seconds) {
    let duration = Object.assign({}, this.state.duration);
    duration.seconds = seconds;
    this.setState({duration}, () => {
      //eslint-disable-line  react/no-set-state
      this.evaluateCanSubmit();
    });
  }

  updateDurationMinutes(minutes) {
    let duration = Object.assign({}, this.state.duration);
    duration.minutes = minutes;
    this.setState({duration}, () => {
      //eslint-disable-line  react/no-set-state
      this.evaluateCanSubmit();
    });
  }

  updateDurationHours(hours) {
    let duration = Object.assign({}, this.state.duration);
    duration.hours = hours;
    this.setState({duration}, () => {
      //eslint-disable-line  react/no-set-state
      this.evaluateCanSubmit();
    });
  }

  updateDistance(distance) {
    this.setState({distance: distance}, () => {
      //eslint-disable-line  react/no-set-state
      this.evaluateCanSubmit();
    });
  }

  updateCalories(calories) {
    this.setState({calories: calories}, () => {
      //eslint-disable-line  react/no-set-state
      this.evaluateCanSubmit();
    });
  }

  evaluateCanSubmit() {
    const seconds = getSecondsFromTime(this.state.duration);

    if (seconds > 0 && this.state.distance > 0 && this.state.calories > 0) {
      this.setState({canSubmit: true}); //eslint-disable-line  react/no-set-state
    } else {
      this.setState({canSubmit: false}); //eslint-disable-line  react/no-set-state
    }
  }

  async handleSubmitRide(ride) {
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
      await removeInProgressRideAsync(this.state.inProgressRide.datetime);
    } catch (error) {
      //handle error
    }
  }

  submitRide() {
    //compose full ride
    const ride = {
      program: this.state.inProgressRide.program,
      date: this.state.inProgressRide.datetime,
      durationSeconds: getSecondsFromTime(this.state.duration),
      weight: this.state.inProgressRide.weight,
      level: this.state.inProgressRide.level,
      distance: this.state.distance,
      calories: this.state.calories,
      notes: this.state.notes,
    };

    this.handleSubmitRide(ride).then(() => {
      Keyboard.dismiss();
      this.props.navigation.navigate(Screens.HOME);
    });
  }

  render() {
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
                this.updateDurationHours(itemValue)
              }
              selectedValue={this.state.duration.hours}>
              {this.state.hoursPickerItems}
            </Picker>
          </View>

          <View style={{flex: 0.8, borderWidth: 0, height: 55}}>
            <Text style={{paddingLeft: 8}}>Minutes</Text>
            <Picker
              onValueChange={(itemValue, itemIndex) =>
                this.updateDurationMinutes(itemValue)
              }
              selectedValue={this.state.duration.minutes}>
              {this.state.minutesPickerItems}
            </Picker>
          </View>

          <View style={{flex: 0.8, borderWidth: 0, height: 55}}>
            <Text style={{paddingLeft: 8}}>Seconds</Text>
            <Picker
              onValueChange={(itemValue, itemIndex) =>
                this.updateDurationSeconds(itemValue)
              }
              selectedValue={this.state.duration.seconds}>
              {this.state.minutesPickerItems}
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
            onChangeText={value => this.updateDistance(value)}
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
            onChangeText={value => this.updateCalories(value)}
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
            onChangeText={text => this.setState({notes: text})} //eslint-disable-line  react/no-set-state
            style={{flex: 0.8, borderWidth: 0, height: 40}}
          />
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            disabled={!this.state.canSubmit}
            onPress={this.submitRide}
            style={this.state.canSubmit ? styles.button : styles.disabledButton}
            testID="submitRideButton">
            <Text style={styles.buttonText}>Submit Ride!</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

FinishRideScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

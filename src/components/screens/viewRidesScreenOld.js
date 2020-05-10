import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';
import {FlatGrid, SectionGrid} from 'react-native-super-grid';
import {getRidesAsync} from '../../lib/api';
import {getCachedProgramCollectionsAsync} from '../../lib/storage';
import {
  getShortDisplayDate,
  getDisplayTimeFromSeconds,
  refreshProgramCollectionsAsync,
} from '../../lib/helpers';

export default class ViewRidesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rides: [],
    };
    this.getRidesAsync = this.getRidesAsync.bind(this);
  }

  componentDidMount() {
    this.getRidesAsync().then(rides => {
      this.setState({rides: rides}); //eslint-disable-line react/no-set-state
    });
  }

  darkTextPreferred(backgroundColorHex) {
    const color =
      backgroundColorHex.charAt(0) === '#'
        ? backgroundColorHex.substring(1, 7)
        : backgroundColorHex;
    const r = parseInt(color.substring(0, 2), 16); // hexToR
    const g = parseInt(color.substring(2, 4), 16); // hexToG
    const b = parseInt(color.substring(4, 6), 16); // hexToB
    return r * 0.299 + g * 0.587 + b * 0.114 > 150 ? true : false;
  }

  async getRidesAsync() {
    try {
      let rides = [];
      let rideResponse = await getRidesAsync();
      if (!rideResponse.success) {
        throw new Error(rideResponse.message);
      }

      rides = rideResponse.rides;

      let programCollections = await getCachedProgramCollectionsAsync();

      if (!programCollections || !programCollections.length > 0) {
        await refreshProgramCollectionsAsync();
        programCollections = await getCachedProgramCollectionsAsync();
      }

      if (programCollections && programCollections.length > 0) {
        const programs = programCollections[0].programs;
        rides.map(ride => {
          const program = programs.find(x => x.name === ride.program);
          if (program && program.hexColor) {
            ride.color = program.hexColor;
            ride.textStyle = this.darkTextPreferred(ride.color)
              ? styles.itemCodeDark
              : styles.itemCode;
          }
        });
      }

      return rides;
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <FlatGrid
        itemDimension={128}
        items={this.state.rides}
        renderItem={ride => (
          <View
            style={[
              styles.itemContainer,
              {backgroundColor: ride.item.color ? ride.item.color : '#2980b9'},
            ]}>
            <Text style={ride.item.textStyle}>
              Program: {ride.item.program}
            </Text>
            <Text style={ride.item.textStyle}>
              Date: {getShortDisplayDate(ride.item.date)}
            </Text>
            <Text style={ride.item.textStyle}>Weight: {ride.item.weight}</Text>
            <Text style={ride.item.textStyle}>
              Calories: {ride.item.calories}
            </Text>
            <Text style={ride.item.textStyle}>
              Distance: {ride.item.distance}
            </Text>
            <Text style={ride.item.textStyle}>Level: {ride.item.level}</Text>
            <Text style={ride.item.textStyle}>
              Duration: {getDisplayTimeFromSeconds(ride.item.durationSeconds)}
            </Text>
          </View>
        )}
        style={styles.gridView}
      />
    );
  }
}

const styles = StyleSheet.create({
  gridView: {
    paddingTop: 25,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'space-between',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 11,
    color: '#fff',
  },
  itemCodeDark: {
    fontWeight: '600',
    fontSize: 11,
    color: '#000000',
  },
});

ViewRidesScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

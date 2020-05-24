/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import {getRidesAsync} from '../../lib/api';
import {getCachedProgramCollectionsAsync} from '../../lib/storage';
import {
  getShortDisplayDate,
  getDisplayTimeFromSeconds,
  refreshProgramCollectionsAsync,
} from '../../lib/helpers';

export default function ViewRidesScreen({navigation}) {
  const [rides, setRides] = useState([]);

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

  const darkTextPreferred = backgroundColorHex => {
    const color =
      backgroundColorHex.charAt(0) === '#'
        ? backgroundColorHex.substring(1, 7)
        : backgroundColorHex;
    const r = parseInt(color.substring(0, 2), 16); // hexToR
    const g = parseInt(color.substring(2, 4), 16); // hexToG
    const b = parseInt(color.substring(4, 6), 16); // hexToB
    return r * 0.299 + g * 0.587 + b * 0.114 > 150 ? true : false;
  };

  async function checkForRidesAsync() {
    try {
      let fetchedRides = [];
      let rideResponse = await getRidesAsync();
      if (!rideResponse.success) {
        throw new Error(rideResponse.message);
      }

      fetchedRides = rideResponse.rides;

      let programCollections = await getCachedProgramCollectionsAsync();

      if (!programCollections || !programCollections.length > 0) {
        await refreshProgramCollectionsAsync();
        programCollections = await getCachedProgramCollectionsAsync();
      }

      if (programCollections && programCollections.length > 0) {
        const programs = programCollections[0].programs;
        fetchedRides.map(ride => {
          const program = programs.find(x => x.name === ride.program);
          if (program && program.hexColor) {
            ride.color = program.hexColor;
            ride.textStyle = darkTextPreferred(ride.color)
              ? styles.itemCodeDark
              : styles.itemCode;
          }
        });
      }

      // const sortedRides = fetchedRides.sort(
      //   (a, b) => new Date(a.date) - new Date(b.date),
      // );
      return fetchedRides;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    let isSubscribed = true;
    async function loadAsync() {
      const ridesResponse = await checkForRidesAsync();
      if (isSubscribed) {
        setRides(ridesResponse);
      }
    }

    loadAsync();
    return () => (isSubscribed = false);
  });

  return (
    <FlatGrid
      itemDimension={128}
      items={rides}
      renderItem={ride => (
        <View
          style={[
            styles.itemContainer,
            {backgroundColor: ride.item.color ? ride.item.color : '#2980b9'},
          ]}>
          <Text style={ride.item.textStyle}>Program: {ride.item.program}</Text>
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

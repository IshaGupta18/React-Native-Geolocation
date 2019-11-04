/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      ready: false,
      where: {lat: null, lng: null}, //will hold the latitude and longitude
      error: null, //something to hold the error, so that it can be displayed
    };
  }
  //when all the rendering is done on the screen, then this function will be called
  componentDidMount() {
    let geoOptions = {
      enableHighAccuracy: true,
      timeOut: 20000,
      maximumAge: 60 * 60, //how long to store lang lat for
    };
    this.setState({ready: false, error: null});
    navigator.geolocation.getCurrentPosition(
      this.geoSuccess,
      this.geoFailure,
      geoOptions,
    );
  }
  //when we ask for geolocation of a device, we get a success or a failure, callback method
  geoSuccess = position => {
    this.setState({
      ready: true,
      where: {lat: position.coords.latitude, lng: position.coords.longitude},
    });
  };
  geoFailure = err => {
    this.state({error: err.message});
  };
  render() {
    return (
      <View style={styles.container}>
        {!this.state.ready && (
          <Text style={styles.big}>Using Geolocation in React Native</Text>
        )}
        {this.state.error && <Text style={styles.big}>{this.state.error}</Text>}
        {this.state.ready && (
          <Text style={styles.big}>{`Latitude: ${this.state.where.lat}
                    Longitude: ${this.state.where.lng}`}</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  big: {
    fontSize: 48,
  },
});

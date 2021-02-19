import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

import Weather from './components/weather'
import API_KEY from './utils/WeatherApiKey'

export default class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      temperature: 0,
      city: null,
      weather: null,
      error: null
    }
  }

  componentDidMount() {
    Geolocation.setRNConfiguration({
      authorizationLevel: 'whenInUse',
      skipPermissionRequests: false
    })
    Geolocation.getCurrentPosition(position => {
      console.log("position: ", position.coords)
      this.fetchWeather(position.coords.latitude, position.coords.longitude)
    }, error => {
      console.log("error: ", error)
    })
  }
  fetchWeather(lat = 25, lon = 25) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
      .then(res => res.json())
      .then(res => {
        // const data = res.main
        // console.log("result: ", res.weather)
        this.setState({
          isLoading: false,
          weather: res.weather[0],
          city: res.name,
          temperature: res.main.temp
        })
      })
      .catch(err => {
        console.log("error: ", err)
      })
  }
  render() {
    return (
      <View style={styles.container} >
        {
          this.state.isLoading ?
            (<Text>Loading</Text>) :
            (<Weather weather={this.state.weather} city={this.state.city} temperature={this.state.temperature}></Weather>)
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

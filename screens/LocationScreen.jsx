import React, {useEffect, useState} from 'react';
import {Platform, Text, View, Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Geolocation from '@react-native-community/geolocation';
import {PermissionsAndroid} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';

function LocationScreen() {
  const [currentLongitude, setCurrentLongitude] = useState('...');
  const [currentLatitude, setCurrentLatitude] = useState('...');
  const [locationStatus, setLocationStatus] = useState('');
  const netInfo = useNetInfo();

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        setLocationStatus('You are Here');
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Longitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        //getting the Latitude from the location json
        setCurrentLongitude(currentLongitude);
        //Setting state Longitude to re re-render the Longitude Text
        setCurrentLatitude(currentLatitude);
        //Setting state Latitude to re re-render the Longitude Text
      },
      error => {
        setLocationStatus(error.message);
      },
      {enableHighAccuracy: false, timeout: 30000, maximumAge: 1000},
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      position => {
        setLocationStatus('You are Here');
        //Will give you the location on location change
        console.log(position);
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Longitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        //getting the Latitude from the location json
        setCurrentLongitude(currentLongitude);
        //Setting state Longitude to re re-render the Longitude Text
        setCurrentLatitude(currentLatitude);
        //Setting state Latitude to re re-render the Longitude Text
      },
      error => {
        setLocationStatus(error.message);
      },
      {enableHighAccuracy: false, maximumAge: 1000},
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
      }}>
      <Text>Location</Text>
      <Text style={{fontWeight: 'bold'}}>{locationStatus}</Text>
      <Text
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 16,
        }}>
        Longitude: {currentLongitude}
      </Text>
      <Text
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 16,
        }}>
        Latitude: {currentLatitude}
      </Text>
      <Text
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 16,
        }}>
        Network Type: {netInfo.type}
      </Text>
      <Text
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 16,
        }}>
        Is Connected? {netInfo.isConnected?.toString()}
      </Text>
      <Text
        style={{
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 16,
        }}>
        Network Type: {JSON.stringify(netInfo.details)}
      </Text>
      <View style={{marginTop: 20}}>
        <Button title="Get Location" onPress={getOneTimeLocation} />
      </View>
    </SafeAreaView>
  );
}

export default LocationScreen;

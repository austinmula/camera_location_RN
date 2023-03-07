import React, {useEffect, useRef, useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {RNCamera} from 'react-native-camera';

function CameraScreen() {
  const camera = useRef(null);
  const [takingPicture, setTakingPicture] = useState(false);
  const [currentLongitude, setCurrentLongitude] = useState('...');
  const [currentLatitude, setCurrentLatitude] = useState('...');
  const [locationStatus, setLocationStatus] = useState('');

  takePicture = async () => {
    if (camera && !takingPicture) {
      getOneTimeLocation();
      let options = {
        quality: 0.85,
        fixOrientation: true,
        forceUpOrientation: true,
      };

      setTakingPicture(true);

      try {
        const data = await camera.current.takePictureAsync(options);
        Alert.alert(
          'Success',
          JSON.stringify({
            image: data.uri,
            longitude: currentLongitude,
            latitude: currentLatitude,
          }),
        );
      } catch (err) {
        Alert.alert('Error', 'Failed to take picture: ' + (err.message || err));
        return;
      } finally {
        setTakingPicture(false);
      }
    }
  };

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

  return (
    <View style={{flex: 1}}>
      <RNCamera
        ref={camera}
        captureAudio={false}
        style={StyleSheet.absoluteFill}
        type={RNCamera.Constants.Type.back}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      />
      <TouchableOpacity
        onPress={takePicture}
        style={[
          styles.cameraButton,
          {
            transform: [{translateX: -35}],
          },
        ]}></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 5,
    left: '50%',
  },
});

export default CameraScreen;

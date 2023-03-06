import React, {useEffect, useRef, useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';

function CameraScreen() {
  const camera = useRef(null);
  const [takingPicture, setTakingPicture] = useState(false);
  takePicture = async () => {
    if (camera && !takingPicture) {
      let options = {
        quality: 0.85,
        fixOrientation: true,
        forceUpOrientation: true,
      };

      setTakingPicture(true);

      try {
        const data = await camera.current.takePictureAsync(options);
        Alert.alert('Success', JSON.stringify(data));
      } catch (err) {
        Alert.alert('Error', 'Failed to take picture: ' + (err.message || err));
        return;
      } finally {
        setTakingPicture(false);
      }
    }
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

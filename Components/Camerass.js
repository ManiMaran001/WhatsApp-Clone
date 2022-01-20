import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { AntDesign } from '@expo/vector-icons';

class Camerass extends React.Component{
  constructor(props){
    super(props)
    this.state={
      check:"clicked"
    }
  }
  render(){
       return (
    <View style={styles.container}>
      <Camera style={styles.camera}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={()=>this.props.onBack(this.state.check)}>
           <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
export default Camerass
import React, { Component } from 'react';
import { StyleSheet, View, Image, TabBarIOS, Text, TouchableOpacity, Alert } from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';

const logo = require ('../assets/mode.png');

export default class GameBoard extends Component {
  

  static navigationOptions = {
    title: 'Choose Mode',
  }
  
  render() {
    
      
      const { navigate } = this.props.navigation;
      const pic = this.props.navigation.state.params.pic;
  
  return (
    
    <View style={styles.container}>
    <Image source = {logo} style= {styles.logo} />
    <View style={styles.buttonArea}>
    <TouchableOpacity onPress={() => navigate('Easy', { pic: pic})}>
    <View style={styles.button}>
          <Text style={styles.buttonText}>EASY</Text>
          </View>
        </TouchableOpacity>
    <TouchableOpacity onPress={() => navigate('Hard', { pic: pic})}>
    <View style={styles.button}>
          <Text style={styles.buttonText}>HARD</Text>
          </View>
        </TouchableOpacity>  
    </View> 
    </View> 
        );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8ECAC1',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingTop: 20,
  },
  logo: {
    //tintColor: '#e74c3c',
    height: 250,
    width: 300,
    //alignItems: 'center',
    //borderRadius: 20,
    marginLeft: 10,
    marginRight: 10,
    padding: 20,
    paddingTop: 20,
    resizeMode: 'contain',
   // borderWidth: 3,
    //borderColor: "#F9690E"
  },

  buttonArea:{
    backgroundColor: '#8ECAC1',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingTop: 20,
   },
  button: {
    height: 35,
    width: 200,
    borderRadius: 4,
    padding: 10,
    paddingTop: 10,
    marginBottom: 20,
    backgroundColor: '#F9690E', 
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  }
});

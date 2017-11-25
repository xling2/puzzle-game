import React, { Component } from 'react';
import { StyleSheet, View, Image, TabBarIOS, Text, TouchableOpacity, } from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';

const Logo = require ('../assets/logo.png');

export default class GameBoard extends Component {
  

  static navigationOptions = {
    title: 'Home',
  }
  
  render() {
    
      
      const { navigate } = this.props.navigation;
  
  return (
    
    <View style={styles.container}>
    <Image source = {Logo} style= {styles.logo} />
    <View style={styles.buttonArea}>
    <TouchableOpacity onPress={() => navigate('ChoosePic')}>
    <View style={styles.button}>
          <Text style={styles.buttonText}>CHOOSE PIC</Text>
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
    //padding: 20,
    //paddingTop: 20,
  },
  logo: {
    //tintColor: '#e74c3c',
    height: 150,
    width: 300,
    alignItems: 'center',
    //borderRadius: 20,
    marginLeft: 10,
    marginRight: 10,
    padding: 20,
    paddingTop: 40,
    resizeMode: 'contain',
  },
  buttonArea:{
    backgroundColor: '#8ECAC1',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingTop: 40,
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

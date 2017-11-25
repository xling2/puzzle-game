import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';


//import Login from './Screens/Login';
//import Register  from './Screens/Register';
import Main from './Screens/Main.js'
import ChoosePic from './Screens/ChoosePic'
import GameBoard from './Screens/GameBoard'
import Easy from './Screens/NinePics'
import Hard from './Screens/SixteenPics'
import ImagePicker from './Screens/ImagePicker'


const App = StackNavigator({

  Main: {screen: Main},
  GameBoard: { screen: GameBoard },
  ChoosePic: { screen: ChoosePic },
  Easy: { screen: Easy },
  Hard: { screen: Hard },
  ImagePicker: { screen: ImagePicker},
})
export default App;
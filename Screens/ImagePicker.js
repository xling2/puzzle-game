import React from 'react';
import { Image, View, TouchableOpacity, StyleSheet, PixelRatio, Text, Alert } from 'react-native';
import { ImagePicker } from 'expo';
import {
    StackNavigator,
  } from 'react-navigation';


  const logo = require ('../assets/selectPic.png');

  export default class ImagePickerExample extends React.Component {
  
    static navigationOptions = {
        title: 'Upload Pic',
      }
  
  
    state = {
    image: null,
  };

  _onSubmit = () => {
    const { navigate } = this.props.navigation;
    let { image } = this.state;

     if (this.state.image === null) { // if validation fails, value will be null
       Alert.alert(
            'You need to upload pic!'
         )
        }
   else
    navigate('GameBoard', {pic: image })
        
}

  render() {
    let { image } = this.state;
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._pickImage}>
        <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
          { this.state.image === null ? <Image source = {logo} style= {styles.logo} /> :
            <Image style={styles.avatar} source={{uri: image}} />
          }
          </View>
          </TouchableOpacity>
<View style={styles.buttonArea}>
         < TouchableOpacity onPress={ this._onSubmit}>
    <View style={styles.button}>
          <Text style={styles.buttonText}>START GAME</Text>
          </View>
        </TouchableOpacity>

</View>    
      </View>
    );
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#8ECAC1'
    },
    avatarContainer: {
      backgroundColor: '#F9690E',
      borderColor: '#F9690E',
      borderWidth: 3 / PixelRatio.get(),
      justifyContent: 'center',
      alignItems: 'center'
    },
    avatar: {
      width: 250,
      height: 250,
      borderWidth: 3,
      borderColor: '#F9690E'
    },
    logo: {
      height: 150,
      width: 150,
      alignItems: 'center',
      marginLeft: 10,
      marginRight: 10,
      padding: 20,
      paddingTop: 10,
      marginBottom: 20,
      resizeMode: 'contain',
    },
    text: {
        textAlign: 'center',
        color: '#8ECAC1',
        fontWeight: 'bold',
        fontSize: 20,
    },
    buttonArea:{
        backgroundColor: '#8ECAC1',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        paddingTop: 40,
        borderRadius: 20,
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
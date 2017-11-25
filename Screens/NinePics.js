import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Dimensions,
    ScrollView,
    Text,
    ImageEditor,
    Button,
    Image,
    View,
    PanResponder,
    LayoutAnimation,
    Alert,
    TouchableOpacity,
}
    from
        'react-native';
import Croper from "../src/Croper";
import {
    StackNavigator,
  } from 'react-navigation';

  
  const WIDTH = Dimensions.get("window").width;


export default class NinePics extends Component<{}> {

    static navigationOptions = {
        title: 'Easy Mode',
      }

    constructor(props) {


        super(props);
        
        
        this.state = {
            myUrl: {uri: null},
            imgList: [],
        }


        //save pieces of image
        this.actBox = {
            up: {},
            down: {},
            left: {},
            right: {},
        }
        this._start();

    }


    _start() {
        const _IMG = this.props.navigation.state.params.pic;
        this.croper = new Croper(_IMG);
        this.croper.crop(3, 3).then((json) => {

            this.setState({imgList: this._upset(json.imageList)});
            this._getActBox();
        });
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderRelease: this._handlePanResponderMove.bind(this),
        });

    }

    _handlePanResponderMove(e, gestureState) {
        let minRange = 20;
        if (gestureState.dy < minRange * -1) {
            this._move("up");

        }
        else if (gestureState.dy > minRange) {
            this._move("down");
        }
        else if (gestureState.dx < minRange * -1) {
            this._move("left");
        }
        else if (gestureState.dx > minRange) {
            this._move("right");
        }
    }


    //shuffle pieces of image
    _upset(arr) {


        let result = arr;
        let indexList = [];
        for (let i = 0; i < arr.length; i++) {
            indexList.push(i);
        }
        


        let shuffle = () => {
            //switch
            let count = parseInt(10 + Math.random() * 10) * 2;//switch 20+40 times
            for (let i = 0; i < 2; i++) {
                let hold = null;
                var change1 = parseInt(Math.random() * (arr.length - 1));
                var change2 = parseInt(Math.random() * (arr.length - 1));
                hold = indexList[change1];
                indexList[change1] = indexList[change2];
                indexList[change2] = hold;
            }
        };
        shuffle();
        for (let i = 0; i < arr.length; i++) {
            result[i].currentIndex = indexList[i];
            if (i == arr.length - 1) {
                result[i].isNull = true;

            }
        }

        return result;
    }

    _getActBox() {
        //find null pics
        let blackBox = this.state.imgList.find((element) => {
            return element.isNull;
        });

        let c = blackBox.currentIndex;
        //find the row
        let c_r = parseInt(c / 3);
        //find the column
        let c_c = c % 3;

        let findElement = (r, c) => {
            return this.state.imgList.find((element) => {


                return element.currentIndex == (r * 3 + c);
            })
        };

        //position
        this.actBox.up = c_r > 0 ? findElement(c_r - 1, c_c) : {};
        this.actBox.down = c_r < 2 ? findElement(c_r + 1, c_c) : {};
        this.actBox.left = c_c > 0 ? findElement(c_r, c_c - 1) : {};
        this.actBox.right = c_c < 2 ? findElement(c_r, c_c + 1) : {};

        console.log("up", this.actBox.up.currentIndex);
        console.log("down", this.actBox.down.currentIndex);
        console.log("left", this.actBox.left.currentIndex);
        console.log("right", this.actBox.right.currentIndex);
    }

    _move(direction) {

        let blackBox = this.state.imgList.find((element) => {
            return element.isNull;
        });

        let changeBoxCurrentIndex = (box1Index, box2Index) => {

            if (box1Index == undefined || box2Index == undefined) {
                return;
            }


            let imgList = this.state.imgList;

            console.log("box1", box1Index);
            console.log("box2", box2Index);
            let box1 = imgList.find((element) => element.currentIndex == box1Index);
            let box2 = imgList.find((element) => element.currentIndex == box2Index);
            let temp = box1.currentIndex;
            box1.currentIndex = box2.currentIndex;
            box2.currentIndex = temp;
            LayoutAnimation.easeInEaseOut();
            this.setState({imgList: imgList}, (() => {
                this._getActBox();
                this._check();
            }).bind(this));


        }


        switch (direction) {
            case "up":
                changeBoxCurrentIndex(this.actBox.down.currentIndex, blackBox.currentIndex);
                break;
            case "down":
                changeBoxCurrentIndex(this.actBox.up.currentIndex, blackBox.currentIndex);
                break;
            case "left":
                changeBoxCurrentIndex(this.actBox.right.currentIndex, blackBox.currentIndex);
                break;
            case "right":
                changeBoxCurrentIndex(this.actBox.left.currentIndex, blackBox.currentIndex);
                break;
        }

    }

    _check() {
        let result = !this.state.imgList.some((item) => {
            return item.index !== item.currentIndex
        });
        console.log(this.state.imgList);
        console.log("check_" + result);
        if (result) {
            Alert.alert(
                'Congratulations!',
                'You Finish the game!',
                [
                    {text: 'Start Again', onPress: () => this._start()},
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
                ],
                {cancelable: false}
            )

        }
    }


    render() {

        
        return (

            <View style={styles.container}
                  {...this._panResponder.panHandlers}>
                <View style={styles.board}>
                    {this.state.imgList.map((img, index) => {
                        if (img.isNull) return null;
                        return (
                            <Image style={{
                                width: img.fullWidth * 0.93,
                                height: img.fullHeight * 0.93,
                                position: "absolute",

                                top: parseInt(img.currentIndex / 3) * img.fullWidth * 0.93,
                                left: img.currentIndex % 3 * img.fullWidth * 0.93,
                                borderWidth: 1,
                                borderColor: "#F9690E"
                            }} key={index}
                                   source={{uri: img.uri}}/>
                        )
                    })}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8ECAC1',
        paddingTop: Dimensions.get('window').height * 0.16,

    },
    board:{
     height: Dimensions.get('window').height * 0.53,
     width: Dimensions.get('window').width * 0.945,
     borderWidth: 3,
     borderColor: "#F9690E",
     marginLeft: 10,
     marginRight: 10, 
     paddingTop: 20,
     backgroundColor: '#F9690E', 
    },
    opView: {},
    canvas: {
        flex: 1
    },

});
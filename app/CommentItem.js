'use strict';

import React, { Component } from 'react';
import { 
    ActivityIndicatorIOS,
    ListView,
    StyleSheet,
    Text,
    Image,
    FlatList,
    View,
    Dimensions,
    TouchableHighlight,
    TextInput,
    PixelRatio
 } from 'react-native';


const screen = Dimensions.get('window');

import HTML from 'react-native-htmlview';
import ParallaxView from 'react-native-parallax-view';
//import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from './helpers/api';
import getImage from './helpers/getImage'; 
import Loading from './Loading';

class CommentItem extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <View>
                <TouchableHighlight 
                    onPress={this.props.onSelect.bind(this,this.props.comment)}
                    underlayColor={'#f3f3f3'}
                >
                    <View>
                        <Image 
                            source={getImage.authorAvatar(this.props.comment.user)}
                        />
                        <View >
                            <Text>{this.props.comment.user.name}</Text>
                            <View>
                                <HTML value={this.props.comment.body} />
                            </View>
                        </View>
                        <View style={ styles.cellBorder} />
                    </View>
                </TouchableHighlight>
            </View>
        )}
}

const styles = StyleSheet.create({
    cellBorder:{
        backgroundColor: 'rgba(0,0,0,0.2)',
        height: 1 / PixelRatio.get(),
        marginLeft: 4,
    }
})

export default CommentItem;

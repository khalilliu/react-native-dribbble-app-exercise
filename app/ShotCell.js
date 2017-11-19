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

import api from './helpers/api';
import getImage from './helpers/getImage';

const screen = Dimensions.get('window');

class ShotCell extends Component {
    
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <View>
                <TouchableHighlight onPress={this.props.onSelect}>
                    <View style={styles.row}>
                        <Image
                            source={getImage.shotImage(this.props.shot)}
                            style={styles.cellImage}
                            accessible={true}  
                        />
                    </View>
                </TouchableHighlight>
                <View style={styles.cellBorder} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textContainer:{
        flex:1,
    },
    row:{
        backgroundColor: '#fff',
        flexDirection: 'column',
    },
    cellImage:{
        height:300,
        width: screen.width,
        backgroundColor: 'transparent',
        resizeMode: 'cover',
    },
    cellBorder:{
        backgroundColor: "rgba(0,0,0,0.42)",
        height: 1 / PixelRatio.get(),
        marginLeft: 4,
    },
})

export default ShotCell;

'use strict';

import React from 'react';
import { 
    ActivityIndicator,
    StyleSheet,
    Dimensions,
    View
 } from 'react-native';
 
const {width,height} = Dimensions.get('window');
var Loading = (props) => (
        <View style={[styles.container, styles.centerText]}>
            <ActivityIndicator
                animating={props.isLoading}
                style={styles.spinner}
            />
        </View>
        );

var  styles = StyleSheet.create({
    container: {
        flex: 1,
        width:width,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    centerText: {
        alignItems: 'center',
    },
    spinner: {
        width: 50,
    }
});

export default Loading;


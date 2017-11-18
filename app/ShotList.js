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
    TextInput
 } from 'react-native';
import api from './helpers/api';
// import ShotCell from './ShotCell';
// import ShotDetails from './ShotDetails';
// import Loading from './Loading';

const resultCache = {
    dataFromQuery: [],
    nextPageNumberForQuery: [],
    totalForQuery: [],
};

const LOADING = {};

class ShotList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isLoadingTail: false,
            dataSource: [],
            filter: this.props.filter,
            queryNumber: 0
        };
        this.getShots = this.getShots.bind(this);
        this.renderItem = this.renderItem.bind(this);
    }

    componentWillMount() {
        this.getShots(this.state.filter);
    }

    getShots(query) {
        const cashedResultsFromQuery = resultCache.dataFromQuery[query];
        if (cashedResultsFromQuery) {
            if (!LOADING[query]) {
                this.setState({
                    dataSource: cashedResultsFromQuery,
                    isLoading: false
                });
            } else {
                this.setState({ isLoading: true });
            }
            return;
        }
        LOADING[query] = true;
        resultCache.dataFromQuery[query] = null;
        this.setState({
            isLoading: true,
            queryNumber: this.state.queryNumber + 1,
            isLoadingTail: false,
        });

        api.getShotsByType(query, 1)
            .catch((error) => {
                LOADING[query] = false;
                resultCache.dataFromQuery[query] = undefined;
                this.setState({
                    dataSource: [],
                    isLoading: false
                });
            })
            .then((responseData) => {
                LOADING[query] = false;
                resultCache.dataFromQuery[query] = responseData;
                resultCache.nextPageNumberForQuery[query] = 2;

                this.setState({
                    isLoading: false,
                    dataSource: responseData
            });       
       })
       .done();   
    }

    renderItem({ item, index }) {
        return (
            <View>
                <Text>{item.title}</Text>
                <View>
                <Image
                source={{ uri: item.images.normal }}
                style={styles.cellImage}
                accessible
                />
                </View>
            </View>);
    }

    render() {
        const content = () => (<FlatList data={this.state.dataSource} renderItem={this.renderItem} />);
        return (
            <View style={styles.container}>
                <View style={styles.separator} />
                {content()}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    separator: {
        height: 1,
        backgroundColor: '#eee',
    },
    cellImage: {
        height: 300,
        width: 300,
        backgroundColor: 'transparent',
        resizeMode: 'cover'
      },
    scrollSpinner: {
        marginVertical: 20,
    }
});

export default ShotList;

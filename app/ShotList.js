'use strict';

import React, { Component } from 'react';
import { 
    ActivityIndicator,
    ListView,
    StyleSheet,
    Text,
    Image,
    FlatList,
    View,
    TextInput
 } from 'react-native';
import api from './helpers/api';
import ShotCell from './ShotCell';
import Loading from './Loading';
import ShotDetails from './ShotDetails';

const resultCache = {
    dataFromQuery: [],
    nextPageNumberForQuery: [],
    totalForQuery: [],
};

const LOADING = {};

class ShotList extends Component {
    static get defaultProps(){
        return({
            filter: ''
        })
    }
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isLoadingTail: false,
            dataSource: [],
            filter: this.props.filter || 'default',
            queryNumber: 0
        };
        this.getShots = this.getShots.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.onEndReached = this.onEndReached.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.onSelect = this.selectShot.bind(this);
    }

    componentWillMount() {
        this.getShots(this.state.filter);
    } 

    onEndReached() {
        const query = this.state.filter;
        if (!this.hasMore() || this.state.isLoadingTail) {
            return;
        }
        if (LOADING[query]) {
            return;
        }
        LOADING[query] = true;
        this.setState({
            queryNumber: this.state.queryNumber + 1,
            isLoadingTail: true,
        });

        const page = resultCache.nextPageNumberForQuery[query];
        api.getShotsByType(query, page)
            .catch((err) => {
                LOADING[query] = false;
                this.setState({ isLoadingTail: false });
            })
            .then(responseData => {
                let shotsForQuery = resultCache.dataFromQuery[query].slice();

                LOADING[query] = false;
                if (!responseData) {
                    resultCache.totalForQuery[query] = shotsForQuery.length;
                } else {
                    shotsForQuery = [...shotsForQuery, ...responseData];
                    resultCache.dataFromQuery[query] = shotsForQuery;
                    resultCache.nextPageNumberForQuery[query] += 1;  
                }
               this.setState({
                    dataSource: shotsForQuery,
                    isLoadingTail: false
               });
            });
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

    hasMore(){
        const query = this.state.filter;
        if (!resultCache.dataFromQuery[query]) {
            return true;
        }
        return (
            resultCache.totalForQuery[query] !== resultCache.dataFromQuery[query].length
        );
    }
    

    selectShot(shot) {
        this.props.navigator.push({
            component: ShotDetails,
            passProps: {shot},
            title: shot.title
        });
    }

    renderFooter() {
        return (
            <View style={styles.scrollSpinner}>
                <Loading isLoading={this.state.isLoading || this.state.isLoadingTail} />
            </View>
        );
    }

    renderItem({ item, index }) {
        return (<ShotCell onSelect={() => this.selectShot(item)} shot={item} key={index} />);
    }

    render() {
        let content;
        if (this.state.dataSource.length == 0) {
              content = <Loading isLoading={this.state.isLoading || this.state.isLoadingTail} />; 
        } else {
            content = (<FlatList 
                    data={this.state.dataSource} 
                    ListFooterComponent={this.renderFooter()}
                    renderItem={this.renderItem} 
                    onEndReached={this.onEndReached}
                    keyExtractor={(item, index) => index}
                    keyboardDismissMode='on-drag'
                    keyboardShouldPersistTaps='always'
                    showsVerticalScrollIndicator={false}
            />);
            }
        return (
            <View style={styles.container}>
                <View style={styles.separator} />
                {content}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    separator: {
        height: 1,
        backgroundColor: '#eeeeee',
    },
    scrollSpinner: {
        marginVertical: 20,
    }
});

export default ShotList;

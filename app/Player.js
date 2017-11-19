'use strict';

import React, { Component } from 'react';
import { 
    Image,
    PixelRatio,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    ActivityIndicatorIOS,
    View,
    ListView,
    Dimensions,
    Animated,
    Modal,
    FlatList,
 } from 'react-native';
import HTML from 'react-native-htmlview';
import ParallaxView from 'react-native-parallax-view';
//import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from './helpers/api';
import getImage from './helpers/getImage'; 
import Loading from './Loading';
import CommentItem from './CommentItem';
import { BlurView, VibrancyView } from 'react-native-blur';
import ShotCell from './ShotCell';
import ShotDetails from './ShotDetails';

const screen = Dimensions.get('window');

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            isLoading: false,
            dataSource: []
        }; 
        this.renderItem = this.renderItem.bind(this);
        this.selectShot = this.selectShot.bind(this);
    }

    componentWillMount() {
        console.log(this.props.player)
        api.getResources(this.props.player.shots_url).then((responseData) => {
            this.setState({
                dataSource: responseData,
                isLoading: false
            });
        }).done();
    }

    openModal() {
        this.setState({
            isModalOpen: true
        });
    }

    closeModal() {
        this.setState({
            isModalOpen: false
        });
    }

    renderShots() {
        return (
            <FlatList 
                data={this.state.dataSource}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => index}
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps={'always'}
                showsVerticalScrollIndicator={false}
            />
        );
    }

    selectShot(shot) {
        
        shot.user = this.props.player;
        console.log(shot);
        this.props.navigator.push({
            component: ShotDetails,
            passProps: {shot},
            title: shot.title
        });
    }

    renderItem({ item, index }) {
        return (<ShotCell onSelect={() => this.selectShot(item)} shot={item} key={index} />);
    }
    render() {
        return (
            <ParallaxView
                windowHeight={260}
                style={styles.marginTop}
                backgroundSource={getImage.authorAvatar(this.props.player)}
                //scrollableViewStyle={{ backgroundColor: 'red' }}
                blur={'dark'}
                header={(
                    <View>
                    <BlurView
                    style={styles.absolute}
                    blurType="dark"
                    blurAmount={80}
                    />
                    <TouchableOpacity 
                         style={styles.parallaxViewBg}
                         onPress={() => this.openModal()}
                    >
                        <View>
                        <View style={styles.headerContent}>
                            <View style={styles.innerHeaderContent}>
                                <Image
                                    source={getImage.authorAvatar(this.props.player)}
                                    style={styles.playerAvatar}
                                />
                                <Text style={styles.playerUsername}>{this.props.player.username}</Text>
                                <Text style={styles.playerName}>{this.props.player.name}</Text>
            
                                 <View style={styles.playerDetailsRow}>
                                    <View style={styles.playerCounter}>
                                        <Icon name="users" size={18} color='#fff' />
                                        <Text style={styles.playerCounterValue}>{this.props.player.followers_count}</Text>
                                    </View>
                                    <View style={styles.playerCounter}>
                                        <Icon name="camera-retro" size={18} color='#fff' />
                                        <Text style={styles.playerCounterValue}>{this.props.player.shots_count}</Text>
                                    </View>
                                    <View style={styles.playerCounter}>
                                        <Icon name="heart-o" size={18} color='#fff' />
                                        <Text style={styles.playerCounterValue}>{this.props.player.likes_count}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        </View>
                    </TouchableOpacity>
                    </View>
                )}
            >
               <View style={styles.shotlist}>
                    {this.state.dataSource.length !== 0 ? this.renderShots() : <Loading /> }
               </View> 
               <Modal
visible={this.state.isModalOpen}
                      animationType={'fade'}
                      transparent={false}
               >
                    <TouchableHighlight onPress={() => { this.closeModal(); }}>
                        <View>
                        <View style={styles.bgModal} />
                        <Image 
                            source={getImage.authorAvatar(this.props.player)}
                            style={styles.playerImageModal}
                        />
                        </View>
                    </TouchableHighlight>
               </Modal>
               
            </ParallaxView>
        );
    }
}


const styles = StyleSheet.create({
    absolute: {
        position: 'absolute',
        marginTop: 80,
        top: 0,
left: 0,
bottom: 0,
right: 0
    },
    parallaxViewBg: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    marginTop: {
        marginTop: 0,
    },
    listStyle: {
      flex: 1,
      backgroundColor: 'red'
    },
    listView: {
      flex: 1,
      backgroundColor: 'coral'
    },
    spinner: {
      width: 50,
    },
    headerContent: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    innerHeaderContent: {
      marginTop: 30,
      alignItems: 'center'
    },
    playerInfo: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      flexDirection: 'row'
    },
    playerUsername: {
      color: '#fff',
      fontWeight: '300'
    },
    playerName: {
      fontSize: 14,
      color: '#fff',
      fontWeight: '900',
      lineHeight: 18
    },
    //Player details list
    playerDetailsRow: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      width: screen.width / 2,
      marginTop: 40
    },
    playerCounter: {
      flex: 1,
      alignItems: 'center'
    },
    playerCounterValue: {
      color: '#fff',
      fontWeight: '900',
      fontSize: 14,
      marginTop: 5,
    },
    absolute: {

    },
    playerAvatar: {
      //top:80,
      width: 80,
      height: 80,
      borderRadius: 40,
      borderWidth: 2,
      borderColor: '#fff',
      marginBottom: 10
    },
    //Modal
    playerImageModal: {
      height: screen.height / 3,
      resizeMode: 'contain'
    },
    //playerContent
    playerContent: {
      padding: 20
    }
  });
  
export default Player;

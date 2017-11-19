'use stict';

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

const screen = Dimensions.get('window');

class ShotDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            isLoading: false,
            dataSource: []
        };
        
      
    }
   
    componentDidMount() {
        api.getResources(this.props.shot.comments_url)
            .then((responseData) => {
                this.setState({
                    dataSource: [...responseData],
                    isLoading: false
                });
            }).done();
    }
    openModal() {
        this.setState({ isModalOpen: true });
    }
    closeModal() {
        this.setState({ isModalOpen: false });
    }
    selectPlayer(player) {

    }

    renderCommentList() {
      let content;
      if (this.state.dataSource.length == 0) {
        content = <Loading isLoading={this.state.isLoading} />;
      } else {
        content = (
        <View style={styles.sectionSpacing}>
            <View style={styles.separator} />
            <Text style={styles.heading}>Comments</Text>
            <View style={styles.separator} />
            <View>
              <FlatList 
                data={this.state.dataSource} 
                renderItem={
                    ({item,index}) => <CommentItem comment={item} onSelect={()=> this.selectPlayer(item.user)}></CommentItem>
                  } 
                keyExtractor={(item,index)=> index}
              />            
            </View>
        </View>);
      }
      return content;
    }

    // _renderItem({ comment, index }) {
    //   return (<CommentItem onSelect={() => this.selectPlayer(comment.user)} comment={comment} key={index} />);
    // }

    render() {
        const player = this.props.shot.user;
        return (
            <ParallaxView
                backgroundSource={getImage.shotImage(this.props.shot)}
                windowHeight={300}
                header={(
                <TouchableOpacity onPress={this.openModal}>
                    <View style={styles.invisibleView} />
                </TouchableOpacity>
            )}
            >
            <View>
                <TouchableHighlight
                    style={styles.headerContent} 
                    onPress={this.selectPlayer.bind(this, player)}
                    underlayColor={'#eee'}
                    activeOpacity={0.95}
                >
                <View style={styles.headerContent}>
                    <Image
source={getImage.authorAvatar(player)} 
                           style={styles.playerAvatar}
                    />
                    <Text style={styles.shotTitle}>{this.props.shot.title}</Text>
                    <Text style={styles.playerContent}>by<Text style={styles.player}>{player.name}</Text></Text>
                </View>
                </TouchableHighlight>
                <View style={styles.mainSection}>
                    <View style={styles.shotDetailsRow}>
                        <View style={styles.shotCounter}>
                            <Icon name='heart-o' size={24} color='#333333' />
                            <Text style={styles.shotCounterText}>{this.props.shot.likes_count}</Text>
                        </View>
                        <View style={styles.shotCounter}>
                          <Icon name='comments-o' size={24} color='#333333' />
                          <Text style={styles.shotCounterText}>{this.props.shot.comments_count}</Text>
                        </View>
                        <View style={styles.shotCounter}>
                          <Icon name='eye' size={24} color='#333333' />
                          <Text style={styles.shotCounterText}>{this.props.shot.views_count}</Text>
                        </View>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.description}>
                      <HTML
                            value={this.props.shot.description || 'no description'}
                            style={styles.description}
                      />
                    </View>
                    <View>
                     {this.renderCommentList()}
                    </View>
                </View>
            </View>
            <Modal visible={this.state.isModalOpen}>
              <Image  
                source={getImage.hdImage(this.props.shot)} 
                style={styles.customModalImage} 
                resizeMode="contain"
              />
            </Modal>
        </ParallaxView>
        );
    }
}


const styles = StyleSheet.create({
    spinner: {
      marginTop: 20,
      width: 50
    },
    a: {
      fontWeight: '300',
      color: '#ea4c89'
    },
    p: {
      marginBottom: 0,
      flexDirection: 'row',
      marginTop: 0,
    },
    invisibleView: {
      flex: 1,
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    customModalImage: {
      height: screen.height / 2
    },
    headerContent: {
      flex: 1,
      paddingBottom: 20,
      paddingTop: 40,
      alignItems: 'center',
      width: screen.width,
      backgroundColor: '#fff'
    },
    shotTitle: {
      fontSize: 16,
      fontWeight: '400',
      color: '#ea4c89',
      lineHeight: 18
    },
    playerContent: {
      fontSize: 12
    },
    player: {
      fontWeight: '900',
      lineHeight: 18
    },
    playerAvatar: {
      borderRadius: 40,
      width: 80,
      height: 80,
      position: 'absolute',
      bottom: 60,
      left: screen.width / 2 - 40,
      borderWidth: 2,
      borderColor: '#fff'
    },
    rightPane: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center'
    },
    shotDetailsRow: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      flexDirection: 'row'
    },
    shotCounter: {
      flex: 2,
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    shotCounterText: {
      color: '#333'
    },
    mainSection: {
      flex: 1,
      alignItems: 'stretch',
      padding: 10,
      backgroundColor: 'white'
    },
    separator: {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      height: 1 / PixelRatio.get(),
      marginVertical: 10,
    },
    description: {
      flex: 1,
    },
    sectionSpacing: {
      marginTop: 20
    },
    heading: {
      fontWeight: '700',
      fontSize: 16
    }
  });


  export default ShotDetails;
  

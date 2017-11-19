/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  TabBarIOS
} from 'react-native';
import ShotList from './app/ShotList';
import Icon from 'react-native-vector-icons/FontAwesome';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedTab: 'default'
    };
    this._renderContent= this._renderContent.bind(this)
  }

  _renderContent(category, title) {
    return (
      <NavigatorIOS
        style={styles.wrapper}
        initialRoute={{
          component: ShotList,
          title,
          passProps: { filter: category }
        }}                
      />
    );
  }

  render() {
    return (
    <TabBarIOS tintColor={'#ea4c89'}>
      <Icon.TabBarItem 
        title='All'
        iconName='dribbble'
        selectedIconName='dribbble'
        selected={this.state.selectedTab == 'default'}
        onPress={() => this.setState({
          selectedTab: 'default',
        })
        }
        >
        {this._renderContent('default', 'All')}
        </Icon.TabBarItem>
        <Icon.TabBarItem 
          title='Debuts'
          iconName='trophy'
          selectedIconName='trophy'
          selected={this.state.selectedTab == 'debuts'}
          onPress={()=> this.setState({
            selectedTab: 'debuts',
          })
        }
        >
          {this._renderContent('debuts', 'Debuts')}
      </Icon.TabBarItem>
      <Icon.TabBarItem 
          title='Animated'
          iconName='heart'
          selectedIconName='heart'
          selected={this.state.selectedTab == 'animated'}
          onPress={() => this.setState({
            selectedTab: 'animated',
          })
        }
      >
        {this._renderContent('animated', 'Animated')}
        </Icon.TabBarItem>
        <Icon.TabBarItem 
          title='Rebounds'
          iconName='lightbulb-o'
          selectedIconName='lightbulb-o'
          selected={this.state.selectedTab == 'rebounds'}
          onPress={() => this.setState({
            selectedTab:'rebounds',
          })
        }
      >
        {this._renderContent('rebounds', 'Rebounds')}
      </Icon.TabBarItem>
    </ TabBarIOS>
    )
  } 
  
  // render() {
  //   return (
  //     <View style={styles.container}>
  //       <ShotList filter="debuts" />
  //     </View>
  //   );
  // }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
  wrapper: {
    flex: 1
  },
});

export default  App;
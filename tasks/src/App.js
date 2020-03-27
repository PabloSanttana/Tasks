import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import Routes from './Navigation'

import * as Font from 'expo-font'

export default class App extends React.Component{

  async componentDidMount() {
    await Font.loadAsync({
      'Lato': require('../assets/fonts/Lato.ttf')
    });
    this.setState({ fontLoaded: true })
  }
  state = {
    fontLoaded: false
  }

  render() {
   
      if ( this.state.fontLoaded ) {
        return (
            <Routes/>
        )
      } else {
        return (
            <View style={styles.container}>
               <Image
              style={{width: 100, height: 100}}
              source={require('../assets/carregando.gif')}/>
            </View>
        )
      }
   
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    fontFamily: 'Lato'
  }
});

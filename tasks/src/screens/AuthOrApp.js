import React,{Component} from 'react'
import axios from 'axios'
import { View, ActivityIndicator, StyleSheet, AsyncStorage, Image  } from 'react-native'

export default class AuthOrApp extends Component {

    // pegando os dados do usuario o local
    componentWillMount =async () =>{
        const json = await AsyncStorage.getItem('userData')
        const userData = JSON.parse(json) || {}

        if(userData.token) {
            // depois fazer uma validação no back
            axios.defaults.headers.common['Authorization']=`bearer ${userData.token}`
            this.props.navigation.navigate('Agenda', userData)
        }else{
            this.props.navigation.navigate('Auth')
        }
    }

    render(){
        return(
            <View style={styles.container}>
                    <Image
                style={{width: 100, height: 100}}
                source={require('../../assets/carregando.gif')}/>
         </View>
        )
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
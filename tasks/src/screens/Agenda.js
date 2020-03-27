import React, { Component } from 'react'
import { View, Text, StyleSheet, ImageBackground, Image, FlatList, TouchableOpacity, Platform, AsyncStorage, Alert  } from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br'

import Icon from 'react-native-vector-icons/FontAwesome'
import ActionButton from 'react-native-action-button'
import axios from 'axios'

import { server, showError }  from '../common'
import commonStyles from '../commonStyles'
import Taks from '../components/taks'
import AddTask from './AddTask'

import todayImage from '../../assets/imgs/today.jpg'
import tomorrowImage from '../../assets/imgs/tomorrow.jpg'
import weekImage from '../../assets/imgs/week.jpg'
import monthImage from '../../assets/imgs/month.jpg'

import * as Font from 'expo-font'

export default class Agenda extends Component {

    async componentDidMount() {
        //await Font.loadAsync({
            //'Lato': require('../../assets/fonts/Lato.ttf')
       // });
       await this.loadTasks()
       this.setState({fontLoaded: true })
       
    }
    state = {
        fontLoaded: false,
            tasks: [
        
            ],
            visibleTasks: [],
            showDoneTasks: true,
            showAddTask: false
    }
  
    addTask = async task =>{
      try {
            await axios.post(`${server}/tasks`,{
                desc: task.desc,
                estimateAt: task.date
            })
            this.setState({ showAddTask: false}, this.loadTasks)
      } catch (err) {
        showError(err)
      }
    }

    deleteTask = async (id) =>{
      
        try {
            await axios.delete(`${server}/tasks/${id}`)
             this.loadTasks()
        } catch (err) {
            showError(err)
        }
          //  filtrando é removendo o id selecionado do array de tarrefas para dps da o push para o estado principal
       // const tasks = this.state.tasks.filter(task => task.id !== id)
        // aplicando no estado do component e filtrando para tirar o apagado
       // this.setState({tasks}, this.filterTasks)

    }

    filterTasks=()=>{
        if(this.state.tasks.length >=0){
        let visibleTasks = null
        if (this.state.showDoneTasks) {
            visibleTasks = [...this.state.tasks]
        }else {
            const pending = task => task.doneAt === null
            visibleTasks = this.state.tasks.filter(pending)
        }
        this.setState({visibleTasks})
     }
    }

    toggleFilter = () =>{
        this.setState({showDoneTasks: !this.state.showDoneTasks},this.filterTasks)
        
    }

    toggleTask = async id => {
       
            try{
                await axios.put(`${server}/tasks/${id}/toggle`)
                await this.loadTasks()

            }catch(err){
                showError(err)
            }
    
    }

    loadTasks =  async () => {
        try {
            const maxDate = moment()
                            .add({days: this.props.daysAhead})
                            .format('YYYY-MM-DD 23:59')
            const res = await axios.get(`${server}/tasks?date=${maxDate}`)
            this.setState({ tasks: res.data}, this.filterTasks)
        }catch(err){
            showError(err)
        }
    }

    render() {
        let styleColo = null
        let image = null
        

        switch (this.props.daysAhead) {
            case 0:
                styleColo = commonStyles.colors.today
                image = todayImage
                 
                break;
            case 1:
                styleColo = commonStyles.colors.tomorrow
                image = tomorrowImage
                 
                break;
            
            case 7:
                styleColo = commonStyles.colors.week
                image = weekImage
                 
                break;
        
            default:
                styleColo = commonStyles.colors.month
                image = monthImage
                 
                break;
        }


        if (this.state.fontLoaded) {
            return (
                <View style={styles.container}>
                    <AddTask isVisible={this.state.showAddTask} onSave={this.addTask} onCancel={()=> this.setState({showAddTask: false})} />
                    <ImageBackground source={image} style={styles.background}>
                        <View style={styles.iconBar}>
                            <TouchableOpacity onPress={()=> this.props.navigation.openDrawer()}>
                                <Icon name='bars' size={20} color={commonStyles.colors.secondary} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.toggleFilter}>
                                <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'} size={20} color={commonStyles.colors.secondary}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.titleBar}>
                            <Text style={styles.title}>{this.props.title}</Text>
                            <Text style={styles.subtitle}>{moment().locale('pt-br').format('ddd, D [de] MMMM')}</Text>
                        </View>
                    </ImageBackground>
                    <View style={styles.taksContainer}>
                    <FlatList data={this.state.visibleTasks} keyExtractor={item => `${item.id}`}
                            renderItem={({item}) => <Taks {...item} onToggleTask={this.toggleTask} onDelete={this.deleteTask} />}  />
                    </View>
                    <ActionButton buttonColor={styleColo} onPress={() => {this.setState({ showAddTask: true})}} />
                </View>
            )

        } else {
            return (
                <View style={styles.Carregamento}>
                    <Image
                        style={{ width: 100, height: 100 }}
                        source={require('../../assets/carregando.gif')} />
                </View>
            )
        }

    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,

    },
    Carregamento:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    background:{
        flex: 3,
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    title: {
            fontFamily: 'Lato',
            color: commonStyles.colors.secondary,
            fontSize: 50,
            marginLeft: 20,
            marginBottom: 10,
    },
    subtitle: {
        fontFamily: 'Lato',
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30,

    },
    taksContainer:{
        flex: 7,

    },
    iconBar: {
        marginTop:   30 ,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }

})

import React,{Component} from 'react'
import { StyleSheet, Text , View, TouchableWithoutFeedback, Modal, TextInput, DatePickerIOS, TouchableOpacity, Alert , DatePickerAndroid, Platform } from 'react-native'

import moment from 'moment'



import commonStyles from '../commonStyles'


export default class AddTask extends Component{

        constructor(props) {
            super(props)
            this.state = this.getInitialState()
        }

        getInitialState = () => {
            return {
                desc: '',
                date: new Date()
            }
        }

        save = () =>{
            if (!this.state.desc.trim()) {
                Alert.alert('Dados inválidos', 'Informe uma descrição')
                return
            }
            const data = {...this.state}
             // onSave função que o pai vai mandar para esse compoment   
            this.props.onSave(data)
            //// restaurando o state inicial
        }

        handleDateAndroidChanged = () =>{
                DatePickerAndroid.open({
                    date: this.state.date
                }).then(e =>{
                    if (e.action !== DatePickerAndroid.dismissedAction) {
                        const momentDate = moment(this.state.date)
                        momentDate.date(e.day)
                        momentDate.month(e.month)
                        momentDate.year(e.year)
                        // toDate transforma para data do JS
                        this.setState({ date: momentDate.toDate()})
                        
                    }
                })
        }
      

        render() {
            let datePicker = null
            if (Platform.OS === 'ios') {
                datePicker =  <DatePickerIOS mode='date' date={this.state.date} onDateChange={date => this.setState({date})}/>
            } else {
                datePicker = (
                    <TouchableOpacity onPress={this.handleDateAndroidChanged}>
                        <Text style={styles.date}>
                            {moment(this.state.date).format('ddd, D [de] MMMM [de] YYYY')}
                        </Text>
                    </TouchableOpacity>
                )
            }
            return (
                <Modal onRequestClose={this.props.onCancel}
                    visible={this.props.isVisible}
                    animationType='slide' transparent={true}
                    onShow={()=> this.setState({...this.getInitialState() })}>
                        
                        <TouchableWithoutFeedback onPress={this.props.onCancel}>
                            <View style={styles.offset}></View>
                        </TouchableWithoutFeedback>

                        <View style={ styles.container}>
                            <Text style={ styles.header}>Nova Tarefa!</Text>
                            <TextInput placeholder='Descrição...' style={styles.input} onChangeText={ desc => this.setState({ desc})} value={this.state.desc} />
                                {datePicker}
                            <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                                <TouchableOpacity onPress={this.props.onCancel}>
                                    <Text style={styles.button}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.save}>
                                    <Text style={styles.button}>Salvar</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                        <TouchableWithoutFeedback onPress={this.props.onCancel}>
                            <View style={styles.offset}></View>
                        </TouchableWithoutFeedback>
                </Modal>
            )
        }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'space-between'
    },
    offset: {
        flex:1,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: commonStyles.colors.default
    },
    header: {
        fontFamily: 'Lato',
        backgroundColor: commonStyles.colors.default,
        color: commonStyles.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 15,
    },
    input: {
        fontFamily: 'Lato',
        width: '90%',
        height: 40,
        marginTop: 10,
        marginLeft: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#e3e3e3',
        borderRadius: 6,
    },
    date: {
        fontFamily: 'Lato',
        fontSize: 20,
        marginLeft: 10,
        marginTop:10,
        textAlign: 'center'

    }
})
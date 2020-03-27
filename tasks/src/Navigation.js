import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'


import Menu from './screens/Menu'
import Auth from './screens/Auth'
import Agenda from './screens/Agenda'
import AuthOrApp from  './screens/AuthOrApp'

const MenuRoutes = {
    Today: {
        name:'Today',
        screen : props=> <Agenda title='Hoje' daysAhead={0} {...props}/>,
        navigationOptions:{
            title:'Hoje'
        }
    },
    Tomorrow: {
        name:'Tomorrow',
        screen : props=> <Agenda title='Amanhã' daysAhead={1} {...props}/>,
        navigationOptions:{
            title:'Amanhã'
        }
    },
    Week: {
        name:'Week',
        screen : props=> <Agenda title='Semana' daysAhead={7} {...props}/>,
        navigationOptions:{
            title:'Semana'
        }
    },
    Month: {
        name:'Month',
        screen : props=> <Agenda title='Mês' daysAhead={30} {...props}/>,
        navigationOptions:{
            title:'Mês'
        }
    }
}
const MenuConfig = {
    initialRouteName: 'Today',
    contentComponent: props => <Menu {...props}/>,
    contentOptions:{
        activeTintColor: '#080',
        labelStyle:{
            fontFamily:'Lato',
            fontWeight: 'normal',
            fontSize: 20,
        }
    },
}

const MenuNavigation = createDrawerNavigator(MenuRoutes, MenuConfig);

const MainRoutes = {
    Loading:{
        name:'Loading',
        screen: AuthOrApp
    },
    Auth :{
        name:'Auth',
        screen: Auth,
        
    },
    Agenda:{
        name:'Agenda',
        screen: MenuNavigation,  
       
    }, 
}


const Routes = createAppContainer(
    createSwitchNavigator( MainRoutes, { initialRouteName: 'Loading'} )
)

export default Routes

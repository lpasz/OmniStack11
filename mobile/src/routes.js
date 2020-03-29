import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

const AppStack = createStackNavigator();

import Incidents from './pages/incidents'
import Detail from './pages/detail'

export default function Routes()
{
    return (
        <NavigationContainer>
            <AppStack.Navigator headerMode="none">
                <AppStack.Screen name='Incidents' component={Incidents} />
                <AppStack.Screen name='Details' component={Detail} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}
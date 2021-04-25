import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialIcons } from '@expo/vector-icons'

import { MyPlants } from '../pages/MyPlants'
import { PlantSelect } from '../pages/PlantSelect'

import colors from '../styles/colors'

const tabRoutes = createBottomTabNavigator()

const AuthRoutes = () => {
    return (
        <tabRoutes.Navigator
            tabBarOptions={{
                activeTintColor: colors.green,
                inactiveTintColor: colors.heading,
                labelPosition: 'beside-icon',
                style: {
                    paddingHorizontal: 20,
                    height: 70
                }
            }}>
            <tabRoutes.Screen
                name='Nova planta'
                component={PlantSelect}
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcons name="add-circle-outline" size={size} color={color} />
                    ))
                }} />
            <tabRoutes.Screen
                name='Minhas plantas'
                component={MyPlants}
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcons
                            name="format-list-bulleted"
                            size={size}
                            color={color}
                        />
                    ))
                }} />
        </tabRoutes.Navigator>
    )
}

export default AuthRoutes
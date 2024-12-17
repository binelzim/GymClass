import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Entypo } from '@expo/vector-icons';
import { Image, TouchableOpacity, Text, View } from 'react-native';

import Home from './Home';
import Perfil from './Perfil';
import Treino from './Treino';
import TreinoIniciar from './treinoInicair'; 

const Tab = createBottomTabNavigator();
const TreinoStack = createStackNavigator();

function TreinoStackScreen() {
    return (
        <TreinoStack.Navigator>
            <TreinoStack.Screen
                name="Treino"
                component={Treino}
                options={{
                    headerShown: false, 
                }}
            />
            <TreinoStack.Screen
                name="TreinoIniciar"
                component={TreinoIniciar}
                options={{
                    headerShown: false, 
                }}
            />
        </TreinoStack.Navigator>
    );
}

export default function Routes() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle:{
                    backgroundColor: 'rgba(27, 27, 27, 1)',
                    display: "flex" ,
                    borderTopColor: 'transparent', 
                },
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'yellow',
                style: {
                    backgroundColor: 'rgba(27, 27, 27, 1)', 
                },
                tabBarShowLabel: false, 
            }}
        >
            <Tab.Screen 
                name="Home" 
                component={Home} 
                options={{
                    tabBarIcon: ({size, color}) => (
                        <Entypo name="home" size={size} color={color}/>
                    ),
                    tabBarLabel: 'Início',
                    headerStyle: {
                        backgroundColor: 'rgba(27, 27, 27, 1)', 
                    },
                    headerTintColor: 'yellow', 
                    headerShadowVisible: false, 
                }}
            />
            <Tab.Screen
                name="Treino"
                component={TreinoStackScreen}
                options={({ navigation }) => ({
                    tabBarLabel: 'Treino',
                    tabBarIcon: ({size, color}) => (
                        <Image source={require('./img/peso.png')} style={{ width: size, height: size, tintColor: color }} />
                    ),
                    headerStyle: {
                        backgroundColor: 'rgba(27, 27, 27, 1)', // Mesma cor da tab bar
                    },
                    headerTintColor: 'yellow', // Cor do texto amarelo
                    headerShadowVisible: false, // Remove a linha abaixo do cabeçalho
                })}
            />
            <Tab.Screen
                name="Perfil"
                component={Perfil}
                options={({ navigation }) => ({
                    tabBarLabel: 'Perfil',
                    tabBarIcon: ({size, color}) => (
                        <Entypo name="user" size={size} color={color}/>
                    ),
                    headerStyle: {
                        backgroundColor: 'rgba(27, 27, 27, 1)', 
                    },
                    headerTintColor: 'yellow', 
                    headerShadowVisible: false, 
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => {
                            
                                navigation.navigate('Configurações');
                            }}
                            style={{ marginRight: 10 }}
                        >
                            <Entypo name="cog" size={24} color="yellow" />
                        </TouchableOpacity>
                    ),
                })}
            />
        </Tab.Navigator>
    );
}

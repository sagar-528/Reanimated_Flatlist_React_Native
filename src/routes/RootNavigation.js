import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tab_Indicator from '../screen/Tab_Indicator';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Custom_Tab' screenOptions={{ headerShown: false}}>
        <Stack.Screen name="Custom_Tab" component={Tab_Indicator} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigation

const styles = StyleSheet.create({})
import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from './DashboardScreen';
import ProfileScreen from './ProfileScreen';
// import Update from './Update';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#469FEF',
        tabBarStyle: {
          height: 50,
          elevation: 10,
          backgroundColor: '#ffffff',
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Dashboard',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../assets/dashboard.png')}
              style={[styles.icon, { tintColor: color }]}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}

        options={{
          tabBarLabel: 'Profile',
          headerShown: false,
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../assets/profile.png')}
              style={[styles.icon, { tintColor: color }]}
            />

           
          ),
        }}
      />
       {/* <Tab.Screen
            name='Update'
            component={Update}/> */}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

export default TabNavigation;

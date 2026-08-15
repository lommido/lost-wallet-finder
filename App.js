import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ReportLostScreen from './screens/ReportLostScreen';
import FindWalletScreen from './screens/FindWalletScreen';
import MyReportsScreen from './screens/MyReportsScreen';
import { WalletProvider } from './context/WalletContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <WalletProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'ReportLost') {
                iconName = focused ? 'alert-circle' : 'alert-circle-outline';
              } else if (route.name === 'FindWallet') {
                iconName = focused ? 'magnify' : 'magnify';
              } else if (route.name === 'MyReports') {
                iconName = focused ? 'format-list-bulleted' : 'format-list-bulleted';
              }
              return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#007AFF',
            tabBarInactiveTintColor: 'gray',
            headerShown: true,
            headerStyle: {
              backgroundColor: '#007AFF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        >
          <Tab.Screen
            name="ReportLost"
            component={ReportLostScreen}
            options={{ title: 'Report Lost Wallet' }}
          />
          <Tab.Screen
            name="FindWallet"
            component={FindWalletScreen}
            options={{ title: 'Found a Wallet?' }}
          />
          <Tab.Screen
            name="MyReports"
            component={MyReportsScreen}
            options={{ title: 'My Reports' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </WalletProvider>
  );
}

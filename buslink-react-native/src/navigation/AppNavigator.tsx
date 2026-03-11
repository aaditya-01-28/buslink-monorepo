import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import {
    OnboardingScreen,
    LoginScreen,
    SignupScreen,
    VerificationScreen,
    HomeScreen,
    SearchLocationScreen,
    BusTrackingScreen,
    AccountScreen,
} from '../screens';

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Onboarding"
                screenOptions={{
                    headerShown: false,
                    cardStyle: { backgroundColor: 'white' },
                }}
            >
                <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
                <Stack.Screen name="Verification" component={VerificationScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="SearchLocation" component={SearchLocationScreen} />
                <Stack.Screen name="BusTracking" component={BusTrackingScreen} />
                <Stack.Screen name="Account" component={AccountScreen} />
                <Stack.Screen
                    name="UpdateAccount"
                    component={() => null} // Placeholder, create later if needed
                />
                <Stack.Screen
                    name="ChangePassword"
                    component={() => null} // Placeholder, create later if needed
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

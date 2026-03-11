import { LatLng } from 'react-native-maps';

// Navigation types
export type RootStackParamList = {
    Onboarding: undefined;
    Login: undefined;
    Signup: undefined;
    Verification: { phoneNumber: string };
    Home: undefined;
    SearchLocation: { searchType: 'origin' | 'destination' };
    BusTracking: { busId: string };
    Account: undefined;
    UpdateAccount: undefined;
    ChangePassword: undefined;
};

// Data models
export interface BusRoute {
    id: string;
    routeNumber: string;
    routeName: string;
    startPoint: string;
    endPoint: string;
    duration: string;
    distance: string;
    fare: string;
    stops: BusStop[];
    polylinePoints: LatLng[];
}

export interface BusStop {
    id: string;
    name: string;
    location: LatLng;
    routes: string[];
    arrivalTime: string;
}

export interface Bus {
    id: string;
    routeNumber: string;
    routeName: string;
    currentLocation: LatLng;
    speed: number;
    capacity: number;
    occupancy: number;
    status: 'on_time' | 'delayed' | 'crowded';
    nextStop: string;
    eta: string;
}

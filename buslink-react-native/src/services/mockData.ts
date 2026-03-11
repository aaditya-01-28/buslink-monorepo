import { LatLng } from 'react-native-maps';
import { Bus, BusRoute, BusStop } from '../types';

// Mock data for development - same structure as Flutter version
export class MockData {
    // Default map center (New Delhi, India)
    static defaultCenter: LatLng = {
        latitude: 28.6139,
        longitude: 77.2090,
    };

    // Sample bus routes
    static routes: BusRoute[] = [
        {
            id: '1',
            routeNumber: '101',
            routeName: 'City Center - Airport',
            startPoint: 'City Center',
            endPoint: 'Airport Terminal',
            duration: '45 min',
            distance: '18 km',
            fare: '₹40',
            stops: [
                {
                    id: 's1',
                    name: 'City Center',
                    location: { latitude: 28.6139, longitude: 77.2090 },
                    routes: ['101', '102'],
                    arrivalTime: '10:00 AM',
                },
                {
                    id: 's2',
                    name: 'Metro Station',
                    location: { latitude: 28.6289, longitude: 77.2195 },
                    routes: ['101'],
                    arrivalTime: '10:15 AM',
                },
                {
                    id: 's3',
                    name: 'Mall Road',
                    location: { latitude: 28.6439, longitude: 77.2300 },
                    routes: ['101', '103'],
                    arrivalTime: '10:30 AM',
                },
                {
                    id: 's4',
                    name: 'Airport Terminal',
                    location: { latitude: 28.5562, longitude: 77.1000 },
                    routes: ['101'],
                    arrivalTime: '10:45 AM',
                },
            ],
            polylinePoints: [
                { latitude: 28.6139, longitude: 77.2090 },
                { latitude: 28.6289, longitude: 77.2195 },
                { latitude: 28.6439, longitude: 77.2300 },
                { latitude: 28.5562, longitude: 77.1000 },
            ],
        },
        {
            id: '2',
            routeNumber: '102',
            routeName: 'Railway Station - University',
            startPoint: 'Railway Station',
            endPoint: 'University Campus',
            duration: '35 min',
            distance: '12 km',
            fare: '₹30',
            stops: [
                {
                    id: 's5',
                    name: 'Railway Station',
                    location: { latitude: 28.6415, longitude: 77.2193 },
                    routes: ['102'],
                    arrivalTime: '09:00 AM',
                },
                {
                    id: 's6',
                    name: 'City Center',
                    location: { latitude: 28.6139, longitude: 77.2090 },
                    routes: ['101', '102'],
                    arrivalTime: '09:12 AM',
                },
                {
                    id: 's7',
                    name: 'Market Square',
                    location: { latitude: 28.6042, longitude: 77.2010 },
                    routes: ['102'],
                    arrivalTime: '09:20 AM',
                },
                {
                    id: 's8',
                    name: 'University Campus',
                    location: { latitude: 28.5975, longitude: 77.1890 },
                    routes: ['102', '104'],
                    arrivalTime: '09:35 AM',
                },
            ],
            polylinePoints: [
                { latitude: 28.6415, longitude: 77.2193 },
                { latitude: 28.6139, longitude: 77.2090 },
                { latitude: 28.6042, longitude: 77.2010 },
                { latitude: 28.5975, longitude: 77.1890 },
            ],
        },
    ];

    // Sample buses currently running
    static activeBuses: Bus[] = [
        {
            id: 'b1',
            routeNumber: '101',
            routeName: 'City Center - Airport',
            currentLocation: { latitude: 28.6289, longitude: 77.2195 },
            speed: 45.0,
            capacity: 50,
            occupancy: 32,
            status: 'on_time',
            nextStop: 'Mall Road',
            eta: '5 min',
        },
        {
            id: 'b2',
            routeNumber: '102',
            routeName: 'Railway Station - University',
            currentLocation: { latitude: 28.6139, longitude: 77.2090 },
            speed: 38.0,
            capacity: 50,
            occupancy: 45,
            status: 'crowded',
            nextStop: 'Market Square',
            eta: '3 min',
        },
        {
            id: 'b3',
            routeNumber: '101',
            routeName: 'City Center - Airport',
            currentLocation: { latitude: 28.6439, longitude: 77.2300 },
            speed: 50.0,
            capacity: 50,
            occupancy: 18,
            status: 'on_time',
            nextStop: 'Airport Terminal',
            eta: '8 min',
        },
    ];

    // Helper to check if bus is crowded
    static isBusCrowded(bus: Bus): boolean {
        return bus.occupancy > bus.capacity * 0.8;
    }
}

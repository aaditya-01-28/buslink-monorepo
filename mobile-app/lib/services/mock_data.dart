import 'package:google_maps_flutter/google_maps_flutter.dart';

// Mock data for development - No backend needed
class MockData {
  // Sample bus routes
  static final List<BusRoute> routes = [
    BusRoute(
      id: '1',
      routeNumber: '101',
      routeName: 'City Center - Airport',
      startPoint: 'City Center',
      endPoint: 'Airport Terminal',
      duration: '45 min',
      distance: '18 km',
      fare: '₹40',
      stops: [
        BusStop(
          id: 's1',
          name: 'City Center',
          location: const LatLng(28.6139, 77.2090),
          routes: ['101', '102'],
          arrivalTime: '10:00 AM',
        ),
        BusStop(
          id: 's2',
          name: 'Metro Station',
          location: const LatLng(28.6289, 77.2195),
          routes: ['101'],
          arrivalTime: '10:15 AM',
        ),
        BusStop(
          id: 's3',
          name: 'Mall Road',
          location: const LatLng(28.6439, 77.2300),
          routes: ['101', '103'],
          arrivalTime: '10:30 AM',
        ),
        BusStop(
          id: 's4',
          name: 'Airport Terminal',
          location: const LatLng(28.5562, 77.1000),
          routes: ['101'],
          arrivalTime: '10:45 AM',
        ),
      ],
      polylinePoints: const [
        LatLng(28.6139, 77.2090),
        LatLng(28.6289, 77.2195),
        LatLng(28.6439, 77.2300),
        LatLng(28.5562, 77.1000),
      ],
    ),
    BusRoute(
      id: '2',
      routeNumber: '102',
      routeName: 'Railway Station - University',
      startPoint: 'Railway Station',
      endPoint: 'University Campus',
      duration: '35 min',
      distance: '12 km',
      fare: '₹30',
      stops: [
        BusStop(
          id: 's5',
          name: 'Railway Station',
          location: const LatLng(28.6415, 77.2193),
          routes: ['102'],
          arrivalTime: '09:00 AM',
        ),
        BusStop(
          id: 's6',
          name: 'City Center',
          location: const LatLng(28.6139, 77.2090),
          routes: ['101', '102'],
          arrivalTime: '09:12 AM',
        ),
        BusStop(
          id: 's7',
          name: 'Market Square',
          location: const LatLng(28.6042, 77.2010),
          routes: ['102'],
          arrivalTime: '09:20 AM',
        ),
        BusStop(
          id: 's8',
          name: 'University Campus',
          location: const LatLng(28.5975, 77.1890),
          routes: ['102', '104'],
          arrivalTime: '09:35 AM',
        ),
      ],
      polylinePoints: const [
        LatLng(28.6415, 77.2193),
        LatLng(28.6139, 77.2090),
        LatLng(28.6042, 77.2010),
        LatLng(28.5975, 77.1890),
      ],
    ),
  ];

  // Sample buses currently running
  static final List<Bus> activeBuses = [
    Bus(
      id: 'b1',
      routeNumber: '101',
      routeName: 'City Center - Airport',
      currentLocation: const LatLng(28.6289, 77.2195),
      speed: 45.0,
      capacity: 50,
      occupancy: 32,
      status: 'on_time',
      nextStop: 'Mall Road',
      eta: '5 min',
    ),
    Bus(
      id: 'b2',
      routeNumber: '102',
      routeName: 'Railway Station - University',
      currentLocation: const LatLng(28.6139, 77.2090),
      speed: 38.0,
      capacity: 50,
      occupancy: 45,
      status: 'crowded',
      nextStop: 'Market Square',
      eta: '3 min',
    ),
    Bus(
      id: 'b3',
      routeNumber: '101',
      routeName: 'City Center - Airport',
      currentLocation: const LatLng(28.6439, 77.2300),
      speed: 50.0,
      capacity: 50,
      occupancy: 18,
      status: 'on_time',
      nextStop: 'Airport Terminal',
      eta: '8 min',
    ),
  ];

  // Default map center (New Delhi, India)
  static const LatLng defaultCenter = LatLng(28.6139, 77.2090);
}

// Data models
class BusRoute {
  final String id;
  final String routeNumber;
  final String routeName;
  final String startPoint;
  final String endPoint;
  final String duration;
  final String distance;
  final String fare;
  final List<BusStop> stops;
  final List<LatLng> polylinePoints;

  BusRoute({
    required this.id,
    required this.routeNumber,
    required this.routeName,
    required this.startPoint,
    required this.endPoint,
    required this.duration,
    required this.distance,
    required this.fare,
    required this.stops,
    required this.polylinePoints,
  });
}

class BusStop {
  final String id;
  final String name;
  final LatLng location;
  final List<String> routes;
  final String arrivalTime;

  BusStop({
    required this.id,
    required this.name,
    required this.location,
    required this.routes,
    required this.arrivalTime,
  });
}

class Bus {
  final String id;
  final String routeNumber;
  final String routeName;
  final LatLng currentLocation;
  final double speed;
  final int capacity;
  final int occupancy;
  final String status; // 'on_time', 'delayed', 'crowded'
  final String nextStop;
  final String eta;

  Bus({
    required this.id,
    required this.routeNumber,
    required this.routeName,
    required this.currentLocation,
    required this.speed,
    required this.capacity,
    required this.occupancy,
    required this.status,
    required this.nextStop,
    required this.eta,
  });

  bool get isCrowded => occupancy > capacity * 0.8;
}

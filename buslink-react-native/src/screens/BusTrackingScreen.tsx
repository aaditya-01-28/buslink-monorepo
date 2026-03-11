import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform } from 'react-native';
// Conditional import - only load react-native-maps on native platforms
let MapView: any, Marker: any, PROVIDER_GOOGLE: any;
if (Platform.OS !== 'web') {
    const maps = require('react-native-maps');
    MapView = maps.default;
    Marker = maps.Marker;
    PROVIDER_GOOGLE = maps.PROVIDER_GOOGLE;
}
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types';
import { BackButton } from '../components';
import { MockData } from '../services/mockData';
import { Colors, spacing, borderRadius } from '../theme';

type BusTrackingScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'BusTracking'
>;
type BusTrackingScreenRouteProp = RouteProp<RootStackParamList, 'BusTracking'>;

interface Props {
    navigation: BusTrackingScreenNavigationProp;
    route: BusTrackingScreenRouteProp;
}

export const BusTrackingScreen: React.FC<Props> = ({ navigation, route }) => {
    const { busId } = route.params;
    const bus = MockData.activeBuses[0]; // Simulate finding bus by ID

    return (
        <View style={styles.container}>
            {Platform.OS !== 'web' ? (
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={{
                        ...bus.currentLocation,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    }}
                    showsUserLocation
                >
                    <Marker
                        coordinate={bus.currentLocation}
                        title={`Bus ${bus.routeNumber}`}
                    >
                        <View style={styles.busMarker}>
                            <Ionicons name="bus" size={28} color={Colors.white} />
                        </View>
                    </Marker>
                </MapView>
            ) : (
                <View style={styles.webFallback}>
                    <Ionicons name="map" size={80} color={Colors.primaryBlue} />
                    <Text style={styles.webTitle}>Map view available on native devices only</Text>
                </View>
            )}

            <SafeAreaView style={styles.header}>
                <BackButton color={Colors.white} />
                <Text style={styles.headerTitle}>Track Bus</Text>
            </SafeAreaView>

            <View style={styles.infoCard}>
                <View style={styles.busInfo}>
                    <Text style={styles.busNumber}>{busId}</Text>
                    <Text style={styles.routeInfo}>Route {bus.routeNumber}</Text>
                </View>
                <View style={styles.busStats}>
                    <View style={styles.stat}>
                        <Text style={styles.statLabel}>ETA</Text>
                        <Text style={styles.statValue}>{bus.eta}</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statLabel}>Speed</Text>
                        <Text style={styles.statValue}>{bus.speed} km/h</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statLabel}>Seats</Text>
                        <Text style={styles.statValue}>{bus.capacity - bus.occupancy}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.md,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: Colors.white,
        marginLeft: spacing.md,
    },
    busMarker: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: Colors.primaryBlue,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    infoCard: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: spacing.lg,
    },
    busInfo: {
        marginBottom: spacing.md,
    },
    busNumber: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.textDark,
        marginBottom: 4,
    },
    routeInfo: {
        fontSize: 16,
        color: Colors.textGrey,
    },
    busStats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    stat: {
        alignItems: 'center',
    },
    statLabel: {
        fontSize: 14,
        color: Colors.textGrey,
        marginBottom: 4,
    },
    statValue: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.primaryBlue,
    },
    webFallback: {
        flex: 1,
        backgroundColor: Colors.backgroundLight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    webTitle: {
        fontSize: 18,
        color: Colors.textGrey,
        marginTop: spacing.md,
    },
});

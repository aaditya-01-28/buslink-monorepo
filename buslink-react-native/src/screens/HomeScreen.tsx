import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Platform,
} from 'react-native';
// Conditional import - only load react-native-maps on native platforms
let MapView: any, Marker: any, Polyline: any, PROVIDER_GOOGLE: any;
if (Platform.OS !== 'web') {
    const maps = require('react-native-maps');
    MapView = maps.default;
    Marker = maps.Marker;
    Polyline = maps.Polyline;
    PROVIDER_GOOGLE = maps.PROVIDER_GOOGLE;
}
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types';
import { MockData } from '../services/mockData';
import { Colors, spacing, borderRadius } from '../theme';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
    navigation: HomeScreenNavigationProp;
}

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const [selectedDestination, setSelectedDestination] = useState<string | null>(null);

    const routeColors = [
        '#3D5A80', // Primary Blue - Route 101
        '#4A7DFF', // Accent Blue - Route 102
        '#28A745', // Green - Route 103
        '#FF6B35', // Orange - Route 104
    ];

    return (
        <View style={styles.container}>
            {/* Google Map - Only on native platforms */}
            {Platform.OS !== 'web' ? (
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={{
                        ...MockData.defaultCenter,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}
                    showsUserLocation
                    showsMyLocationButton={false}
                    toolbarEnabled={false}
                >
                    {/* Bus markers */}
                    {MockData.activeBuses.map((bus) => (
                        <Marker
                            key={bus.id}
                            coordinate={bus.currentLocation}
                            title={`Bus ${bus.routeNumber}`}
                            description={`${bus.nextStop} • ${bus.eta}`}
                            pinColor={Colors.accentBlue}
                        >
                            <View style={styles.busMarker}>
                                <Ionicons name="bus" size={24} color={Colors.white} />
                            </View>
                        </Marker>
                    ))}

                    {/* Bus stop markers */}
                    {MockData.routes.map((route) =>
                        route.stops.map((stop) => (
                            <Marker
                                key={stop.id}
                                coordinate={stop.location}
                                title={stop.name}
                                description={stop.routes.join(', ')}
                            >
                                <View style={styles.stopMarker}>
                                    <View style={styles.stopMarkerInner} />
                                </View>
                            </Marker>
                        ))
                    )}

                    {/* Route polylines */}
                    {MockData.routes.map((route, index) => (
                        <Polyline
                            key={route.id}
                            coordinates={route.polylinePoints}
                            strokeColor={routeColors[index % routeColors.length]}
                            strokeWidth={5}
                            lineCap="round"
                            lineJoin="round"
                            lineDashPattern={[20, 10]}
                        />
                    ))}
                </MapView>
            ) : (
                // Web fallback UI
                <View style={styles.webFallback}>
                    <Ionicons name="map" size={100} color={Colors.primaryBlue} />
                    <Text style={styles.webFallbackTitle}>Google Maps Not Available on Web</ Text>
                    <Text style={styles.webFallbackText}>
                        To see the full map experience with bus tracking, please run the app on:
                    </Text>
                    <View style={styles.webOptions}>
                        <Text style={styles.webOption}>📱 Android device/emulator: npx expo run:android</Text>
                        <Text style={styles.webOption}>📲 iOS device/emulator: npx expo run:ios</Text>
                        <Text style={styles.webOption}>📱 Expo Go app: Scan QR code from npx expo start</Text>
                    </View>
                    <Text style={styles.webNote}>
                        You can still navigate through other screens using the buttons below.
                    </Text>
                </View>
            )}

            {/* Top search bar */}
            <SafeAreaView style={styles.topContainer}>
                <View style={styles.searchContainer}>
                    {/* Profile avatar */}
                    <TouchableOpacity
                        style={styles.profileButton}
                        onPress={() => navigation.navigate('Account')}
                    >
                        <Ionicons name="person" size={24} color={Colors.primaryBlue} />
                    </TouchableOpacity>

                    {/* Search field */}
                    <TouchableOpacity
                        style={styles.searchField}
                        onPress={() =>
                            navigation.navigate('SearchLocation', { searchType: 'destination' })
                        }
                    >
                        <Text style={styles.searchText}>
                            {selectedDestination || 'Where do you want to go?'}
                        </Text>
                        <Ionicons name="search" size={20} color={Colors.primaryBlue} />
                    </TouchableOpacity>

                    {/* Route icon */}
                    <TouchableOpacity style={styles.routeButton}>
                        <Ionicons name="git-network" size={24} color={Colors.primaryBlue} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {/* Bottom sheet */}
            {selectedDestination && (
                <View style={styles.bottomSheet}>
                    <View style={styles.handleBar} />

                    {/* Nearest stop card */}
                    <View style={styles.nearestStopCard}>
                        <View style={styles.nearestStopHeader}>
                            <Ionicons name="location-outline" size={20} color={Colors.white} />
                            <Text style={styles.nearestStopLabel}>Nearest Stop</Text>
                        </View>
                        <View style={styles.nearestStopContent}>
                            <View>
                                <Text style={styles.stopName}>Telibandha Chowk</Text>
                                <Text style={styles.stopTime}>Reach by 13:15</Text>
                            </View>
                            <View style={styles.distanceContainer}>
                                <Text style={styles.distanceText}>250m</Text>
                                <View style={styles.navigationIcon}>
                                    <Ionicons name="navigate" size={20} color={Colors.primaryBlue} />
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Bus info card */}
                    <TouchableOpacity
                        style={styles.busCard}
                        onPress={() => navigation.navigate('BusTracking', { busId: 'CG04LF8526' })}
                    >
                        <View style={styles.busCardHeader}>
                            <View style={styles.busStatusRow}>
                                <Ionicons name="bus" size={20} color={Colors.primaryBlue} />
                                <Text style={styles.busStatus}>On its way</Text>
                            </View>
                            <View style={styles.busNumberBadge}>
                                <Text style={styles.busNumber}>CG04LF8526</Text>
                            </View>
                        </View>

                        <View style={styles.busDetailRow}>
                            <View style={styles.busIcon}>
                                <Ionicons name="bus" size={24} color={Colors.primaryBlue} />
                            </View>
                            <View style={styles.busDetails}>
                                <Text style={styles.busDestination}>Gandhi Udyan</Text>
                                <View style={styles.busMetaRow}>
                                    <Text style={styles.busDistance}>3 km</Text>
                                    <View style={styles.onTimeBadge}>
                                        <Text style={styles.onTimeText}>On Time</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.etaContainer}>
                                <Text style={styles.etaTime}>15min</Text>
                                <Text style={styles.etaLabel}>away</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            )}
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
    busMarker: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.accentBlue,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    stopMarker: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: Colors.warningOrange,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stopMarkerInner: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.white,
    },
    topContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    searchContainer: {
        flexDirection: 'row',
        padding: spacing.md,
        gap: spacing.md,
    },
    profileButton: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.primaryBlue,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
    },
    searchField: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: borderRadius.full,
        paddingHorizontal: spacing.md,
        paddingVertical: 12,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
    },
    searchText: {
        flex: 1,
        fontSize: 14,
        color: Colors.textGrey,
    },
    routeButton: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
    },
    bottomSheet: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: spacing.lg,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
    },
    handleBar: {
        width: 40,
        height: 4,
        backgroundColor: '#E0E0E0',
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: spacing.md,
    },
    nearestStopCard: {
        backgroundColor: Colors.primaryBlue,
        borderRadius: borderRadius.lg,
        padding: spacing.md,
        marginBottom: spacing.md,
    },
    nearestStopHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    nearestStopLabel: {
        color: '#FFFFFFB3',
        fontSize: 14,
        marginLeft: spacing.sm,
    },
    nearestStopContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    stopName: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.white,
        marginBottom: 4,
    },
    stopTime: {
        fontSize: 12,
        color: '#FFFFFFCC',
    },
    distanceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF33',
        borderRadius: borderRadius.lg,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        gap: spacing.sm,
    },
    distanceText: {
        color: Colors.white,
        fontWeight: '600',
    },
    navigationIcon: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    busCard: {
        backgroundColor: `${Colors.lightBlue}4D`,
        borderRadius: borderRadius.lg,
        padding: spacing.md,
    },
    busCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    busStatusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    busStatus: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.textDark,
    },
    busNumberBadge: {
        backgroundColor: Colors.primaryBlue,
        borderRadius: borderRadius.lg,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    busNumber: {
        color: Colors.white,
        fontSize: 12,
        fontWeight: '600',
    },
    busDetailRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    busIcon: {
        width: 40,
        height: 40,
        borderRadius: borderRadius.sm,
        backgroundColor: `${Colors.primaryBlue}1A`,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    busDetails: {
        flex: 1,
    },
    busDestination: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.textDark,
        marginBottom: 4,
    },
    busMetaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    busDistance: {
        fontSize: 12,
        color: Colors.textGrey,
    },
    onTimeBadge: {
        backgroundColor: `${Colors.successGreen}1A`,
        borderRadius: borderRadius.sm,
        paddingHorizontal: spacing.sm,
        paddingVertical: 2,
    },
    onTimeText: {
        fontSize: 11,
        fontWeight: '500',
        color: Colors.successGreen,
    },
    etaContainer: {
        alignItems: 'flex-end',
    },
    etaTime: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.primaryBlue,
    },
    etaLabel: {
        fontSize: 12,
        color: Colors.primaryBlue,
    },
    // Web fallback styles
    webFallback: {
        flex: 1,
        backgroundColor: Colors.backgroundLight,
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.xl,
    },
    webFallbackTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.textDark,
        marginTop: spacing.lg,
        marginBottom: spacing.md,
        textAlign: 'center',
    },
    webFallbackText: {
        fontSize: 16,
        color: Colors.textGrey,
        textAlign: 'center',
        marginBottom: spacing.lg,
    },
    webOptions: {
        backgroundColor: Colors.white,
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
        marginBottom: spacing.lg,
        width: '100%',
        maxWidth: 500,
    },
    webOption: {
        fontSize: 14,
        color: Colors.textDark,
        marginBottom: spacing.sm,
        paddingVertical: spacing.sm,
    },
    webNote: {
        fontSize: 14,
        color: Colors.primaryBlue,
        textAlign: 'center',
        fontWeight: '600',
    },
});

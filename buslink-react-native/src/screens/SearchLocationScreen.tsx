import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types';
import { BackButton } from '../components';
import { Colors, spacing, borderRadius } from '../theme';

type SearchLocationScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'SearchLocation'
>;
type SearchLocationScreenRouteProp = RouteProp<RootStackParamList, 'SearchLocation'>;

interface Props {
    navigation: SearchLocationScreenNavigationProp;
    route: SearchLocationScreenRouteProp;
}

const mockLocations = [
    { id: '1', name: 'Telibandha Chowk', address: 'Raipur, Chhattisgarh' },
    { id: '2', name: 'Gandhi Udyan', address: 'Raipur, Chhattisgarh' },
    { id: '3', name: 'Marine Drive', address: 'Raipur, Chhattisgarh' },
    { id: '4', name: 'City Mall 36', address: 'Raipur, Chhattisgarh' },
];

export const SearchLocationScreen: React.FC<Props> = ({ navigation, route }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const { searchType } = route.params;

    const filteredLocations = searchQuery
        ? mockLocations.filter((loc) =>
            loc.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : mockLocations;

    const handleSelectLocation = (location: typeof mockLocations[0]) => {
        navigation.goBack();
        // Pass result back if needed
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <BackButton />
                <Text style={styles.title}>
                    {searchType === 'origin' ? 'Select Origin' : 'Select Destination'}
                </Text>
            </View>

            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color={Colors.textGrey} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search location..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    autoFocus
                />
            </View>

            <FlatList
                data={filteredLocations}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.locationItem}
                        onPress={() => handleSelectLocation(item)}
                    >
                        <View style={styles.locationIcon}>
                            <Ionicons name="location" size={24} color={Colors.primaryBlue} />
                        </View>
                        <View style={styles.locationInfo}>
                            <Text style={styles.locationName}>{item.name}</Text>
                            <Text style={styles.locationAddress}>{item.address}</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={Colors.textGrey} />
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundLight,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.md,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: Colors.textDark,
        marginLeft: spacing.md,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        margin: spacing.md,
        paddingHorizontal: spacing.md,
        paddingVertical: 12,
        borderRadius: borderRadius.lg,
        gap: spacing.md,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: Colors.textDark,
    },
    locationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        marginHorizontal: spacing.md,
        marginBottom: spacing.sm,
        padding: spacing.md,
        borderRadius: borderRadius.md,
    },
    locationIcon: {
        width: 40,
        height: 40,
        borderRadius: borderRadius.sm,
        backgroundColor: `${Colors.primaryBlue}1A`,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    locationInfo: {
        flex: 1,
    },
    locationName: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.textDark,
        marginBottom: 4,
    },
    locationAddress: {
        fontSize: 14,
        color: Colors.textGrey,
    },
});

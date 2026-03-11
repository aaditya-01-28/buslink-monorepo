import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types';
import { BackButton } from '../components';
import { Colors, spacing, borderRadius } from '../theme';

type AccountScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Account'>;

interface Props {
    navigation: AccountScreenNavigationProp;
}

export const AccountScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <BackButton />
                <Text style={styles.title}>Account</Text>
            </View>

            <ScrollView>
                <View style={styles.profileSection}>
                    <View style={styles.avatar}>
                        <Ionicons name="person" size={60} color={Colors.white} />
                    </View>
                    <Text style={styles.name}>John Doe</Text>
                    <Text style={styles.email}>john.doe@example.com</Text>
                </View>

                <View style={styles.menuSection}>
                    <MenuItem
                        icon="person-outline"
                        title="Update Profile"
                        onPress={() => navigation.navigate('UpdateAccount')}
                    />
                    <MenuItem
                        icon="lock-closed-outline"
                        title="Change Password"
                        onPress={() => navigation.navigate('ChangePassword')}
                    />
                    <MenuItem
                        icon="notifications-outline"
                        title="Notifications"
                        onPress={() => { }}
                    />
                    <MenuItem
                        icon="help-circle-outline"
                        title="Help & Support"
                        onPress={() => { }}
                    />
                    <MenuItem
                        icon="log-out-outline"
                        title="Logout"
                        onPress={() => navigation.replace('Login')}
                        isDestructive
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

interface MenuItemProps {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    onPress: () => void;
    isDestructive?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, title, onPress, isDestructive }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
        <View style={styles.menuItemLeft}>
            <View style={[styles.menuIcon, isDestructive && styles.destructiveIcon]}>
                <Ionicons
                    name={icon}
                    size={24}
                    color={isDestructive ? Colors.errorRed : Colors.primaryBlue}
                />
            </View>
            <Text style={[styles.menuTitle, isDestructive && styles.destructiveText]}>
                {title}
            </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={Colors.textGrey} />
    </TouchableOpacity>
);

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
    profileSection: {
        alignItems: 'center',
        padding: spacing.xl,
        backgroundColor: Colors.white,
        marginBottom: spacing.md,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: Colors.primaryBlue,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    name: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.textDark,
        marginBottom: 4,
    },
    email: {
        fontSize: 16,
        color: Colors.textGrey,
    },
    menuSection: {
        backgroundColor: Colors.white,
        padding: spacing.md,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: spacing.md,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuIcon: {
        width: 48,
        height: 48,
        borderRadius: borderRadius.md,
        backgroundColor: `${Colors.primaryBlue}1A`,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    destructiveIcon: {
        backgroundColor: `${Colors.errorRed}1A`,
    },
    menuTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.textDark,
    },
    destructiveText: {
        color: Colors.errorRed,
    },
});

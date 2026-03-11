import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types';
import { CustomButton } from '../components';
import { Colors, spacing, borderRadius } from '../theme';

type OnboardingScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Onboarding'
>;

interface Props {
    navigation: OnboardingScreenNavigationProp;
}

export const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {/* Illustration */}
                <View style={styles.illustrationContainer}>
                    <Ionicons name="bus" size={200} color={Colors.primaryBlue} />
                </View>

                {/* Content */}
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Welcome to BusLink</Text>
                    <Text style={styles.subtitle}>
                        Track your bus in real-time and never miss your ride
                    </Text>
                </View>

                {/* Features */}
                <View style={styles.featuresContainer}>
                    <Feature
                        icon="location"
                        text="Real-time bus tracking"
                    />
                    <Feature
                        icon="time"
                        text="Accurate arrival times"
                    />
                    <Feature
                        icon="map"
                        text="Route planning"
                    />
                </View>

                {/* Buttons */}
                <View style={styles.buttonContainer}>
                    <CustomButton
                        text="Get Started"
                        onPress={() => navigation.navigate('Login')}
                    />
                    <TouchableOpacity
                        style={styles.skipButton}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.skipText}>Skip</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

interface FeatureProps {
    icon: keyof typeof Ionicons.glyphMap;
    text: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, text }) => (
    <View style={styles.feature}>
        <View style={styles.featureIcon}>
            <Ionicons name={icon} size={24} color={Colors.primaryBlue} />
        </View>
        <Text style={styles.featureText}>{text}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundLight,
    },
    content: {
        flex: 1,
        padding: spacing.lg,
    },
    illustrationContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: Colors.textDark,
        marginBottom: spacing.md,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: Colors.textGrey,
        textAlign: 'center',
        paddingHorizontal: spacing.xl,
    },
    featuresContainer: {
        marginBottom: spacing.xl,
    },
    feature: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    featureIcon: {
        width: 48,
        height: 48,
        borderRadius: borderRadius.md,
        backgroundColor: `${Colors.primaryBlue}20`,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    featureText: {
        fontSize: 16,
        color: Colors.textDark,
        fontWeight: '500',
    },
    buttonContainer: {
        marginBottom: spacing.lg,
    },
    skipButton: {
        marginTop: spacing.md,
        alignSelf: 'center',
    },
    skipText: {
        fontSize: 16,
        color: Colors.textGrey,
        fontWeight: '600',
    },
});

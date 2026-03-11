import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../types';
import { CustomButton, CustomInput } from '../components';
import { Colors, Gradients, spacing, borderRadius } from '../theme';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
    navigation: LoginScreenNavigationProp;
}

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        setIsLoading(true);
        // TODO: Implement actual login logic with backend
        setTimeout(() => {
            setIsLoading(false);
            navigation.replace('Home');
        }, 1000);
    };

    const handleGoogleSignIn = () => {
        // TODO: Implement Google Sign-In
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={Gradients.authGradient.colors}
                start={Gradients.authGradient.start}
                end={Gradients.authGradient.end}
                style={styles.gradient}
            >
                <SafeAreaView style={styles.safeArea}>
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        {/* Bus illustration placeholder */}
                        <View style={styles.illustrationContainer}>
                            <Ionicons name="bus" size={120} color={Colors.white} />
                        </View>

                        {/* Login form */}
                        <View style={styles.formContainer}>
                            <Text style={styles.title}>Login</Text>
                            <View style={styles.subtitleRow}>
                                <Text style={styles.subtitle}>Don't have an account? </Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                                    <Text style={styles.link}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Email input */}
                            <CustomInput
                                hintText="Email"
                                prefixIcon="mail-outline"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />

                            {/* Password input */}
                            <View style={{ marginTop: spacing.md }}>
                                <CustomInput
                                    hintText="Password"
                                    prefixIcon="lock-closed-outline"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!isPasswordVisible}
                                    suffixIcon={
                                        <TouchableOpacity
                                            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                                        >
                                            <Ionicons
                                                name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
                                                size={22}
                                                color={Colors.textGrey}
                                            />
                                        </TouchableOpacity>
                                    }
                                />
                            </View>

                            <TouchableOpacity style={styles.forgotPassword}>
                                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                            </TouchableOpacity>

                            {/* Login button */}
                            <CustomButton
                                text="Login"
                                onPress={handleLogin}
                                isLoading={isLoading}
                            />

                            {/* Divider */}
                            <View style={styles.dividerContainer}>
                                <View style={styles.divider} />
                                <Text style={styles.dividerText}>Or</Text>
                                <View style={styles.divider} />
                            </View>

                            {/* Google sign-in button */}
                            <TouchableOpacity
                                style={styles.googleButton}
                                onPress={handleGoogleSignIn}
                            >
                                <Ionicons name="logo-google" size={24} color="#DB4437" />
                                <Text style={styles.googleButtonText}>Continue with Google</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    illustrationContainer: {
        height: 220,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        flex: 1,
        backgroundColor: Colors.white,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: spacing.lg,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: Colors.textDark,
        textAlign: 'center',
        marginBottom: spacing.sm,
    },
    subtitleRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: spacing.xl,
    },
    subtitle: {
        fontSize: 14,
        color: Colors.textGrey,
    },
    link: {
        fontSize: 14,
        color: Colors.primaryBlue,
        fontWeight: '600',
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginTop: spacing.sm,
        marginBottom: spacing.lg,
    },
    forgotPasswordText: {
        fontSize: 14,
        color: Colors.primaryBlue,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: spacing.lg,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.textLight,
    },
    dividerText: {
        marginHorizontal: spacing.md,
        fontSize: 14,
        color: Colors.textGrey,
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 56,
        backgroundColor: Colors.white,
        borderRadius: borderRadius.full,
        borderWidth: 1,
        borderColor: Colors.lightBlue,
        gap: spacing.md,
    },
    googleButtonText: {
        fontSize: 16,
        color: Colors.textDark,
        fontWeight: '600',
    },
});

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import LinearGradient from 'expo-linear-gradient';
import { RootStackParamList } from '../types';
import { CustomButton, CustomInput } from '../components';
import { Colors, Gradients, spacing } from '../theme';

type SignupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Signup'>;

interface Props {
    navigation: SignupScreenNavigationProp;
}

export const SignupScreen: React.FC<Props> = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSignup = async () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigation.navigate('Verification', { phoneNumber: phone });
        }, 1000);
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
                        <View style={styles.illustrationContainer}>
                            <Ionicons name="bus" size={100} color={Colors.white} />
                        </View>

                        <View style={styles.formContainer}>
                            <Text style={styles.title}>Sign Up</Text>
                            <View style={styles.subtitleRow}>
                                <Text style={styles.subtitle}>Already have an account? </Text>
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <Text style={styles.link}>Login</Text>
                                </TouchableOpacity>
                            </View>

                            <CustomInput
                                hintText="Full Name"
                                prefixIcon="person-outline"
                                value={name}
                                onChangeText={setName}
                            />

                            <View style={{ marginTop: spacing.md }}>
                                <CustomInput
                                    hintText="Email"
                                    prefixIcon="mail-outline"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>

                            <View style={{ marginTop: spacing.md }}>
                                <CustomInput
                                    hintText="Phone Number"
                                    prefixIcon="call-outline"
                                    value={phone}
                                    onChangeText={setPhone}
                                    keyboardType="phone-pad"
                                />
                            </View>

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

                            <View style={{ marginTop: spacing.lg }}>
                                <CustomButton
                                    text="Sign Up"
                                    onPress={handleSignup}
                                    isLoading={isLoading}
                                />
                            </View>
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
        height: 160,
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
});

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import LinearGradient from 'expo-linear-gradient';
import { RootStackParamList } from '../types';
import { CustomButton, OTPInput, SuccessDialog } from '../components';
import { Colors, Gradients, spacing } from '../theme';

type VerificationScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Verification'
>;
type VerificationScreenRouteProp = RouteProp<RootStackParamList, 'Verification'>;

interface Props {
    navigation: VerificationScreenNavigationProp;
    route: VerificationScreenRouteProp;
}

export const VerificationScreen: React.FC<Props> = ({ navigation, route }) => {
    const { phoneNumber } = route.params;
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleVerify = async () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setShowSuccess(true);
        }, 1000);
    };

    const handleSuccessClose = () => {
        setShowSuccess(false);
        navigation.replace('Home');
    };

    const handleResend = () => {
        // TODO: Implement resend OTP logic
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
                    <View style={styles.content}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="phone-portrait" size={80} color={Colors.white} />
                        </View>

                        <View style={styles.formContainer}>
                            <Text style={styles.title}>Verification Code</Text>
                            <Text style={styles.subtitle}>
                                We've sent a 6-digit code to{'\n'}
                                <Text style={styles.phone}>{phoneNumber}</Text>
                            </Text>

                            <View style={styles.otpContainer}>
                                <OTPInput
                                    length={6}
                                    onChangeOTP={setOtp}
                                    onComplete={handleVerify}
                                />
                            </View>

                            <CustomButton
                                text="Verify"
                                onPress={handleVerify}
                                isLoading={isLoading}
                                disabled={otp.length < 6}
                            />

                            <View style={styles.resendContainer}>
                                <Text style={styles.resendText}>Didn't receive code? </Text>
                                <Text style={styles.resendLink} onPress={handleResend}>
                                    Resend
                                </Text>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </LinearGradient>

            <SuccessDialog
                visible={showSuccess}
                title="Success!"
                message="Your account has been verified successfully"
                onClose={handleSuccessClose}
            />
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
    content: {
        flex: 1,
    },
    iconContainer: {
        height: 200,
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
    subtitle: {
        fontSize: 16,
        color: Colors.textGrey,
        textAlign: 'center',
        marginBottom: spacing.xl,
        lineHeight: 24,
    },
    phone: {
        fontWeight: '600',
        color: Colors.primaryBlue,
    },
    otpContainer: {
        marginBottom: spacing.xl,
    },
    resendContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: spacing.lg,
    },
    resendText: {
        fontSize: 14,
        color: Colors.textGrey,
    },
    resendLink: {
        fontSize: 14,
        color: Colors.primaryBlue,
        fontWeight: '600',
    },
});

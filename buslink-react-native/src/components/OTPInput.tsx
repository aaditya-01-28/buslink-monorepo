import React, { useRef, useState } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    NativeSyntheticEvent,
    TextInputKeyPressEventData,
} from 'react-native';
import { Colors, borderRadius } from '../theme';

interface OTPInputProps {
    length?: number;
    onComplete?: (otp: string) => void;
    onChangeOTP?: (otp: string) => void;
}

export const OTPInput: React.FC<OTPInputProps> = ({
    length = 6,
    onComplete,
    onChangeOTP,
}) => {
    const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
    const inputRefs = useRef<Array<TextInput | null>>([]);

    const handleChange = (text: string, index: number) => {
        if (text.length > 1) {
            // Handle paste
            const otpArray = text.slice(0, length).split('');
            const newOtp = [...otp];
            otpArray.forEach((char, i) => {
                if (index + i < length) {
                    newOtp[index + i] = char;
                }
            });
            setOtp(newOtp);
            onChangeOTP?.(newOtp.join(''));

            if (newOtp.every(digit => digit !== '')) {
                onComplete?.(newOtp.join(''));
            }

            // Focus last filled input
            const lastIndex = Math.min(index + otpArray.length, length - 1);
            inputRefs.current[lastIndex]?.focus();
            return;
        }

        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);
        onChangeOTP?.(newOtp.join(''));

        // Auto-focus next input
        if (text && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        // Call onComplete if all filled
        if (newOtp.every(digit => digit !== '') && text) {
            onComplete?.(newOtp.join(''));
        }
    };

    const handleKeyPress = (
        e: NativeSyntheticEvent<TextInputKeyPressEventData>,
        index: number
    ) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <View style={styles.container}>
            {Array(length)
                .fill(0)
                .map((_, index) => (
                    <TextInput
                        key={index}
                        ref={ref => (inputRefs.current[index] = ref)}
                        style={[styles.input, otp[index] && styles.inputFilled]}
                        value={otp[index]}
                        onChangeText={text => handleChange(text, index)}
                        onKeyPress={e => handleKeyPress(e, index)}
                        keyboardType="number-pad"
                        maxLength={index === 0 ? length : 1}
                        selectTextOnFocus
                    />
                ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    input: {
        width: 50,
        height: 56,
        borderRadius: borderRadius.md,
        borderWidth: 2,
        borderColor: `${Colors.lightBlue}80`,
        backgroundColor: Colors.white,
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
        color: Colors.textDark,
    },
    inputFilled: {
        borderColor: Colors.primaryBlue,
    },
});

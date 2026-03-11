import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { Colors, borderRadius } from '../theme';

interface CustomButtonProps {
    text: string;
    onPress?: () => void;
    isLoading?: boolean;
    isOutlined?: boolean;
    backgroundColor?: string;
    textColor?: string;
    width?: number | string;
    disabled?: boolean;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
    text,
    onPress,
    isLoading = false,
    isOutlined = false,
    backgroundColor,
    textColor,
    width,
    disabled = false,
}) => {
    const buttonStyle: ViewStyle = {
        ...styles.button,
        backgroundColor: isOutlined
            ? Colors.transparent
            : backgroundColor || Colors.primaryBlue,
        borderWidth: isOutlined ? 1 : 0,
        borderColor: isOutlined ? (backgroundColor || Colors.primaryBlue) : Colors.transparent,
        width: width || '100%',
        opacity: disabled || isLoading ? 0.6 : 1,
    };

    const textStyle: TextStyle = {
        ...styles.buttonText,
        color: isOutlined
            ? textColor || Colors.primaryBlue
            : textColor || Colors.white,
    };

    return (
        <TouchableOpacity
            style={buttonStyle}
            onPress={onPress}
            disabled={disabled || isLoading}
            activeOpacity={0.7}
        >
            {isLoading ? (
                <ActivityIndicator
                    color={isOutlined ? Colors.primaryBlue : Colors.white}
                    size="small"
                />
            ) : (
                <Text style={textStyle}>{text}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 56,
        borderRadius: borderRadius.xl,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
    },
});

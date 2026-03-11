import React from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TextInputProps,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, borderRadius } from '../theme';

interface CustomInputProps extends TextInputProps {
    hintText: string;
    prefixIcon?: keyof typeof Ionicons.glyphMap;
    suffixIcon?: React.ReactNode;
    onChangeText?: (text: string) => void;
    value?: string;
    secureTextEntry?: boolean;
    enabled?: boolean;
}

export const CustomInput: React.FC<CustomInputProps> = ({
    hintText,
    prefixIcon,
    suffixIcon,
    onChangeText,
    value,
    secureTextEntry = false,
    enabled = true,
    ...rest
}) => {
    return (
        <View style={[styles.container, !enabled && styles.disabled]}>
            {prefixIcon && (
                <Ionicons
                    name={prefixIcon}
                    size={22}
                    color={Colors.primaryBlue}
                    style={styles.prefixIcon}
                />
            )}
            <TextInput
                style={styles.input}
                placeholder={hintText}
                placeholderTextColor={`${Colors.textDark}80`}
                onChangeText={onChangeText}
                value={value}
                secureTextEntry={secureTextEntry}
                editable={enabled}
                {...rest}
            />
            {suffixIcon && <View style={styles.suffixIcon}>{suffixIcon}</View>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: `${Colors.lightBlue}4D`,
        borderRadius: borderRadius.full,
        borderWidth: 1,
        borderColor: `${Colors.lightBlue}80`,
        paddingHorizontal: 20,
        paddingVertical: 18,
        height: 56,
    },
    disabled: {
        opacity: 0.5,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: Colors.textDark,
    },
    prefixIcon: {
        marginRight: 12,
    },
    suffixIcon: {
        marginLeft: 12,
    },
});

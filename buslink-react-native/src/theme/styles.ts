import { StyleSheet } from 'react-native';
import { Colors } from './colors';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundLight,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    shadow: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
    },
    card: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 20,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 2,
    },
});

// Typography
export const typography = {
    h1: {
        fontSize: 28,
        fontWeight: '700' as const,
        color: Colors.textDark,
    },
    h2: {
        fontSize: 24,
        fontWeight: '600' as const,
        color: Colors.textDark,
    },
    h3: {
        fontSize: 18,
        fontWeight: '600' as const,
        color: Colors.textDark,
    },
    body: {
        fontSize: 16,
        fontWeight: '400' as const,
        color: Colors.textDark,
    },
    caption: {
        fontSize: 14,
        fontWeight: '400' as const,
        color: Colors.textGrey,
    },
    small: {
        fontSize: 12,
        fontWeight: '400' as const,
        color: Colors.textGrey,
    },
};

// Common spacing values
export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
};

// Border radius values
export const borderRadius = {
    sm: 10,
    md: 16,
    lg: 20,
    xl: 24,
    full: 30,
};

import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../theme';

interface BackButtonProps {
    onPress?: () => void;
    color?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({
    onPress,
    color = Colors.primaryBlue,
}) => {
    const navigation = useNavigation();

    const handlePress = () => {
        if (onPress) {
            onPress();
        } else {
            navigation.goBack();
        }
    };

    return (
        <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Ionicons name="arrow-back" size={24} color={color} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

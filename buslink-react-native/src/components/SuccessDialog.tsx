import React from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, borderRadius, spacing } from '../theme';

interface SuccessDialogProps {
    visible: boolean;
    title: string;
    message: string;
    onClose: () => void;
}

export const SuccessDialog: React.FC<SuccessDialogProps> = ({
    visible,
    title,
    message,
    onClose,
}) => {
    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.dialog}>
                    <View style={styles.iconContainer}>
                        <Ionicons
                            name="checkmark-circle"
                            size={64}
                            color={Colors.successGreen}
                        />
                    </View>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>
                    <TouchableOpacity style={styles.button} onPress={onClose}>
                        <Text style={styles.buttonText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.lg,
    },
    dialog: {
        backgroundColor: Colors.white,
        borderRadius: borderRadius.lg,
        padding: spacing.xl,
        alignItems: 'center',
        width: '100%',
        maxWidth: 320,
    },
    iconContainer: {
        marginBottom: spacing.md,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: Colors.textDark,
        marginBottom: spacing.sm,
        textAlign: 'center',
    },
    message: {
        fontSize: 16,
        color: Colors.textGrey,
        marginBottom: spacing.lg,
        textAlign: 'center',
    },
    button: {
        backgroundColor: Colors.primaryBlue,
        borderRadius: borderRadius.xl,
        paddingVertical: 14,
        paddingHorizontal: 40,
    },
    buttonText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '600',
    },
});

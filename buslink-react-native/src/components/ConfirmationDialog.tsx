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

interface ConfirmationDialogProps {
    visible: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
    isDangerous?: boolean;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
    visible,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm,
    onCancel,
    isDangerous = false,
}) => {
    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={onCancel}
        >
            <View style={styles.overlay}>
                <View style={styles.dialog}>
                    <View style={[
                        styles.iconContainer,
                        { backgroundColor: `${isDangerous ? Colors.errorRed : Colors.warningOrange}20` }
                    ]}>
                        <Ionicons
                            name="alert-circle"
                            size={48}
                            color={isDangerous ? Colors.errorRed : Colors.warningOrange}
                        />
                    </View>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={onCancel}
                        >
                            <Text style={styles.cancelButtonText}>{cancelText}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.button,
                                styles.confirmButton,
                                isDangerous && styles.dangerButton,
                            ]}
                            onPress={onConfirm}
                        >
                            <Text style={styles.confirmButtonText}>{confirmText}</Text>
                        </TouchableOpacity>
                    </View>
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
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.textDark,
        marginBottom: spacing.sm,
        textAlign: 'center',
    },
    message: {
        fontSize: 15,
        color: Colors.textGrey,
        marginBottom: spacing.lg,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: spacing.md,
        width: '100%',
    },
    button: {
        flex: 1,
        borderRadius: borderRadius.xl,
        paddingVertical: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: Colors.backgroundLight,
    },
    confirmButton: {
        backgroundColor: Colors.primaryBlue,
    },
    dangerButton: {
        backgroundColor: Colors.errorRed,
    },
    cancelButtonText: {
        color: Colors.textDark,
        fontSize: 16,
        fontWeight: '600',
    },
    confirmButtonText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '600',
    },
});

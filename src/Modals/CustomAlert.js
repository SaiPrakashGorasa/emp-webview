import React from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const CustomAlert = ({
    visible,
    title,
    message,
    onClose,

    leftButtonVisible = true,
    leftButtonText = 'Cancel',
    leftButtonColor = '#ccc',
    onLeftButtonPress = () => { },

    rightButtonVisible = true,
    rightButtonText = 'OK',
    rightButtonColor = '#007bff',
    onRightButtonPress = () => { },
}) => {
    return (
        <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
            <View style={styles.overlay}>
                <View style={styles.card}>
                    {title ? <Text style={styles.title}>{title}</Text> : null}
                    {message ? <Text style={styles.message}>{message}</Text> : null}

                    <View style={styles.buttonContainer}>
                        {leftButtonVisible && (
                            <TouchableOpacity
                                style={[styles.button, { backgroundColor: leftButtonColor }]}
                                onPress={onLeftButtonPress}
                            >
                                <Text style={styles.buttonText}>{leftButtonText}</Text>
                            </TouchableOpacity>
                        )}

                        {rightButtonVisible && (
                            <TouchableOpacity
                                style={[styles.button, { backgroundColor: rightButtonColor }]}
                                onPress={onRightButtonPress}
                            >
                                <Text style={styles.buttonText}>{rightButtonText}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default CustomAlert;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: width * 0.8,
        backgroundColor: '#fff',
        borderRadius: 6,
        padding: 20,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
        textAlign: 'center',
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 16,
        color: '#333',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    button: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 6,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
    },
});

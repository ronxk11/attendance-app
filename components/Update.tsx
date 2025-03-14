import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Button, Image, StyleSheet, useWindowDimensions } from 'react-native';

const Update = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const { width, height } = useWindowDimensions();

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleUpdate = () => {
        console.log('Navigating to the Google Play Store...');
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Button title="Open Modal" onPress={handleOpenModal} />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleCloseModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContainer, { width: width * 0.85, maxHeight: height * 0.5 }]}>
                        <Text style={styles.modalTitle}>Update Language School?</Text>
                        <Text style={styles.modalText}>
                            Language School recommends that you update to the latest version. You can keep playing the game while downloading the update.
                        </Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.noThanksButton} onPress={handleCloseModal}>
                            <Text style={styles.noThanksText}>No thanks</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                                <Text style={styles.buttonText}>Update</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={handleCloseModal} style={styles.storeContainer}>
                            <Image
                                source={require('../assets/google-play.png')}
                                style={styles.icon}
                            />
                            <Text style={styles.storeLink}>Google Play</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '85%',
        backgroundColor: 'white',
        padding: 18,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 15,
        textAlign: 'left',
        marginBottom: 20,
        lineHeight: 20,
        marginLeft: 12.12,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        paddingHorizontal: 5,
    },
    noThanksButton: {
        marginRight: 20,
    },
    button: {
        backgroundColor: '#0F9D58',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 4,
        minWidth: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
    },
    noThanksText: {
        color: '#0F9D58',
        fontSize: 16,
    },
    storeContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        padding: 6,
        marginTop: 15,
        marginLeft: 5,
    },
    icon: {
        width: 25,
        height: 25,
        marginRight: 4,
    },
    storeLink: {
        textDecorationLine: 'underline',
        fontSize: 16,
        marginTop: 1,
    },
});

export default Update;

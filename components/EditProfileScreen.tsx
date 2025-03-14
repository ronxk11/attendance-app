import React, { useState, useCallback } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Alert } from 'react-native';
import { Card, Avatar, TextInput, Button, IconButton } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';

const EditProfileScreen = ({ navigation, route }: any) => {
  const { data, onUpdate } = route.params || {};

  // Initialize state from passed data
  const [name, setName] = useState(data?.name || '');
  const [email, setEmail] = useState(data?.email || '');
  const [address, setAddress] = useState(data?.address || '');
  const [imageUri, setImageUri] = useState(data?.imageUri || '');

  // Function to pick an image from gallery
  const pickImage = useCallback(() => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
      if (response?.didCancel) return;
  
      if (response?.errorCode) {
        Alert.alert('Error', response.errorMessage || 'Something went wrong');
        return;
      }
  
      if (response?.assets && response.assets.length > 0) {
        const uri = response.assets[0]?.uri;
        if (uri) {
          setImageUri(uri);
        } else {
          Alert.alert('Error', 'Image URI not found.');
        }
      } else {
        Alert.alert('Error', 'No assets found in the response.');
      }
    });
  }, []);
  

  // Function to save the updated data and go back
  const handleSave = useCallback(() => {
    if (!name || !email || !address) {
      Alert.alert('Error', 'Please fill all the fields.');
      return;
    }

    const updatedData = { name, email, address, imageUri };
    if (onUpdate && typeof onUpdate === 'function') {
      onUpdate(updatedData);
    }
    navigation.goBack();
  }, [name, email, address, imageUri, onUpdate, navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Card style={styles.card}>
          <Card.Title
            title="Edit Profile"
            titleStyle={styles.cardTitle}
            // eslint-disable-next-line react/no-unstable-nested-components
            left={(props) => (
              <IconButton
                {...props}
                icon="arrow-left"
                size={28}
                onPress={() => navigation.goBack()} // Navigate back on click
              />
            )}
          />
          <Card.Content style={styles.cardContent}>
            <View style={styles.avatarContainer}>
              {imageUri ? (
                <Avatar.Image size={120} source={{ uri: imageUri }} />
              ) : (
                <Avatar.Icon size={120} icon="account" />
              )}
              <IconButton
                icon="camera"
                iconColor="#fff"
                size={25}
                style={styles.avatarEditButton}
                onPress={pickImage}
              />
            </View>
            <TextInput
              label="Name"
              mode="outlined"
              value={name}
              placeholder="Enter Name"
              onChangeText={setName}
              style={styles.input}
            />
            <TextInput
              label="Email"
              mode="outlined"
              keyboardType="email-address"
              value={email}
              placeholder="Enter Email"
              onChangeText={setEmail}
              style={styles.input}
            />
            <TextInput
              label="Address"
              mode="outlined"
              value={address}
              placeholder="Enter Address"
              onChangeText={setAddress}
              style={styles.input}
            />
            <Button
              mode="contained"
              onPress={handleSave}
              style={styles.saveButton}
              contentStyle={styles.saveButtonContent}
              labelStyle={styles.saveButtonLabel}
            >
              Save
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EDEADE',
  },
  container: {
    padding: 30,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    borderRadius: 10,
    elevation: 7,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 7,
  },
  cardContent: {
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 20,
    position: 'relative',
  },
  avatarEditButton: {
    position: 'absolute',
    bottom: -6,
    right: -6,
    backgroundColor: '#979797',
  },
  input: {
    width: '100%',
    marginBottom: 15,
  },
  saveButton: {
    marginTop: 20,
    borderRadius: 25,
    width: '100%',
    height: 50,
  },
  saveButtonContent: {
    paddingVertical: 5,
  },
  saveButtonLabel: {
    fontSize: 18,
  },
});

export default EditProfileScreen;

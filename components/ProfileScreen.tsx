import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Card, List, Avatar, IconButton } from 'react-native-paper';

const ProfileScreen = ({ navigation, route }: any) => {
  // Profile State
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    address: '',
    imageUri: '',
  });

  // Update state when new data is received
  useEffect(() => {
    if (route.params?.updatedData) {
      const { name, email, address, imageUri } = route.params.updatedData;
      setProfile({
        name,
        email,
        address,
        imageUri: imageUri || '',
      });
    }
  }, [route.params?.updatedData]);

  // Navigate to Edit Profile
  const handleEdit = () => {
    navigation.navigate('EditProfileScreen', {
      data: profile,
      onUpdate: (updatedData: { name: string; email: string; address: string; imageUri: string }) => {
        setProfile(updatedData);
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Card style={styles.card}>
          <Card.Title
            title="Personal Details"
            titleStyle={styles.cardTitle}
            // eslint-disable-next-line react/no-unstable-nested-components
            right={(props) => (
              <IconButton
                {...props}
                icon="pencil"
                size={28}
                iconColor="#007BFF"
                onPress={handleEdit}
              />
            )}
          />
          <Card.Content style={styles.cardContent}>
            <View style={styles.avatarContainer}>
              {profile.imageUri ? (
                <Avatar.Image size={110} source={{ uri: profile.imageUri }} />
              ) : (
                <Avatar.Icon size={110} icon="account"  />
              )}
            </View>
            <List.Section style={styles.listSection}>
              <List.Item
                title="Name"
                titleStyle={styles.listItemTitle}
                description={profile.name || 'N/A'}
                descriptionStyle={styles.listItemDescription}
                left={(props) => <List.Icon {...props} icon="account" color="#333" />}
              />
              <List.Item
                title="Email"
                titleStyle={styles.listItemTitle}
                description={profile.email || 'N/A'}
                descriptionStyle={styles.listItemDescription}
                left={(props) => <List.Icon {...props} icon="email" color="#333" />}
              />
              <List.Item
                title="Address"
                titleStyle={styles.listItemTitle}
                description={profile.address || 'N/A'}
                descriptionStyle={styles.listItemDescription}
                left={(props) => <List.Icon {...props} icon="home" color="#333" />}
              />
            </List.Section>
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
    padding: 20,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    borderRadius: 10,
    elevation: 4,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  cardContent: {
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 20,
    position: 'relative',
  },
  listSection: {
    width: '100%',
  },
  listItemTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  listItemDescription: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
});

export default ProfileScreen;
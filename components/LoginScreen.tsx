import React, { useState } from 'react';
import { StyleSheet, Dimensions, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // if (email.trim() === '' || password.trim() === '') {
    //   Alert.alert('Error', 'Please enter both email and password.');
    //   return;
    // }
    navigation.replace('TabNavigation');
  };

  return (
    <KeyboardAvoidingView
    // eslint-disable-next-line react-native/no-inline-styles
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
  >
    <LinearGradient
      colors={['#6c56f0', '#fdbb2d', '#6c56f0']}
      style={styles.container}
    >
      {/* Centered Image above the card */}
      <Image
        source={require('../assets/codiasticsoft.png')}
        style={styles.image}
        resizeMode="cover"
      />
      <Card style={styles.card}>
        <Card.Title 
          title="Login" 
          titleStyle={styles.cardTitle}
        />
        <Card.Content style={styles.cardContent}>
          <TextInput
            label="Email"
            mode="outlined"
            placeholder="Enter Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
          <TextInput
            label="Password"
            mode="outlined"
            placeholder="Enter Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.loginButton}
            labelStyle={styles.loginButtonLabel}
          >
            Login
          </Button>
        </Card.Content>
      </Card>
    </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  image: {
    width: 270,
    height: 70,
  resizeMode:'contain',
    marginBottom: 20,
    alignSelf: 'center',
  },
  card: {
    width: width * 0.9,
    borderRadius: 15,
    elevation: 10,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#702963',
    textAlign: 'center', // Centers the text
    width: '100%',       // Occupies full width for proper centering
    marginVertical: 15,
  },
  cardContent: {
    padding: 20,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    marginBottom: 15,
  },
  loginButton: {
    marginTop: 15,
    borderRadius: 25,
    width: '100%',
    height: 44,
    justifyContent: 'center',
  },
  loginButtonLabel: {
    fontSize: 18,
  },
});

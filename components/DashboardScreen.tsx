import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  PermissionsAndroid,
  Modal
} from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
import CircularProgress from '../utils/CircularProgress';
import { ClockIcon, HeartIcon, UserIcon } from 'react-native-heroicons/solid';
import Geolocation from 'react-native-geolocation-service';
import ReactNativeBiometrics from 'react-native-biometrics';
import LottieView from 'lottie-react-native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const DashboardScreen = () => {
  // For demonstration, a hardcoded username is used.
  const username = 'John Doe';

  // Compute the current month's date range
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const options = { month: 'short', day: 'numeric' };
  const dateRange = `${firstDay.toLocaleDateString('en-US', options)} - ${lastDay.toLocaleDateString('en-US', options)}`;

  const DESIRED_LATITUDE = 18.5155;
  const DESIRED_LONGITUDE = 73.8501;

  const [loading, setLoading] = useState(false); // Loading state for authentication
  const [modalVisible, setModalVisible] = useState(false); // Controls modal visibility
  const [modalMessage, setModalMessage] = useState(''); // Message to display in modal

  // State for managing the "Last Checked In" time.
  const [lastCheckedIn, setLastCheckedIn] = useState<Date | null>(null);

  const checkLocationPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Access Required',
        message:
          'This app needs access to your location to verify authentication.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  const authenticate = async () => {
    setLoading(true); // Start loading
    const locationPermission = await checkLocationPermission();

    if (!locationPermission) {
      Alert.alert(
        'Permission Denied',
        'Location permission is required to authenticate.'
      );
      setLoading(false);
      return;
    }

    // Fetch the user's current location
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(position);
        // Check if the user is in the allowed location
        const isUserInAllowedLocation =
          Math.abs(latitude - DESIRED_LATITUDE) < 0.01 &&
          Math.abs(longitude - DESIRED_LONGITUDE) < 0.01;

        if (isUserInAllowedLocation) {
          const rnBiometrics = new ReactNativeBiometrics();

          rnBiometrics.isSensorAvailable().then(({ available, biometryType }) => {
            if (available && biometryType) {
              rnBiometrics
                .simplePrompt({ promptMessage: 'Authenticate with Fingerprint' })
                .then((result) => {
                  setLoading(false); // Stop loading after authentication attempt
                  if (result.success) {
                    // On success, update the lastCheckedIn time and open the modal
                    const currentTime = new Date();
                    setLastCheckedIn(currentTime);
                    setModalMessage('Your Attendance has been Marked');
                    setModalVisible(true);
                  } else {
                    Alert.alert(
                      'Authentication Failed',
                      'Fingerprint not recognized.'
                    );
                  }
                })
                .catch(() => {
                  setLoading(false);
                  Alert.alert('Authentication Error', 'Something went wrong.');
                });
            } else {
              setLoading(false);
              Alert.alert(
                'Biometrics Not Available',
                'Your device does not support fingerprint authentication.'
              );
            }
          });
        } else {
          setLoading(false);
          Alert.alert(
            'Authentication Denied',
            'You are not in the allowed location.'
          );
        }
      },
      (error) => {
        setLoading(false);
        Alert.alert(
          'Location Error',
          `Unable to fetch location: ${error.message}`
        );
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  // Format the time to display in "HH:MM AM/PM" format.
  // If lastCheckedIn is null, return a default message.
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <ScrollView style={styles.scrollcontainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.header1}>
              <Text style={styles.title}>Welcome</Text>
              <Text style={styles.title}>{username}</Text>
            </View>
            {/* Display the computed date range for the current month */}
            <Text style={styles.dateRange}>{dateRange}</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.card}>
              <Text style={styles.statNumber}>22/30</Text>
              <Text style={styles.statLabel}>Total Days Attended</Text>
            </View>

            {/* "Last Checked In" container displays the time if available, or a default message */}
            <View style={styles.card}>
              <Text style={styles.statNumber}>
                {lastCheckedIn ? formatTime(lastCheckedIn) : 'Please Check In'}
              </Text>
              <Text style={styles.statLabel}>Last Checked In</Text>
            </View>
          </View>

          <View style={styles.progressContainer}>
            {/* Use the custom CircularProgress component */}
            <CircularProgress
              size={width * 0.45}  // 45% of screen width for responsive sizing
              progress={0.70}
              showsText={true}
              color="#FFC107"
              unfilledColor="#979797"
              thickness={width * 0.03}  // Adjust thickness based on screen width
              textColor="#000"
              textSize={width * 0.045}  // Responsive font size for percentage text
            />
            <View style={styles.labelContainer}>
              <View style={styles.labelItem}>
                <View style={[styles.colorBox, styles.colorBox1]} />
                <Text style={[styles.labelText, styles.labelText1]}>Present</Text>
              </View>
              <View style={styles.labelItem}>
                <View style={[styles.colorBox, styles.colorBox2]} />
                <Text style={[styles.labelText, styles.labelText2]}>Absent</Text>
              </View>
            </View>
          </View>

          <View style={styles.listitem}>
            <View style={styles.leaveCard}>
              <ClockIcon size={24} color="#979797" style={styles.iconmargin} />
              <Text style={styles.leaveItem}>Lateness</Text>
              <View style={styles.daystyle}>
                <Text style={styles.dayText}>1 Day</Text>
              </View>
            </View>
            <View style={styles.leaveCard}>
              <UserIcon size={24} color="#979797" style={styles.iconmargin} />
              <Text style={styles.leaveItem}>Other Leaves</Text>
              <View style={styles.daystyle}>
                <Text style={styles.dayText}>1 Day</Text>
              </View>
            </View>
            <View style={styles.leaveCard}>
              <HeartIcon size={24} color="#979797" style={styles.iconmargin} />
              <Text style={styles.leaveItem}>Sick Leaves</Text>
              <View style={styles.daystyle}>
                <Text style={styles.dayText}>1 Day</Text>
              </View>
            </View>
          </View>

          <View>
            <TouchableOpacity
              style={styles.attendanceButton}
              onPress={() => authenticate()}
              disabled={loading}
            >
              <Text style={styles.attendanceButtonText}>
                {loading ? 'Authenticating...' : 'Mark Attendance'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Modal for successful authentication with Lottie animation */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <LottieView
              source={require('../assets/success.json')} // Replace with your Lottie JSON file path
              autoPlay
              loop={false}
              style={styles.lottieAnimation}
            />
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  scrollcontainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#EDEADE',
    padding: width * 0.05, // 5% of screen width
  },
  header: {
    alignItems: 'center',
    marginBottom: height * 0.02,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: width * 0.05,
  },
  header1: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: width * 0.045, // Responsive font size
    fontWeight: 'bold',
    color: '#007AFF',
  },
  dateRange: {
    fontSize: width * 0.05,
    color: '#007AFF',
    marginTop: height * 0.015,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.02,
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 4,
    padding: width * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 9,
    elevation: 1,
    marginRight: width * 0.02,
  },
  statNumber: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginBottom: height * 0.005,
    color: '#007AFF',
  },
  statLabel: {
    fontSize: width * 0.035,
    color: '#007AFF',
  },
  progressContainer: {
    alignItems: 'center',
    marginVertical: height * 0.02,
    position: 'relative',
  },
  labelContainer: {
    flexDirection: 'row',
    marginTop: height * 0.01,
  },
  labelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: width * 0.02,
  },
  colorBox: {
    width: width * 0.04,
    height: width * 0.04,
    borderRadius: 3,
    marginRight: width * 0.01,
  },
  colorBox1: { backgroundColor: '#FFC107' },
  colorBox2: { backgroundColor: '#979797' },
  labelText: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  labelText1: { color: '#FFC107' },
  labelText2: { color: '#979797' },
  listitem: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leaveCard: {
    width: '90%',
    backgroundColor: '#FFF',
    padding: width * 0.04,
    borderRadius: 4,
    marginBottom: height * 0.02,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  iconmargin: {
    marginRight: width * 0.02,
  },
  leaveItem: {
    fontSize: width * 0.04,
    color: '#555',
  },
  daystyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  dayText: {
    fontSize: width * 0.04,
  },
  attendanceButton: {
    backgroundColor: '#FFC107',
    padding: width * 0.03,
    borderRadius: 35,
    width:'90%',
    height:'27%',
    alignSelf:'center',
    alignItems: 'center',
  },
  attendanceButtonText: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(13, 1, 1, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: width * 0.04,
    borderRadius: 10,
    alignItems: 'center',
    
  },
  lottieAnimation: {
    width: width * 0.4,
    height: width * 0.4,
  },
  modalText: {
    fontSize: width * 0.045,
    marginVertical: height * 0.02,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#007AFF',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.1,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: width * 0.045,
  },
});

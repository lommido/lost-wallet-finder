import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useWallet } from '../context/WalletContext';

const FindWalletScreen = () => {
  const [color, setColor] = useState('');
  const [contents, setContents] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const { saveFoundWallet } = useWallet();

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need camera roll permissions to pick an image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleGetLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'We need location permissions.');
        return;
      }

      setLoading(true);
      const coords = await Location.getCurrentPositionAsync({});
      setLocation(`${coords.coords.latitude.toFixed(4)}, ${coords.coords.longitude.toFixed(4)}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to get location');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!color.trim() || !phone.trim() || !email.trim()) {
      Alert.alert('Missing Information', 'Please fill in color, phone, and email fields.');
      return;
    }

    try {
      await saveFoundWallet({
        color,
        contents,
        location,
        phone,
        email,
        description,
        photo,
      });
      Alert.alert('Success', 'Thank you! Your found wallet report has been submitted!');
      // Reset form
      setColor('');
      setContents('');
      setLocation('');
      setPhone('');
      setEmail('');
      setDescription('');
      setPhoto(null);
    } catch (error) {
      Alert.alert('Error', 'Failed to save report');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Report Found Wallet</Text>
      <Text style={styles.subtitle}>Help return a wallet to its owner</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Wallet Color *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Black, Brown, Red"
          value={color}
          onChangeText={setColor}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Contents Found (Optional)</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          placeholder="What's inside? (cards, ID info, etc.)"
          value={contents}
          onChangeText={setContents}
          multiline
          numberOfLines={3}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Description (Optional)</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          placeholder="Additional details about the wallet"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={3}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Location Found</Text>
        <View style={styles.locationContainer}>
          <TextInput
            style={[styles.input, styles.locationInput]}
            placeholder="Location or GPS coordinates"
            value={location}
            onChangeText={setLocation}
          />
          <TouchableOpacity style={styles.locationButton} onPress={handleGetLocation}>
            <Text style={styles.buttonText}>📍 Get</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Your Phone Number *</Text>
        <TextInput
          style={styles.input}
          placeholder="Your phone number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Your Email Address *</Text>
        <TextInput
          style={styles.input}
          placeholder="Your email address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Wallet Photo (Optional)</Text>
        {photo && <Image source={{ uri: photo }} style={styles.image} />}
        <TouchableOpacity style={styles.button} onPress={handlePickImage}>
          <Text style={styles.buttonText}>📷 Pick Photo</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Found Wallet Report</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 14,
  },
  multiline: {
    height: 80,
    textAlignVertical: 'top',
  },
  locationContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  locationInput: {
    flex: 1,
  },
  locationButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#34C759',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default FindWalletScreen;

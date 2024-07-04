import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  const [name, setName] = useState('');

  const onPressButton = () => {
    navigation.navigate('App');
  };

  return (
    <ImageBackground
      source={{ uri: 'https://picsum.photos/800/1200' }} // URL de Lorem Picsum
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.label}>Ingrese su nombre:</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            onChangeText={(text) => setName(text)}
            value={name}
          />
          <Button title="Continuar" onPress={onPressButton} />
        </View>
      </View>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({background: {
  flex: 1,
  resizeMode: 'cover',
  justifyContent: 'center',
},
overlay: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.4)', 
},
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
label: {
  fontSize: 20,
  marginBottom: 10,
  color: 'white',
},
input: {
  borderWidth: 1,
  borderColor: '#ccc',
  padding: 10,
  width: '80%',
  marginBottom: 20,
  backgroundColor: 'white', 
  opacity: 0.9, 
},
});

export default WelcomeScreen;

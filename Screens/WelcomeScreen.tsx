import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  const [name, setName] = useState('');

  const onPressButton = () => {
    navigation.navigate('App');
  };

  return (
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '80%',
    marginBottom: 20,
  },
});

export default WelcomeScreen;

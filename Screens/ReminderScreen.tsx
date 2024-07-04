import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReminderScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');

  const handleAddReminder = async () => {
    // Validar que todos los campos estén llenos antes de guardar
    if (!name || !date || !time || !description) {
      Alert.alert('Error', 'Por favor llene todos los campos.');
      return;
    }

    // Crear el objeto de recordatorio
    const reminder = {
      id: Date.now().toString(), // ID único basado en la marca de tiempo actual
      name,
      date,
      time,
      description,
    };

    try {
      // Obtener la lista actual de recordatorios almacenados
      const existingReminders = await AsyncStorage.getItem('reminders');
      let reminders = [];

      if (existingReminders) {
        reminders = JSON.parse(existingReminders);
      }

      // Agregar el nuevo recordatorio a la lista
      reminders.push(reminder);

      // Guardar la lista actualizada de recordatorios
      await AsyncStorage.setItem('reminders', JSON.stringify(reminders));

      // Mostrar mensaje de éxito
      Alert.alert('Éxito', 'El recordatorio se agregó correctamente.');

      // Limpiar los campos después de agregar el recordatorio
      setName('');
      setDate('');
      setTime('');
      setDescription('');

      // Opcional: navegar de vuelta a la pantalla anterior (WelcomeScreen)
      navigation.goBack();
    } catch (error) {
      console.error('Error al guardar el recordatorio:', error);
      Alert.alert('Error', 'Hubo un problema al agregar el recordatorio. Por favor inténtelo de nuevo.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese el nombre"
        onChangeText={(text) => setName(text)}
        value={name}
      />

      <Text style={styles.label}>Fecha:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese la fecha"
        onChangeText={(text) => setDate(text)}
        value={date}
      />

      <Text style={styles.label}>Hora:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese la hora"
        onChangeText={(text) => setTime(text)}
        value={time}
      />

      <Text style={styles.label}>Descripción:</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Ingrese la descripción"
        onChangeText={(text) => setDescription(text)}
        value={description}
        multiline
        numberOfLines={4}
      />

      <Button title="Agregar Recordatorio" onPress={handleAddReminder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '100%',
    marginBottom: 20,
    fontSize: 16,
  },
});

export default ReminderScreen;

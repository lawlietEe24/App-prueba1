import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Screen3 = ({ navigation }) => {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    // Cargar los recordatorios cuando el componente se monta
    loadReminders();
  }, []);

  const loadReminders = async () => {
    try {
      // Obtener los recordatorios almacenados
      const remindersData = await AsyncStorage.getItem('reminders');
      if (remindersData) {
        const parsedReminders = JSON.parse(remindersData);
        setReminders(parsedReminders);
      }
    } catch (error) {
      console.error('Error al cargar los recordatorios:', error);
    }
  };

  const handleEditReminder = async (id) => {
    // Aquí implementamos la lógica para editar un registro por su ID
    // En este ejemplo, solo mostramos un mensaje de éxito
    Alert.alert('Éxito', 'El registro se ha editado correctamente.');
  };

  const handleDeleteReminder = async (id) => {
    // Mostrar confirmación antes de eliminar el registro
    Alert.alert(
      'Confirmación',
      '¿Está seguro que desea eliminar este registro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          onPress: async () => {
            try {
              // Eliminar el registro de AsyncStorage
              const updatedReminders = reminders.filter((reminder) => reminder.id !== id);
              await AsyncStorage.setItem('reminders', JSON.stringify(updatedReminders));

              // Mostrar mensaje de éxito
              Alert.alert('Éxito', 'El registro se ha eliminado correctamente.');

              // Actualizar la lista de recordatorios en el estado
              setReminders(updatedReminders);
            } catch (error) {
              console.error('Error al eliminar el registro:', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={() => handleEditReminder(item.id)} style={styles.item}>
          <Text style={styles.itemText}>{item.name}</Text>
          <Text style={styles.itemText}>{item.date}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteReminder(item.id)} style={styles.deleteButton}>
          <Text style={styles.deleteText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={reminders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  list: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  item: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  itemText: {
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
  },
  deleteText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Screen3;

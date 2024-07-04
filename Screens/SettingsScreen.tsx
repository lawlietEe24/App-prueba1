import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Screen3 = ({ navigation }) => {
  const [reminders, setReminders] = useState([]);
  const [editingReminderId, setEditingReminderId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedDate, setEditedDate] = useState('');

  useEffect(() => {
   
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
    setEditingReminderId(id);

    const reminderToEdit = reminders.find((reminder) => reminder.id === id);
    setEditedName(reminderToEdit.name);
    setEditedDate(reminderToEdit.date);
  };

  const saveEditedReminder = async () => {
    try {
      const updatedReminders = reminders.map((reminder) => {
        if (reminder.id === editingReminderId) {
          return {
            ...reminder,
            name: editedName,
            date: editedDate,
          };
        }
        return reminder;
      });

      await AsyncStorage.setItem('reminders', JSON.stringify(updatedReminders));

      // Mostrar mensaje de éxito
      Alert.alert('Éxito', 'El recordatorio se ha editado correctamente.');

      // Actualizar la lista de recordatorios en el estado
      setReminders(updatedReminders);

      setEditingReminderId(null);
      setEditedName('');
      setEditedDate('');
    } catch (error) {
      console.error('Error al editar el recordatorio:', error);
    }
  };

  const handleDeleteReminder = async (id) => {
    Alert.alert(
      'Confirmación',
      '¿Está seguro que desea eliminar este registro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          onPress: async () => {
            try {
              const updatedReminders = reminders.filter((reminder) => reminder.id !== id);
              await AsyncStorage.setItem('reminders', JSON.stringify(updatedReminders));

              Alert.alert('Éxito', 'El registro se ha eliminado correctamente.');

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
    if (item.id === editingReminderId) {
      return (
        <View style={styles.itemContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={editedName}
            onChangeText={(text) => setEditedName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Fecha"
            value={editedDate}
            onChangeText={(text) => setEditedDate(text)}
          />
          <TouchableOpacity onPress={saveEditedReminder} style={styles.saveButton}>
            <Text style={styles.saveText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
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
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={reminders}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}`}
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
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: 'green',
    padding: 10,
    alignItems: 'center',
  },
  saveText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Screen3;

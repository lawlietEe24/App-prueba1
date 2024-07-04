import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Informacion from '../Components/Informacion'; // Importar el componente Informacion

const Screen2 = () => {
  const [singleReminder, setSingleReminder] = useState(null);
  const [remindersList, setRemindersList] = useState([]);

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    try {
      const reminders = await AsyncStorage.getItem('reminders');
      if (reminders) {
        const parsedReminders = JSON.parse(reminders);

        if (parsedReminders.length > 0) {
          setSingleReminder(parsedReminders[0]);
        }

        const listData = parsedReminders.map((reminder) => ({ key: reminder.id, name: reminder.name }));

        setRemindersList(listData);
      }
    } catch (error) {
      console.error('Error al cargar los recordatorios:', error);
    }
  };

  const renderItem = ({ item }) => {
    return <Informacion data={item} />;
  };

  const showDetailedInfo = (reminder) => {
    Alert.alert('Información Detallada', JSON.stringify(reminder, null, 2));
  };

  return (
    <View style={styles.container}>
      {/* Sección para mostrar un registro por su ID */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recordatorio Individual por ID:</Text>
        {singleReminder ? (
          <View style={styles.singleReminder}>
            <Text style={styles.label}>Nombre: {singleReminder.name}</Text>
            <Text style={styles.label}>Fecha: {singleReminder.date}</Text>
            <Text style={styles.label}>Hora: {singleReminder.time}</Text>
            <Text style={styles.label}>Descripción: {singleReminder.description}</Text>
          </View>
        ) : (
          <Text>No hay recordatorio disponible</Text>
        )}
      </View>

      {/* Sección para mostrar una lista de registros con un campo específico */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Lista de Recordatorios por Nombre:</Text>
        <FlatList
          data={remindersList}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => showDetailedInfo(item)} style={styles.listItem}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.key}
          style={styles.list}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  singleReminder: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  listItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  list: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default Screen2;

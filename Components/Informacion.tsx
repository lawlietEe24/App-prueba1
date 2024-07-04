import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';

interface InformacionProps {
  data: any; // Tipo de datos que recibirás (puede ajustarse según tus datos)
}

const Informacion: React.FC<InformacionProps> = ({ data }) => {
  const handlePress = () => {
    // Mostrar alerta con más información del registro
    Alert.alert('Información Detallada', JSON.stringify(data, null, 2));
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Text style={styles.text}>{data.name}</Text> {/* Mostrar el campo deseado (en este caso, 'name') */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
  },
});

export default Informacion;

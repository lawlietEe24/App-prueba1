import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const Screen4 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/photos');
      const json = await response.json();

      // Transformamos los datos para incluir nombres, artistas, libros simulados
      const transformedData = json.map((item, index) => ({
        id: item.id,
        title: `Imagen ${index + 1}`,
        url: `https://picsum.photos/200/300?random=${index + 1}`,
        artist: `Artista ${index + 1}`,
        book: `Libro ${index + 1}`,
      }));

      setData(transformedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.url }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.artist}>Artista: {item.artist}</Text>
      <Text style={styles.book}>Libro: {item.book}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
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
  item: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  artist: {
    fontSize: 16,
  },
  book: {
    fontSize: 16,
  },
});

export default Screen4;

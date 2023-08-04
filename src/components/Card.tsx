import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importez la bibliothèque des icônes vectorielles que vous utilisez
import Icon2 from 'react-native-vector-icons/FontAwesome5';

const Card = ({ imageSource,icon, text, onPress }:any) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      {imageSource&&<Image source={imageSource} style={styles.image} />}
      {icon &&<View style={{ marginRight:10 }}><Icon name={'globe'} size={50} color={'black'}  /></View>}
      <Text style={styles.text}>{text}</Text>
      <Icon name="arrow-right" size={20} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    width:"100%",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  text: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 10,
    color:'black'
  },
  icon: {
    color: 'black',
  },
});

export default Card;

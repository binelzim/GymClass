import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Treino() {
  const navigation = useNavigation();

  const handleStartTraining = () => {
    navigation.navigate('TreinoIniciar'); // Alteração aqui para o nome correto da tela
  };

  return (
    <View style={styles.container}>
      <View style={styles.inicioRapido}>
        <Text style={styles.inicioRapidoText}>Início Rápido:</Text>
      </View>
      <TouchableOpacity style={styles.addTreino} onPress={handleStartTraining}> 
        <View style={styles.mais}>
          <Image source={require('./img/mais.png')} style={styles.iconMais} />
        </View>
        <Text style={styles.addTreinoText}>Iniciar novo treinamento</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(41, 38, 38, 1)',
  },
  inicioRapido: {
    marginTop: 50,
    marginLeft: 5
  },
  inicioRapidoText: {
    color: 'yellow',
    fontSize: 20,
    marginRight: 40
  },
  addTreino: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(27, 27, 27, 1)',
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  mais: {
    marginRight: 10,
  },
  addTreinoText: {
    color: 'yellow',
    fontSize: 20,
  },
  iconMais: {
    width: 15,
    height: 15,
  },
});

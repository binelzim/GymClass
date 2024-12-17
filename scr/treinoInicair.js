import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';
import { Video } from 'expo-av';
import { AntDesign } from '@expo/vector-icons';

export default function App() {
  const [duracaoStatus, setDuracaoStatus] = useState("0:00");
  const [volumeStatus, setVolumeStatus] = useState(0);
  const [totalRepeticoes, setTotalRepeticoes] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [pesoInput, setPesoInput] = useState('');
  const [repeticaoInput, setRepeticaoInput] = useState('');
  const [numConjuntosAdicionais, setNumConjuntosAdicionais] = useState(0);
  const [series, setSeries] = useState([]);
  const [ultimoNumeroSerie, setUltimoNumeroSerie] = useState(1);

  useEffect(() => {
    const startTimer = () => {
      let seconds = 0;
      const intervalId = setInterval(() => {
        seconds++;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        setDuracaoStatus(`${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`);
      }, 1000);
      return () => clearInterval(intervalId);
    };

    startTimer();
  }, []);

  useEffect(() => {
    let novoVolume = 0;
    let novasRepeticoes = 0;
    series.forEach(({ peso, repeticao }) => {
      novoVolume += parseInt(peso) * parseInt(repeticao);
      novasRepeticoes += parseInt(repeticao);
    });
    setVolumeStatus(novoVolume);
    setTotalRepeticoes(novasRepeticoes);
  }, [series]);

  const handleAddAnotherSerie = () => {
    const novaSerie = {
      serie: ultimoNumeroSerie + series.length,
      peso: pesoInput,
      repeticao: repeticaoInput
    };
    setSeries([...series, novaSerie]);
    setPesoInput('');
    setRepeticaoInput('');
    setNumConjuntosAdicionais(prev => prev + 1);
  };

  const handleDeleteSerie = (serieIndex) => {
    const updatedSeries = [...series];
    updatedSeries.splice(serieIndex, 1);
    setSeries(updatedSeries);
    setNumConjuntosAdicionais(prev => prev - 1);
  };

  const handleInputChange = (index, field, value) => {
    const updatedSeries = [...series];
    updatedSeries[index][field] = value;
    setSeries(updatedSeries);
  };

  const handleFinalizar = () => {
    setModalVisible(false);
  };

  const openModal = () => {
    setModalVisible(true);
    setNumConjuntosAdicionais(series.length);
  };

  return (
    <View style={styles.container}>
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>Duração: {duracaoStatus}</Text>
        <Text style={styles.bottomText}>Volume: <Text>{volumeStatus}</Text></Text>
        <Text style={styles.bottomText}>Repetições: <Text>{totalRepeticoes}</Text></Text>
      </View>

      <ScrollView style={styles.exerciseContainer} contentContainerStyle={{ paddingRight: 20 }}>
        <View style={styles.centerContainer}>
          <Image source={require('./img/peso.png')} style={styles.iconTreino} />
          <Text style={styles.TextExe}>Exercicios:</Text>
        </View>

        <TouchableOpacity style={styles.exerciseButton} onPress={openModal}>
          <View style={styles.exerciseInfo}>
            <Image source={require('./img/supino.webp')} style={styles.exerciseImage} />
            <Text style={styles.exerciseText}>supino reto com halteres</Text>
          </View>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={[styles.closeButton, { top: 20, left: 20 }]}>
              <Image source={require('./img/seta.png')} style={styles.closeIcon} />
            </TouchableOpacity>
            <View style={styles.modalTextContainer}>
              <Text style={styles.modalText}>Supino reto com halteres</Text>
            </View>
            <View style={styles.videoContainer}>
              <Video
                source={require('./img/supino.mp4')}
                shouldPlay
                isLooping
                style={styles.video}
              />
              <Text style={styles.exerciseDescription}>Aqui vai a descrição do exercício, explicando como deve ser feito.</Text>

              {series.map((serie, index) => (
                <View key={index} style={styles.inputContainer}>
                  <Text style={styles.input}>Serie: {serie.serie}</Text>
                  <TextInput
                    style={styles.input}
                    value={serie.peso}
                    onChangeText={(value) => handleInputChange(index, 'peso', value)}
                    placeholder="Volume"
                    keyboardType="numeric"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  />
                  <TextInput
                    style={styles.input}
                    value={serie.repeticao}
                    onChangeText={(value) => handleInputChange(index, 'repeticao', value)}
                    placeholder="Repetição"
                    keyboardType="numeric"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  />
                  <TouchableOpacity onPress={() => handleDeleteSerie(index)} style={styles.deleteIcon}>
                    <AntDesign name="delete" size={19} color="red" />
                  </TouchableOpacity>
                </View>
              ))}

              <TouchableOpacity onPress={handleAddAnotherSerie} style={styles.button}>
                <Text style={styles.buttonText}>Adicionar outra série</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleFinalizar} style={styles.button}>
                <Text style={styles.buttonText}>Finalizar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(41, 38, 38, 1)',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  bottomText: {
    color: 'yellow',
    fontSize: 16,
  },
  centerContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconTreino: {
    width: 100,
    height: 100,
  },
  TextExe: {
    fontSize: 25,
    color: 'yellow',
  },
  exerciseContainer: {
    flex: 1,
    marginTop: 20,
  },
  exerciseButton: {
    width: '100%',
    backgroundColor: 'rgba(27, 27, 27, 1)',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
  },
  exerciseInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exerciseImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 50,
  },
  exerciseText: {
    color: 'yellow',
    fontSize: 16,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(41, 38, 38, 1)',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  closeIcon: {
    width: 24,
    height: 24,
    tintColor: 'yellow',
  },
  modalTextContainer: {
    position: 'absolute',
    top: 20,
    left: 70,
  },
  modalText: {
    fontSize: 30,
    color: 'yellow',
    marginTop: 30,
    marginLeft: 20
  },
  videoContainer: {
    width: '90%',
    height: '38%',
    marginTop: -300, // Espaçamento inferior
  },
  video: {
    height: '60%'
  },
  exerciseDescription: {
    fontSize: 16,
    color: 'yellow',
    marginTop: 20, // Espaçamento superior
    textAlign: 'center', // Centralizar o texto
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  input: {
    height: 40,
    width: '30%',
    marginHorizontal: '2%',
    borderWidth: 1,
    padding: 10,
    borderColor: 'yellow',
    color: 'yellow',
    borderRadius: 5,
    placeholderTextColor: 'rgba(255, 255, 255, 0.5)', // Esta é a linha adicionada
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  deleteIcon: {
    position: 'left',
    right: 7, // Ajuste a posição conforme necessário
    top: 8, // Ajuste a posição conforme necessário
  }
});

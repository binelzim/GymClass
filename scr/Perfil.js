import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert, Linking, TouchableWithoutFeedback, Keyboard, Modal } from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default function App() {
  const [isPerfilPage, setIsPerfilPage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [sex, setSex] = useState('');
  const [bmr, setBMR] = useState(null);
  const [showSettings, setShowSettings] = useState(false); // Novo estado para controlar a visibilidade da tela de configurações

  

  const handleChooseImage = () => {
    const options = {
      title: 'Selecione uma imagem',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('O usuário cancelou');
      } else if (response.error) {
        console.log('Erro: ', response.error);
      } else {
        setSelectedImage(response.uri);
      }
    });
  };

  const calculateBMR = () => {
    if (weight && height && sex) {
      const weightKg = parseFloat(weight);
      const heightCm = parseFloat(height);
      let bmrValue = 0;

      if (sex === 'Homem') {
        bmrValue = 10 * weightKg + 6.25 * heightCm - 5 * 25 + 5;
      } else if (sex === 'Mulher') {
        bmrValue = 10 * weightKg + 6.25 * heightCm - 5 * 25 - 161;
      } else {
        Alert.alert('Aviso', 'Por favor, insira apenas "Homem" ou "Mulher" como sexo.');
        return;
      }

      setBMR(bmrValue);

      Keyboard.dismiss();
    }
  };

  const closeModal = () => {
    setShowSettings(false); // Fechar a tela de configurações
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        
    
        <View style={styles.content}>
          <Text style={styles.nomeUsuario}>Nome do usuário</Text>
          {selectedImage ? (
            <TouchableOpacity onPress={handleChooseImage} >
              <Image source={{ uri: selectedImage }} style={styles.profileImage} />
              <Image source={require('./img/pencil.png')} style={styles.pencilIcon} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.chooseImageButton} onPress={handleChooseImage}>
              <Image source={require('./img/profile_default.png')} style={styles.profileImage} />
              <Image source={require('./img/pencil.png')} style={styles.pencilIcon} />
            </TouchableOpacity>
          )}
        </View>


        <View style={styles.line1} />
        <View style={styles.calculadora}>
          <View style={styles.userDetails}>
            <Text style={styles.caloriaTexto}>Calculadora de calorias</Text>
            <TextInput
              style={styles.input}
              placeholder="Peso (kg)"
              keyboardType="numeric"
              value={weight}
              onChangeText={text => setWeight(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Altura (cm)"
              keyboardType="numeric"
              value={height}
              onChangeText={text => setHeight(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Sexo (Homem/Mulher)"
              value={sex}
              onChangeText={text => setSex(text)}
            />
            <TouchableOpacity style={styles.calculateButton} onPress={calculateBMR}>
              <Text style={styles.calculateButtonText}>Calcular TMB</Text>
            </TouchableOpacity>
            {bmr !== null && (
              <Text style={styles.bmrText}>Sua TMB é: {bmr.toFixed(2)} calorias por dia</Text>
            )}
          </View>
        </View>

        {/* Modal para a tela de configurações */}
        <Modal
          visible={showSettings}
          transparent={true}
          animationType="slide"
          onRequestClose={closeModal}
        >
          <View style={styles.settingsModal}>
            <Text style={styles.settingsTitle}>Configurações</Text>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.closeButton}>Fechar</Text>
            </TouchableOpacity>
            {/* Aqui você pode adicionar mais opções de configurações, como mudar a senha */}
          </View>
        </Modal>

        <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/oficialacademiapowerfit/?hl=en')} style={styles.instagramButton}>
          <Text style={styles.instagramText}>Nosso Instagram:</Text>
          <Image source={require('./img/insta.png')} style={styles.instagramIcon} />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(41, 38, 38, 1)',
    alignItems: 'center'
  },
  top: {
    paddingTop: 30,
    backgroundColor: 'rgba(27, 27, 27, 1)',
    width: '100%',
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  nomeUsuario: {
    color: 'yellow',
    fontSize: 20,
    marginTop: 40,
  },
  
  line1: {
    width: '100%',
    height: 3,
    backgroundColor: 'rgba(27, 27, 27, 1)',
    marginTop: 20,
  },
  line2: {
    width: '100%',
    height: 3,
    backgroundColor: 'rgba(27, 27, 27, 1)',
    marginTop: -160,
    
  },

  PerfilText: {
    color: 'yellow',
    fontSize: 40,
  },
  content: {
    marginTop: 0,
    
    width: '100',
    height: '20%',
    justifyContent: 'center'
    
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 75,
    marginBottom: 0
  },
  chooseImageButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 75,
    alignItems: 'center',
    
  },
  chooseImageText: {
    color: 'yellow',
    fontSize: 16,
  },
  pencilIcon: {
    width: 20,
    height: 20,
    position: 'absolute',
    bottom: 6,
    right: 20,
  },
  calculadora: {
    width: '46%',
    marginBottom: '50%',
  },
  caloriaTexto: {
    color: 'yellow',
    fontSize: 20,
    marginTop: '7%',
    marginBottom: '10%',
  },
  userDetails: {
    marginTop: 20,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  calculateButton: {
    backgroundColor: 'rgba(27, 27, 27, 1)',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  calculateButtonText: {
    color: 'yellow',
    fontSize: 16,
  },
  bmrText: {
    marginTop: 10,
    color: 'white',
    fontSize: 16,
  },
  instagramButton: {
    position: 'absolute',
    bottom: 20,
    height: 70,
    alignItems: 'center',
    marginBottom: 0,
  },
  instagramIcon: {
    width: 50,
    height: 50,
    marginBottom: 5, 
   },
  instagramText: {
    color: 'yellow',
    fontSize: 16,
    marginBottom: 5, 
  },


});

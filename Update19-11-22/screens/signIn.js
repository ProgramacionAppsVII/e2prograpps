import React from "react";
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { Input, NativeBaseProvider, Button, Icon, Box, AspectRatio } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import { firebaseConfig } from "../database/firebase";

function SignIn(props){
    const navigation = useNavigation();
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    
  
    
    const app= initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const [fontsLoaded, setFontsLoaded] = useState(false);
    useEffect( () => {
        loadFonts()
    });
    const loadFonts = async () => {
        await Font.loadAsync({
            'OpenSans-Bold': require('../assets/fonts/OpenSans-Bold.ttf'),
            'OpenSans-Regular': require('../assets/fonts/OpenSans-Regular.ttf'),
        })
        setFontsLoaded(true);
    }
    if (!fontsLoaded){
        return (<View/>);
    }
    const handleCreateAccount = () => {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Cuenta Creada!')
        const user = userCredential.user;
        console.log (user)
        navigation.navigate("Autenticacion");
      })
      .catch(error => {
        console.log(error)
        Alert.alert(error.message)
      })
    }
    const handleSignIn = () => {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Inicio de sesion!')
        const user = userCredential.user;
        console.log (user);
        props.navigation.navigate("UsersList");
       //No accede a la pagina deseada
      })
      .catch(error => {
        console.log(error)
      })
    }
  return(
    <View style={styles.container}>
          <TouchableOpacity  onPress={() => navigation.navigate("Autenticacion")}>
            <Image style={styles.imageBack} source={require('../assets/images/back.png')}></Image>
          </TouchableOpacity>
        <View style={styles.center}>
        <Image style={styles.imageLogo} source={require('../assets/images/UndrawBienveniddo.png')}/>
        <View>
            <Text style={styles.fuenteBold}>Bienvenido</Text>
        </View>
        <View>
            <Text style={styles.fuenteRegularBienvenida} >Registrate y se parte del equipo!</Text>
        </View>
          <View style={styles.formularioContainer}>
              <Text style={styles.fuenteRegularFormulario}>Nombre</Text>
              <Input style={styles.inputStyle}></Input>
          </View>
          <View style={styles.formularioContainer}>
              <Text style={styles.fuenteRegularFormulario}>Correo</Text>
              <Input style={styles.inputStyle} onChangeText= {(text) => setEmail(text)} placeholder="Correo"/>
          </View>
          <View style={styles.formularioContainer}>
              <Text style={styles.fuenteRegularFormulario}>Contraseña</Text>
              <Input secureTextEntry={true} style={styles.inputStyle} onChangeText= {(text) => setPassword(text)} placeholder="password"/>
          </View>
          <View style={styles.formularioContainer}>
              <Text style={styles.fuenteRegularFormulario}>Confirmar Contraseña</Text>
              <Input secureTextEntry={true} style={styles.inputStyle}></Input>
          </View>
        <View style={styles.viewButton}>
          <TouchableOpacity style={styles.buttonStyle} onPress={handleCreateAccount}>
            <Text style={styles.letraButton}>Registrate</Text>
          </TouchableOpacity>
        </View>
        </View>
    </View>
  );
}

export default () => {
    return (
      <NativeBaseProvider>
          <SignIn />
      </NativeBaseProvider>
    )
  }  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Constants.statusBarHeight,
    paddingBottom: '7%',
    paddingHorizontal: '5%',
    height: hp('100%'),
    width: wp('100%'),
  },
  fuenteBold:{
    fontFamily: 'OpenSans-Bold',
    fontSize: 32,
    textAlign: 'center',
    color: "#000000",
    paddingTop: 10,
  },
  imageLogo: {
    width: 198,
    height: 181,
    resizeMode: 'contain',
  },
  fuenteRegularBienvenida:{
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    textAlign: 'center',
    color: "#000000",
    paddingBottom: 40,
  },
  fuenteRegularFormulario:{
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    textAlign: 'left',
    color: "#000000",
  },
  formularioContainer:{
    width: 327,
    height: 80,
  },
  inputStyle:{
    height: 48,
    borderRadius: 8,
  },
  viewButton:{
    paddingTop: 30,
  },
  buttonStyle:{
    backgroundColor: '#FFC64B',
    width: 300,
    height: 47,
    borderRadius: 12,
  },
  letraButton: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    color: "#FFFFFF",
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBack: {
    marginTop: 10,
  }
})


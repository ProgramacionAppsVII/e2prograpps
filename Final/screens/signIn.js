import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, TextInput,ScrollView, Alert } from 'react-native';
import * as Font from 'expo-font';
import { Input, NativeBaseProvider, Button, Icon, Box, AspectRatio } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import firebase from "../database/firebase";
import { firebaseConfig } from "../database/firebase";


   function SignIn(){
    const navigation = useNavigation();
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const initalState = {name: "",apellidos: "",}
    const [state, setState] = useState(initalState);
    
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
      if (state.name === "" || state.apellidos==="" || auth ==="" || email === "" || password==="") {
        alert("Datos incompletos");}
        else{ 
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Cuenta Creada!')
        const user = userCredential.user;
        console.log (user)
        saveNewUser();
        navigation.navigate("Autenticacion");
      })
      .catch(error => {
        console.log(error)
        Alert.alert(error.message)
      })
    }
  }

      const handleChangeText = (value, name) => {
        setState({ ...state, [name]: value });
      };
    
      const saveNewUser = async () => {
        if (state.name === "" || state.apellidos==="") {
          alert("please provide a name");
        } else {
    
          try {
            await firebase.db.collection("users").add({
              name: state.name,
              apellidos: state.apellidos,
              correo: email,
            });
    
          } catch (error) {
            console.log(error)
          }
        }
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
              <Input style={styles.inputStyle} placeholder="Nombre" onChangeText={(value) => handleChangeText(value, "name")} value={state.name}/>
        </View>
        <View style={styles.formularioContainer}>
              <Text style={styles.fuenteRegularFormulario}>Apellidos</Text>
              <Input style={styles.inputStyle} placeholder="Apellidos" onChangeText={(value) => handleChangeText(value, "apellidos")} value={state.apellidos}/>
        </View>
          <View style={styles.formularioContainer}>
              <Text style={styles.fuenteRegularFormulario}>Correo</Text>
              <Input style={styles.inputStyle} placeholder="Correo" onChangeText= {(text) => setEmail(text)} /*onChangeText = {(value) => handleChangeText(value, "email")}  value={state.email}*//>
          </View>
          <View style={styles.formularioContainer}>
              <Text style={styles.fuenteRegularFormulario}>Contraseña</Text>
              <Input secureTextEntry={true} style={styles.inputStyle} onChangeText= {(text) => setPassword(text)} placeholder="Contraseña"/>
          </View>
        <View style={styles.viewButton}>
          <TouchableOpacity style={styles.buttonStyle} onPress= {() => {handleCreateAccount()}}>
          <Text style={styles.letraButton}>Crear Cuenta</Text>
          </TouchableOpacity>
        </View>
       
        </View>
    </View>

  );
  
}

export default () => {
    return (
      <NativeBaseProvider>
          <SignIn/>
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
    justifyContent: 'center',
    alignItems: 'center',
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
});


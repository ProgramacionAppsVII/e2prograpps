import React from "react";
import { NativeBaseProvider } from 'native-base';
import { StyleSheet, Text, View, Image, StatusBar, TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Input } from 'native-base';
const buscador = () => {
  return(
    <NativeBaseProvider>
        <View style = {styles.container}>
            <Text style= {styles.fuenteBoldTitulo}>Buscador</Text>
            <TextInput style={styles.inputStyle} placeholder="  Buscar en Abarrotes Don Juan"/>
        </View>
    </NativeBaseProvider>
  );
}

export default buscador;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      paddingTop: Constants.statusBarHeight,
      paddingBottom: '7%',
      paddingHorizontal: '5%',
      height: hp('100%'),
      width: wp('100%'),
      alignItems: 'center',
      justifyContent: 'center',
    },
    fuenteBoldTitulo:{
        fontFamily: 'OpenSans-Bold',
        fontSize: 20,
        textAlign: 'center',
        color: "#000000",
        paddingTop: 10,
        paddingBottom: 15,
    },
    inputStyle:{
        width: 343,
        height: 48,
        borderRadius: 15,
        backgroundColor: '#DCDCDD'
    }
});
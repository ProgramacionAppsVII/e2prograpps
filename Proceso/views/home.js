import { StyleSheet, Text, View, Image, StatusBar } from 'react-native';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { Input, NativeBaseProvider, Button, Icon, Box, AspectRatio } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Login(){
    const navigation = useNavigation();

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

  return(
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
}

export default () => {
    return (
      <NativeBaseProvider>
          <Login />
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  fuenteBold:{
    fontFamily: 'OpenSans-Bold',
    fontSize: 32,
    textAlign: 'center',
    color: "#000000",
    paddingTop: 10,
  },
  fuenteBoldRegistrate:{
    fontFamily: 'OpenSans-Bold',
    fontSize: 14,
    textAlign: 'center',
    color: "#000000",
    paddingHorizontal: 15,
    textDecorationLine: 'underline',
  },
  imageLogo: {
    width: 198,
    height: 181,
    resizeMode: 'contain',
  },
  fuenteRegular:{
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    textAlign: 'center',
    color: "#000000",
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
    width: 299,
    height: 47,
    borderRadius: 12,
  },
  direction: {
    flexDirection: 'row',
  },
  letraButton: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    color: "#FFFFFF",
  }
})
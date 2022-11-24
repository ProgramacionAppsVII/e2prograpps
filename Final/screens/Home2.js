import { StyleSheet, Text, View, Image, StatusBar} from 'react-native';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { Input, NativeBaseProvider, Button, Icon, Box, AspectRatio } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import Constants from 'expo-constants';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from "../database/firebase";


const UserScreen = (props) => {
  
    const navigation = useNavigation();
   
      const [users, setUsers] = useState([]);
    useEffect(() => {
      firebase.db.collection("users").onSnapshot((querySnapshot) => {
        const users = [];
        querySnapshot.docs.forEach((doc) => {
          const { name, apellidos } = doc.data();
          users.push({
            id: doc.id,
            name,
            apellidos,
          });
        });
        setUsers(users);
      });
    }, []);
  
  
    const [fontsLoaded, setFontsLoaded] = useState(false);
    useEffect( () => {
        loadFonts()
    });
    const loadFonts = async () => {
        await Font.loadAsync({
            'OpenSans-Bold': require('../assets/fonts/OpenSans-Bold.ttf'),
            'OpenSans-Regular': require('../assets/fonts/OpenSans-Regular.ttf'),
            'OpenSans-SemiBold': require('../assets/fonts/OpenSans-SemiBold.ttf'),
        })
        setFontsLoaded(true);
    }
    if (!fontsLoaded){
        return (<View/>);
    }

  return(
    <View style={styles.container}>
        <TouchableOpacity  onPress={() => navigation.navigate("Home")}>
          <Image style={styles.imageBack} source={require('../assets/images/back.png')}></Image>
        </TouchableOpacity>
        <Text style={styles.fuenteBold}>Lista de usuarios {users.name} {users.apellidos}</Text>
        <View style={styles.center}>
          <Image style={styles.imageLogo} source={require('../assets/images/usuarios.png')}/>
        </View>
      <ScrollView style={styles.letraButton}>
      
      
      {users.map((user) => {
          return (
            
            <ListItem
              key={user.id}
              bottomDivider
              onPress={() => { 
                props.navigation.navigate("UserDetailScreen", {
                  userId: user.id,
                });
              }}
              style={{backgroundColor: '#FFC64B'}}
            >
              <ListItem.Chevron />
              <Avatar
                // source={{
                //   uri:
                //     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIcAAACHCAMAAAALObo4AAAAY1BMVEX///8AAADu7u7Kysrn5+f39/crKyvy8vKsrKzh4eFISEj7+/t0dHSbm5tPT0+7u7vBwcFBQUEkJCS1tbWGhoaUlJQ3NzcfHx9hYWFtbW2MjIyjo6NWVlYVFRV+fn7T09MNDQ3FyXxLAAAEAElEQVR4nO1aSZajMAwtpkAmIEAIECrk/qfsrryWLMiAsGVq0f5bjP2RNYuvLwcHBwcHBwcHBwcHUcRB1jWn4lKcmq4M/N8hESZN7VHUTRKuzmI4eK9wCFZlEdQvWTyksh6TbfuWxQ/a7To0so8sflCuwCJ6rRgTkUTWabzXDIpNbJeGf5qeeGqrrmp3T0SsmrB/GYv/qk4Lk/GF3W0SoZdSVFO7CLuCPK/31mjcyDHNq+8NqUUfbNG4qjMu77xVQERytENj+61k/j6mxUqT74MVHikekH5yD1GP63Y2aCg3ms5ooCJiwbFGykXMOcs9WvdJ3p3lSCMXXbsUqB0VY3GHApGmMYCxbDjpnw8OT9xkjvCFZxvL+UDfwVzvLVzPRATbtswXMOjJZvFoAVwDwBcyUR5n0FJuNEdNlVUQEDPfU4Odi0bdfbNQPRTzXjJVxSDasV+Bm6wlXXsMt31lv5Is8Xtc+Jt/u/IDaG6VB18epQ0e8XIrvNrgES23QsipZVMQyMNT9huQlLWi5UMFVsiVMt7kTZKGKhm4+cRwX6zZHITAg+vIMAERbobAtr+cf6h8ghf4A1jeCPPAjXcc/d/3y2jzocrFhLEanKlslHsA4qdXzJtuDGFgQXzmwsdMeb4mwVrHRjMGBTL7kfyVWsDdZ3wTaZNYaQmpqvWjsyZNI9lcHUGaTod3yuqTbp2078AzNuqM+vW35qSTxzAsTYQeQfrsooKeLrDYuBy31ndJqIqCKCzT0VOrTfbSGyOtjtkwDNmx6idPLPf6B48H61OYDyMghTWGQX4zS6NZY2QYXmd5nO3PC+NbMUvD8y6tZYlcL/MkHrhbaq4/gEk4C7Z0Nermzx7hZmU4Fj/Nvjyvr8osD4Ygz8onR/YXtQV9zSdn3G/J0zwquU0vTtyrJuP9+/K1QfjlRCyy5dyERvNJBYPGHpEz3TmdKxXDkUwEc1RKY5Mwks6SZExyHVSqoieeo4xpLiKUpgZkS76XpFFIpLgMa70vI1LcSDQfej0aIyICg0si36UBg4QjY10N1fB4+S0TzTK9GVU76QRyJUzDmkrdsV7fr8L3zSIN2spOL4YrP1KY0FDi0J1/bjWNbQRsZxt0YzF52ukPhLBoMvjbBwd1BnkiGouJ+WNHV9tktpCcf5skmti0+9b1IYmEOIhAdFMi1FKzdDeGbXR/fkBNN6JBIqWexWB04HSQPwGbJnp5CGSD2voF2EJJrJWq4gzbPHmACqzR6acKTrbAp2p1ELE5aJ7mYpjSueHA5OUxMNjpuHboUQrMDHBWoWN5gj8s4BCJ88/XFNCv18yAKDTG4QqCP5Jo/MaiAEFfy+jf7KXDw8HBwcHBwcHBweH/xR/8RicsX01E1gAAAABJRU5ErkJggg==",
                // }}
                source={require('../assets/images/avatarUsuario.png')}
                rounded
              />
              <ListItem.Content>
                <ListItem.Title style={styles.textNombre}>{user.name}</ListItem.Title>
                <ListItem.Subtitle style={styles.textApellidos}>{user.apellidos}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          
          );
        })}
      </ScrollView>
      <View style={styles.center}>
        <View style={styles.barraOpciones}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Image style={styles.imagesMenu} source={require('../assets/images/home.png')}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Add')}>
                <Image style={styles.imagesMenu} source={require('../assets/images/mas.png')}/>
            </TouchableOpacity  >
            <TouchableOpacity onPress={() => navigation.navigate("home2")}>
                <Image style={styles.principalImageMenu} source={require('../assets/images/usuario.png')}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

 
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Constants.statusBarHeight,
    paddingBottom: '7%',
    paddingHorizontal: '5%',
    height: hp('100%'),
    width: wp('100%'),
    // alignItems: 'center',
    justifyContent: 'center',
  },
  fuenteBold:{
    fontFamily: 'OpenSans-Bold',
    fontSize: 32,
    textAlign: 'center',
    color: "#000000",
    paddingTop: 30,
  },
  textNombre:{
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 20,
    textAlign: 'center',
    color: "#000000",
  },
  textApellidos:{
    fontFamily: 'OpenSans-Regular',
    fontSize: 15,
    textAlign: 'center',
    color: "#000000",
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
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBack: {
    marginTop: 10,
    alignItems: 'flex-start'   
  },
  barraOpciones:{
    width: 159,
    height: 45,
    borderRadius: 50, 
    backgroundColor: '#E05958',
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: 10,
  },
  principalImageMenu: {
    width: 25,
    height: 25,
    marginHorizontal: 13,
  },
  imagesMenu:{
      width: 25,
      height: 25,
      opacity: 0.5,
      marginHorizontal: 13,
  },
})

export default UserScreen;

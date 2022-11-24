import React, { useEffect, useState } from "react";

import {
  ScrollView,
  Button,
  View,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Image,
  Text,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

import { Input, NativeBaseProvider, Icon, Box, AspectRatio } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { ListItem, Avatar } from "react-native-elements";
import Constants from 'expo-constants';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';

import firebase from "../database/firebase";

const UserDetailScreen = (props) => {
  const navigation = useNavigation();

  const initialState = {
    id: "",
    name: "",
    apellidos: "",
  };

  const [user, setUser] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleTextChange = (value, prop) => {
    setUser({ ...user, [prop]: value });
  };

  const getUserById = async (id) => {
    const dbRef = firebase.db.collection("users").doc(id);
    const doc = await dbRef.get();
    const user = doc.data();
    setUser({ ...user, id: doc.id });
    setLoading(false);
  };

  const deleteUser = async () => {
    setLoading(true)
    const dbRef = firebase.db
      .collection("users")
      .doc(props.route.params.userId);
    await dbRef.delete();
    setLoading(false)
    props.navigation.navigate("home");
  };

  const openConfirmationAlert = () => {
    Alert.alert(
      "Removing the User",
      "Are you sure?",
      [
        { text: "Yes", onPress: () => deleteUser() },
        { text: "No", onPress: () => console.log("canceled") },
      ],
      {
        cancelable: true,
      }
    );
  };

  const updateUser = async () => {
    const userRef = firebase.db.collection("users").doc(user.id);
    await userRef.set({
      name: user.name,
      apellidos: user.apellidos,
    });
    setUser(initialState);
    props.navigation.navigate("home2");
  };

  useEffect(() => {
    getUserById(props.route.params.userId);
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <View  style={styles.container}>
      <TouchableOpacity  onPress={() => navigation.navigate("home2")}>
        <Image style={styles.imageBack} source={require('../assets/images/cerrar.png')}></Image>
      </TouchableOpacity>
      <View style= {styles.centrado}>
      <Text style={styles.title}>Perfil</Text>
      <Image style={styles.imageLogo} source={require('../assets/images/fantasmita.png')}/>
      <ScrollView scrollEnabled={false}>
        <View>
          <TextInput
            placeholder="Name"
            autoCompleteType="username"
            style={styles.inputGroup}
            value={user.name}
            onChangeText={(value) => handleTextChange(value, "name")}
          />
        </View>
        <View>
          <TextInput
            autoCompleteType="apellidos"
            placeholder="apellidos"
            style={styles.inputGroup}
            value={user.apellidos}
            onChangeText={(value) => handleTextChange(value, "apellidos")}
          />
        </View>
        <View style={styles.btn}>
          {/* <Button
            onPress={() => openConfirmationAlert()}
          /> */}
          <View style={styles.viewButton}>
                <TouchableOpacity style={styles.buttonStyle} onPress={() => openConfirmationAlert()}>
                    <Text style={styles.letraButton}>Eliminar usuario</Text>
                </TouchableOpacity>
          </View>
        {/* <View>
          <Button title="Update" onPress={() => updateUser()} color="#19AC52" />
        </View> */}
          <View style={styles.viewButton}>
                <TouchableOpacity style={styles.buttonStyle} onPress={() => updateUser()}>
                    <Text style={styles.letraButton}>Guardar Cambios</Text>
                </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      </View>
    </View>
  );
};


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
  centrado: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    textAlign: 'center',
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
  },
  btn: {
    marginTop: 80,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 10,
  },
  imageBack: {
    marginTop: 10,
    marginBottom: 40,
    alignItems: 'flex-start'   
  },
  imageLogo: {
    width: 198,
    height: 181,
    resizeMode: 'contain',
  },
  viewButton:{
    paddingTop: 10,
  },
  buttonStyle:{
    backgroundColor: '#FFC64B',
    width: 300,
    height: 47,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letraButton: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    color: "#FFFFFF",
  },
});

export default UserDetailScreen;


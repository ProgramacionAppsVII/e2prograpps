import * as React from 'react';
import * as RN from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { database } from '../database/firebase';
import { useNavigation } from '@react-navigation/native';
import EmojiPicker from 'rn-emoji-keyboard';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { NativeBaseProvider } from 'native-base';
import { StyleSheet, Text, View, Image, StatusBar, TextInput, Alert} from 'react-native';
import Constants from 'expo-constants';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function Add() {
    const navigation = useNavigation();
    const [isOpen, setIsOpen] = React.useState(false);
    const [newItem, setNewItem] = React.useState({
        idproducto: 0,
        emoji: '📷',
        name: '',
        price: 0,
        stock: 0,
        isSold: false,
        idproveedor: 0,
        categoria: '',
        createdAt: new Date(),
    });

    const handlePick = (emojiObject) => {
        setNewItem({
            ...newItem, 
            emoji: emojiObject.emoji,
 
        });
      /* example emojiObject = { 
          "emoji": "❤️",
          "name": "red heart",
          "slug": "red_heart",
        }
      */
    }

    const onSend = async () => {
        if (newItem.idproducto===''|| newItem.name===''|| newItem.price===''|| newItem.stock===''|| newItem.idproveedor===''|| newItem.categoria==='') {
           alert ("Datos incompletos");}
            else{ 
        const docRef = await addDoc(collection(database, 'products'), newItem);
        navigation.goBack();
      }
    }

    return(
        <RN.View style={styles.container}>
             <TouchableOpacity  onPress={() => navigation.navigate("Home")}>
                <Image style={styles.imageBack} source={require('../assets/images/cerrar.png')}></Image>
            </TouchableOpacity>
            <RN.View style={styles.centrado}>
            <RN.Text style={styles.title}>Agregar Producto</RN.Text>
            <RN.Text onPress={() => setIsOpen(true)} style={styles.emoji}>{newItem.emoji}</RN.Text>
            <EmojiPicker
                onEmojiSelected={handlePick}
                open={isOpen}
                onClose={() => setIsOpen(false)} 
            />
            <RN.TextInput 
                    clearButtonMode="always"
                    type="number"
                    keyboardType='numeric'
                    onChangeText={(text) => setNewItem({...newItem, idproducto: text})}
                    style={styles.inputContainer} 
                    placeholder='Id del producto' 
                />
                <RN.TextInput
                    clearButtonMode="always" 
                    onChangeText={(text) => setNewItem({...newItem, name: text})}
                    style={styles.inputContainer} 
                    placeholder='Nombre del producto' 
                />
                <RN.TextInput
                    clearButtonMode="always"
                    type="number"
                    keyboardType='numeric'
                    onChangeText={(text) => setNewItem({...newItem, price: text})}
                    style={styles.inputContainer} 
                   placeholder='$ Precio' 
                />
                <RN.TextInput
                    clearButtonMode="always" 
                    type="number"
                    keyboardType='numeric'
                    onChangeText={(text) => setNewItem({...newItem, stock: text})}
                    style={styles.inputContainer} 
                   placeholder='Cantidad de stock' 
                />
                <RN.TextInput   
                    clearButtonMode="always" 
                    onChangeText={(text) => setNewItem({...newItem, categoria: text})}
                    style={styles.inputContainer} 
                    placeholder='Categoria del producto' 
                />
                {/* <RN.TextInput
                    clearButtonMode="always" 
                    keyboardType='numeric'
                    type="number" 
                    onChangeText={(text) => setNewItem({...newItem, proveedor: text})}
                    style={styles.inputContainer} 
                    placeholder='Id del  proveedor' 
                /> */}
                <TouchableOpacity style={styles.button} onPress={onSend}>
                 <RN.Text style={styles.letraButton}>Guardar produto</RN.Text>
                </TouchableOpacity>
                </RN.View>
                <View style={styles.centerMenu}>
                    <View style={styles.barraOpciones}>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                                <Image style={styles.imagesMenu} source={require('../assets/images/home.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('Add')}>
                                <Image style={styles.principalImageMenu} source={require('../assets/images/mas.png')}/>
                            </TouchableOpacity  >
                            <TouchableOpacity onPress={() => navigation.navigate("home2")}>
                                <Image style={styles.imagesMenu} source={require('../assets/images/usuario.png')}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
        </RN.View>
    )
}

const styles = RN.StyleSheet.create({
    container: {
        // marginTop:80,
        // flex: 1,
        // backgroundColor: '#fff',
        // alignItems: 'center',
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: Constants.statusBarHeight,
        paddingBottom: '7%',
        paddingHorizontal: '5%',
        height: hp('100%'),
        width: wp('100%'),
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    centrado: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerMenu: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
    },
    button: {
        backgroundColor: '#FFC64B',
        fontSize:30,
        padding: 15,
        marginVertical: 6,
        borderRadius: 8,
        alignItems: 'center',
    }, 
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    inputContainer: {
        width: '90%',
        padding: 13,
        marginVertical: 6,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
      },
    emoji: {
        fontSize: 100,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        padding: 10,
        marginVertical: 6,
    },
    imageBack: {
        marginTop: 10,
        marginBottom: 80,
        alignItems: 'flex-start'   
    },
    letraButton: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 16,
        color: "#FFFFFF",
    },
    barraOpciones:{
        width: 159,
        height: 45,
        borderRadius: 50, 
        backgroundColor: '#E05958',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
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
});
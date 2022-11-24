import * as React from 'react';
import * as RN from 'react-native';
import { database } from '../database/firebase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { AntDesign } from '@expo/vector-icons';

import { NativeBaseProvider } from 'native-base';
import { StyleSheet, Text, View, Image, StatusBar, TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Product({
    id,
    idproducto,
    emoji,
    name,
    price,
    stock,
    categoria,
    idproveedor,
    isSold,
}) {
    var compra, cantidad, resta, valor;
    const onDelete = () => {
        const docRef = doc(database, 'products', id);
        deleteDoc(docRef);
    }
    const openConfirmationAlert = () => {
        RN.Alert.alert(
          "Error",
          "Es imposible comprar más del stock",
          [
            { text: "Ok", onPress: () => console.log("canceled") },
          ],
          {
            cancelable: true,
          }
        );
      };

    const onEdit = () => {
        const docRef = doc(database, 'products', id);
        if (compra===undefined) {
            alert ("Agregue la cantidad que desea comprar");}
            else{ 
        valor = parseInt(compra)
        valor = stock-valor
        cantidad = parseInt(valor)
        if(cantidad===undefined || compra===0){ 
            alert ("Añade otro numero");}
        if (cantidad>0){
            updateDoc(docRef, { stock: cantidad, })
        }
        if (cantidad===0){
            updateDoc(docRef, { stock: 0, })
            updateDoc(docRef, { isSold: true, })
        }
        if(cantidad<0){
            openConfirmationAlert()

        }
    }
}

    return(
        <RN.View>
            <RN.View style={styles.productContainer}>
                <RN.View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <RN.Text style={styles.emoji}>{emoji}</RN.Text>
                    <AntDesign onPress={onDelete} name="delete" size={24} color="black" />
                </RN.View>
                <RN.Text style={styles.name}>{name}</RN.Text>
                {/* <RN.Text style={styles.idproducto}>ID: {idproducto}</RN.Text> */}
                <RN.Text style={styles.price}>ID: {idproducto}</RN.Text>
                <RN.Text style={styles.price}>Precio: ${price} pesos</RN.Text>
                <RN.Text style={styles.price}>{categoria}</RN.Text>
                <RN.Text style={styles.stock}>Stock: {stock}</RN.Text>
                <RN.TextInput clearTextOnFocus="true" clearButtonMode="always" type="number" placeholderTextColor={'gray'} placeholder=' Cantidad de venta' name="name" keyboardType='numeric' style={styles.textinput} onChangeText={(val) => compra=val}/>
                {isSold ? (
                    <RN.TouchableOpacity 
                    style={[styles.button, {backgroundColor: 'gray'}]}>
                    <RN.Text style={styles.buttonText}>Vendido</RN.Text>
                </RN.TouchableOpacity>
                )
                : (
                    <RN.TouchableOpacity 
                    onPress={onEdit}
                    style={styles.button}>
                    <RN.Text style={styles.buttonText}>Comprar</RN.Text>
                </RN.TouchableOpacity>
                )}
            </RN.View>
        </RN.View>
    )
}

const styles = RN.StyleSheet.create({
    // container: {
    //     flex: 1,
    //     backgroundColor: '#FFFFFF',
    //     paddingTop: Constants.statusBarHeight,
    //     paddingBottom: '7%',
    //     paddingHorizontal: '5%',
    //     height: hp('100%'),
    //     width: wp('100%'),
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    productContainer: {
        padding: 16,
        backgroundColor: '#E8E7E7',
        margin: 16,
        borderRadius: 10,
    },
    View: {
        marginTop: 25,
        backgroundColor: '#fff',
        margin: 16,
        borderRadius: 8,
    },
    emoji: {
        fontSize: 100,
    },
    name: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    textinput: {
        fontSize: 25,
        backgroundColor: '#F6F6F6',
        opacity: 0.5,
        borderBottomWidth: 4,
        borderColor: '#E05958',
        marginRight: 25,
        borderRadius: 5,
        fontWeight: 'italic',
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'gray',
    },
    stock: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFC64B',
    },
    button: {
        backgroundColor: '#FFC64B',
        padding: 10,
        marginVertical: 6,
        borderRadius: 8,
        alignItems: 'center'
    }, 
    placeholder: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
});
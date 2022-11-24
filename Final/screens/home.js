import * as React from 'react';
import * as RN from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { database } from '../database/firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Product from '../screens/Product';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { StyleSheet, Text, View, Image, StatusBar, TextInput} from 'react-native';
import Constants from 'expo-constants';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default function Home() {

    const [products, setProducts] = React.useState([]);
    const navigation = useNavigation();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <RN.Button title='Add' onPress={() => navigation.navigate('Add')} />
        })
    },[navigation])

    React.useEffect(() => {
        const collectionRef = collection(database, 'products');
        const q = query(collectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, querySnapshot => {
        console.log('querySnapshot unsusbscribe');
          setProducts(
            querySnapshot.docs.map(doc => ({
                id: doc.id,
                idproducto: doc.data().idproducto,
                emoji: doc.data().emoji,
                name: doc.data().name,
                price: doc.data().price,
                idproveedor:doc.data().idproveedor,
                categoria:doc.data().categoria,
                stock: doc.data().stock,
                isSold: doc.data().isSold,
                idproveedor: doc.data().idproveedor,
                createdAt: doc.data().createdAt,
            }))
          );
        });
    return unsubscribe;
    },[])

    return(
        <RN.View style={styles.container}>
            <RN.Text style={styles.title}>Productos</RN.Text>
            <RN.View style={styles.inputContainer}>
                <Image style={styles.searchImage} source={require('../assets/images/lupa.png')}/>
                <TextInput placeholder="  Buscar en Abarrotes Don Juan"/>
            </RN.View>
            <RN.ScrollView contentContainerStyle={{paddingBottom: 100}}>
                
                    {products.map(product => <Product key={product.id} {...product} />)}

            </RN.ScrollView>
            {/* <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Add')}>
                <RN.Text style={styles.letraButton}>Agregar Producto</RN.Text>
            </TouchableOpacity> */}
            <RN.View style={styles.barraOpciones}>
                <RN.View style={{flexDirection: 'row'}}>
                    <TouchableOpacity >
                        <Image style={styles.principalImageMenu} source={require('../assets/images/home.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Add')}>
                        <Image style={styles.imagesMenu} source={require('../assets/images/mas.png')}/>
                    </TouchableOpacity  >
                    <TouchableOpacity onPress={() => navigation.navigate("home2")}>
                        <Image style={styles.imagesMenu} source={require('../assets/images/usuario.png')}/>
                    </TouchableOpacity>
                </RN.View>
            </RN.View>
        </RN.View>
    )
}

const styles = RN.StyleSheet.create({
    container: {
        // flex: 1,
        // marginTop:10,
        // backgroundColor: '#F7E9E5',
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
     buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#white',
    },
    button: {
        backgroundColor: '#FC6337',
        fontSize:30,
        padding: 15,
        marginVertical: 6,
        marginLeft:80,
        marginRight:80,
        borderRadius: 8,
        alignItems: 'center',
   }, 
    title: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 30,
        textAlign: 'center',
        color: "#000000",
        paddingTop: 10,
        paddingBottom: 15,
        // fontSize: 35,
        // fontWeight: 'bold',
        // margin: 16,
    },
    inputContainer:{
        width: 343,
        height: 48,
        borderRadius: 15,
        backgroundColor: '#DCDCDD',
        flexDirection: 'row',
    },
    searchImage: {
        width: 20,
        height: 20,
        opacity: 0.3,
        marginHorizontal: 13,
        marginTop: 15,
    },
    barraOpciones:{
        width: 159,
        height: 45,
        borderRadius: 50, 
        backgroundColor: '#E05958',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        // marginVertical: 20,
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
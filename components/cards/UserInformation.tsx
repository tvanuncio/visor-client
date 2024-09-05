import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Text, TextInput } from 'react-native';
import {
    responsiveScreenHeight,
    responsiveScreenWidth,
} from "react-native-responsive-dimensions";
import color from '../../utils/commons/ColorsCommon';
import { Roboto } from '../../utils/commons/Fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
SimpleLineIcons.loadFont()
Entypo.loadFont()

const UserInformation = () => {
    const fullName : string = "francisco"
    const correo : string = "Correo"
    return (
        <View style={[styles.container]}>
            <View style={[styles.viewText1]}>
                <Text style={[styles.text1]}>{`Hola ${fullName || ''}`}</Text>
            </View>
            <View style={[styles.viewText2]}>
                <Text style={[styles.text2]}>{`${correo ? correo : ''},`}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        width: responsiveScreenWidth(96),
        marginVertical: 15,
        paddingVertical: 10,
        backgroundColor: color.white,
        borderRadius: 20,
        borderWidth: 0.7,
        borderColor: color.grayIcons,
    },
    viewText1: {
        alignItems: "center",
        width: responsiveScreenWidth(96),
        borderBottomColor: color.grayIcons,
        paddingVertical: 10,
        borderBottomWidth: 1,
        justifyContent: "center",
    },
    viewText2: {
        alignItems: "center",
        justifyContent: "center",
    },
    text1: {
        fontFamily: Roboto.Bold,
        fontSize: 20,
        color: color.blueBack
    },
    text2: {
        fontFamily: Roboto.grayIcons,
        fontSize: 14,
        color: color.darkGray,
        textAlign: 'center',
        width: responsiveScreenWidth(80),
        marginTop: 10
    },

})

export default UserInformation;
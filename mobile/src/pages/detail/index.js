import React from 'react'
import { Feather } from '@expo/vector-icons'
import { View, Image, Text, StyleSheet, TouchableOpacity, ScrollView , Linking} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import logo from '../../assets/logo.png'
import Constants from 'expo-constants'
import * as MainComposer from 'expo-mail-composer'

export default function Details()
{
    const navigation = useNavigation()
    const incident = useRoute().params.incident

    const mensagem = `Olá ${incident.name}, estou entrando em contato pois gostária de ajudar no caso "${incident.title}" com o valor de ${incident.cost}`

    function navigateToHome()
    {
        navigation.goBack()
    } 

    function SendMain()
    {
        MainComposer.composeAsync( {
            subject: `Heroi do caso: ${incident.title}`,
            recipients: [ 'lucaspaszinski@gmail.com' ],
            body:mensagem
            
        })
        console.log('Hello Mail')
    }


    function SendWhatsapp()
    {
        ///Linking.openURL('whatsapp://send?text=' + this.state.msg + '&phone=91' + this.state.mobile_no);
        Linking.openURL(`whatsapp://send?phone=${5551995951406}&text=${mensagem}`)
        console.log( 'Hello Whatsapp' )
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.headerButton}
                    onPress={navigateToHome}>
                    <Feather name="arrow-left" size={24} color="#e02041" />
                    <Image style={styles.img} source={logo} />
                </TouchableOpacity>
            </View>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={styles.detailsList}>

                <View style={styles.details}>
                    <Text style={styles.detailsTitle}>ONG:</Text>
                    <Text style={styles.detailsValue}>{incident.name} - {incident.city}/{incident.uf}</Text>
                    <Text style={styles.detailsTitle}>CASO:</Text>
                    <Text style={styles.detailsValue}>{incident.title}</Text>
                    <Text style={styles.detailsTitle}>Descrição:</Text>
                    <Text style={styles.detailsValue}>{incident.description}</Text>
                    <Text style={styles.detailsTitle}>VALOR:</Text>
                    <Text style={styles.detailsValue}>{incident.cost}</Text>
                </View>

                <View style={styles.details}>
                    <Text
                        style={[ styles.detailsTitle, { fontSize: 24 } ]}>
                        Salve o Dia!
                    </Text>
                    <Text
                        style={[ styles.detailsTitle, { fontSize: 22 } ]}>
                        Seja o heroi desse caso!
                        </Text>
                    <Text
                        style={[ styles.detailsTitle, {
                            fontSize: 16,
                            color: '#737380',
                            marginTop: 10,
                            marginBottom: 10
                        } ]}>
                        Entre em contato:
                    </Text>
                    <View style={styles.communication}>
                        <TouchableOpacity
                            onPress={SendWhatsapp}
                            style={styles.contactButton}>
                            <Feather name="send" size={18} color="#FFF" />
                            <Text style={styles.detailsText}>Whatsapp</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={SendMain}
                            style={styles.contactButton}>
                            <Feather name="mail" size={18} color="#FFF" />
                            <Text style={styles.detailsText}>Email</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,

    },
    headerButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    headTxt: {
        fontSize: 15,
        color: '#737380'
    },
    headBold: {
        fontWeight: "bold"
    },
    img: {
        marginLeft: 5,
    },
    welcome: {
        fontSize: 30,

    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#737380'

    },
    detailsList: {

    },
    details: {
        marginTop: 8,
        padding: 24,
        borderRadius: 8,
        backgroundColor: "#FFF",
        marginBottom: 8,

    },
    detailsTitle: {
        fontSize: 14,
        color: "#41414d",
        fontWeight: 'bold'

    },
    detailsValue: {
        marginTop: 8,
        fontSize: 15,
        marginBottom: 24,
        color: "#737380",
        justifyContent: "space-between",
    },
    communication: {
        flex: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

    },
    contactButton: {
        margin: 5,
        flexDirection: "row",
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#e02041',
        height: 48,
        width: "45%"
    },
    detailsText: {
        marginLeft: 4,
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
    },
} )
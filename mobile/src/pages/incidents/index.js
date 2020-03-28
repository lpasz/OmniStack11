import React from 'react'
import { Feather } from '@expo/vector-icons'
import { View, Image, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import logo from '../../assets/logo.png'
import Constants from 'expo-constants'

export default function Incidents()
{
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.img} source={logo} />
                <Text style={styles.headTxt} >
                    Total de <Text style={styles.headBold}> 0 casos</Text>
                </Text>
            </View>
            <Text style={styles.welcome}>
                Bem Vindo!
            </Text>
            <Text style={styles.description}>
                Escolha um dos casos e salve o dia!
            </Text>

            <FlatList
                data={[ 1, 2, 3, 4 ]}
                renderItem={() => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentTitle}>ONG:</Text>
                        <Text style={styles.incidentValue}>APAD</Text>
                        <Text style={styles.incidentTitle}>CASO:</Text>
                        <Text style={styles.incidentValue}>Dev atropelado por um hipter de bike</Text>
                        <Text style={styles.incidentTitle}>VALOR:</Text>
                        <Text style={styles.incidentValue}>R$120</Text>
                        <TouchableOpacity
                            onPress={() => { }}
                            style={styles.details}>
                            <Text style={styles.detailsText}>Veja mais detalhes</Text>
                            <Feather name="arrow-right" size={18} color="#e02041" />
                        </TouchableOpacity>
                    </View> )}
                style={styles.incidentsList}
            />
        </View>
    )
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 30,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
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

    },
    welcome: {
        fontSize: 30,

    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#737380'

    },
    incidentList: {
        marginTop: 30,
        marginBottom: 30,
    },
    incident: {
        marginTop: 8,
        padding: 24,
        borderRadius: 8,
        backgroundColor: "#FFF",
        marginBottom: 8,

    },
    incidentTitle: {
        fontSize: 14,
        color: "#41414d",
        fontWeight: 'bold'

    },
    incidentValue: {
        marginTop: 8,
        fontSize: 15,
        marginBottom: 24,
        color: "#737380",
    },
    details: {
        borderRadius: 4,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    detailsText: {
        color: '#e02041',
        fontSize: 15,
        fontWeight: 'bold',
    },
} )
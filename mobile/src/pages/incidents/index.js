import React, { useState, useEffect } from 'react'
import { Feather } from '@expo/vector-icons'
import { View, Image, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import logo from '../../assets/logo.png'
import Constants from 'expo-constants'
import api from '../../services/api'

export default function Incidents()
{
    const navigation = useNavigation()
    const [ total, setTotal ] = useState( 0 );
    const [ page, setPage ] = useState( 1 );
    const [ loading, setLoading ] = useState( false );



    function navigateToDetails( incident )
    {
        navigation.navigate( 'Details', { incident } )
    }

    const [ incidents, setIncidents ] = useState( [] )

    async function LoadIncidents()
    {
        if ( loading && total > 0 && incidents.length === total )
        {
            return
        }

        setLoading( true )

        const response = await api.get( '/incidents', {
            params: {
                page
            }
        } )

        setIncidents( [ ...incidents, ...response.data ] )
        setPage( page + 1 )
        setTotal( response.headers.totalnumberofcases )
        
        setLoading( false )

    }


    useEffect( () =>
    {
        LoadIncidents()
    }, [] )


    FlatListHeader = () =>
    {
        return (
            <>
                    <Text style={styles.welcome}>
                        Bem Vindo!
                </Text>
                    <Text style={styles.description}>
                        Escolha um dos casos e salve o dia!
                </Text>
            </>)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.img} source={logo} />
                <Text style={styles.headTxt} >
                    Total de <Text style={styles.headBold}> {total} casos</Text>
                </Text>
            </View>



            <FlatList
                ListHeaderComponent={FlatListHeader}
                style={styles.incidentsList}
                data={incidents}
                keyExtractor={incident => String( incident.id )}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                onEndReached={LoadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={( { item: i } ) => (
                    <View key={i.id} style={styles.incident}>
                        <Text style={styles.incidentTitle}>ONG:</Text>
                        <Text style={styles.incidentValue}>{i.name}</Text>
                        <Text style={styles.incidentTitle}>CASO:</Text>
                        <Text style={styles.incidentValue}>{i.title}</Text>
                        <Text style={styles.incidentTitle}>VALOR:</Text>
                        <Text style={styles.incidentValue}>{i.cost = Intl.NumberFormat( 'pt-BR', { style: "currency", currency: 'BRL' } ).format( i.value )
                        }</Text>
                        <TouchableOpacity
                            onPress={() => navigateToDetails( i )}
                            style={styles.details}
                        >
                            <Text style={styles.detailsText}>Veja mais detalhes ...</Text>
                            <Feather name="arrow-right" size={18} color="#e02041" />
                        </TouchableOpacity>
                    </View> )}
            />
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
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,

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
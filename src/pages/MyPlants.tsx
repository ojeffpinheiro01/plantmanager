import React, { useEffect, useState } from 'react'
import { View, Image, Text, StyleSheet, FlatList } from 'react-native'
import { Jost_500Medium } from '@expo-google-fonts/jost'
import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Header } from '../components/Header'

import { plantLoad, PlantProps } from '../libs/storage'

import waterDrop from '../assets/waterdrop.png'

import colors from '../styles/colors'
import fonts from '../styles/fonts'
import { PlantCardSecondary } from '../components/PlantCardSecondary'

export function MyPLants() {
    const [myPlants, setMyPlants] = useState<PlantProps[]>([])
    const [loading, setLoading] = useState(true)
    const [nextWatered, setNextWatered] = useState<string>()

    useEffect(() => {
        async function loadStorageData() {
            const plantsStoraged = await plantLoad()
            const nextTime = formatDistance(
                new Date(plantsStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                { locale: ptBR }
            )
            setNextWatered(`Não esqueça de regar a ${plantsStoraged[0].name} à ${nextTime} horas`)
            setMyPlants(plantsStoraged)
            setLoading(false)
        }

        loadStorageData()

    }, [])

    return (
        <View style={styles.container}>
            <Header />

            <View style={styles.spotlight}>
                <Image source={waterDrop} style={styles.spotlightImage} />
                <Text style={styles.spotlightText}>{nextWatered}</Text>
            </View>

            <View style={styles.plants} >
                <Text style={styles.plantsTitle}>Próximas regadas</Text>
                <FlatList
                    data={myPlants}
                    keyExtractor={(item) => String(item.id)}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flex: 1 }}
                    renderItem={({ item }) => (
                        <PlantCardSecondary data={item} />
                    )} />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: Jost_500Medium,
        backgroundColor: colors.background
    },
    spotlight: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    spotlightImage: {
        width: 60,
        height: 60,
    },
    spotlightText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
    },
    plants: {
        flex: 1,
        width: '100%'
    },
    plantsTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20
    }
})
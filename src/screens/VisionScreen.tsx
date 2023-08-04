import React from 'react';
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native';

export default function VisionScreen() {
    return (
        <View style={styles.container}>
            <ScrollView>

                <Image resizeMode='contain' source={require('../assets/vision.png')} style={styles.image} />
                <Text style={styles.title}>Notre vision :</Text>
                <Text style={styles.description}>
                    La restauration de l’homme par l’action de l’Esprit
                    (la conversion et la transformation à l’image de Christ).
                </Text>
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginBottom: 10,
    },
    description: {
        fontSize: 18,
        textAlign: 'justify',
    },
});

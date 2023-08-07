import React from 'react';
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native';

export default function VisionScreen() {
    return (
        <View style={styles.container}>
            <ScrollView>


            <Text style={styles.title}>Our Vision </Text>
            <Text style={styles.text}>The Church in the Togo’s is rising to send missionaries to the world. This ministry is dedicated to the evangelization and discipleship of Togo and other West African nations through evangelistic crusades, teaching seminars, various media outreaches, and the planting of New Churches and Bible Schools.
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
    text: {
        fontSize: 18,
        textAlign: 'justify',
        marginTop: 5,
        color: 'black',
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

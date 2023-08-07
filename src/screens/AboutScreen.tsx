import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

export default function AboutScreen() {
    return (
        <View style={styles.container}>
            <ScrollView>

            <Text style={styles.title}>Our Vision </Text>
            <Text style={styles.text}>The Church in the Togo’s is rising to send missionaries to the world. This ministry is dedicated to the evangelization and discipleship of Togo and other West African nations through evangelistic crusades, teaching seminars, various media outreaches, and the planting of New Churches and Bible Schools.
            </Text>
            <Text style={styles.title}>Our mission </Text>

            <Text style={styles.text}>To evangelize the people of Togo, and the French-speaking countries of West Africa, teaching the Christians to spread the gospel and heal the sick everywhere.
            </Text>
     
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 18,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign:'center',
        color: 'black',
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
        textAlign: 'justify',
        marginTop: 5,
        color: 'black',
    },
    list: {
        fontSize: 18,
        textAlign: 'justify',

    },
});

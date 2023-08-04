import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

export default function AboutScreen() {
    return (
        <View style={styles.container}>
            <ScrollView>

            <Text style={styles.title}>Qui sommes nous?</Text>
            <Text style={styles.text}>
                <Text style={{ fontWeight: 'bold', color: 'black' }}>KATARTIZO</Text> est une association chrétienne qui s'aligne dans la vision globale de l'Eglise (celle de faire de toutes les nations des disciples Matthieu 28:18-20), particulièrement dans la conquête des âmes et l'équipement des chrétiens pour l'oeuvre du ministère.
            </Text>
            <Text style={styles.text}>C'est vraiment dans le cadre de l'oeuvre du Seigneur qui vise la restauration de l'homme selon le plan de Dieu, à savoir.
            </Text>
            <Text style={styles.text}>
                &#8226; Sa conversion (Matthieu 28v19; Marc 16v15).{'\n'}
                &#8226; Son perfectionnement ou sa transformation à l'image de Christ (Matthieu 28v20 Ephésiens 4v11-14 ){'\n'}
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
        marginTop: 5
    },
    list: {
        fontSize: 18,
        textAlign: 'justify',

    },
});

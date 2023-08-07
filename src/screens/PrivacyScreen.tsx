import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const PrivacyPolicyScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Politique de confidentialité pour l'application WSIM TV</Text>

      <Text style={styles.sectionHeader}>1. Données collectées</Text>
      <Text style={styles.text}>
        Nous souhaitons souligner que l'Application n'effectue aucune collecte de données personnelles des utilisateurs,
        telles que les noms, adresses e-mail, numéros de téléphone, ou toute autre information identifiant directement un utilisateur.
      </Text>

      <Text style={styles.sectionHeader}>2. Utilisation des Cookies</Text>
      <Text style={styles.text}>
        L'Application peut utiliser des cookies ou des technologies similaires à des fins d'analyse, d'amélioration des performances,
        et d'affichage de publicités ciblées. Les cookies sont de petits fichiers texte stockés sur votre appareil lorsque vous visitez notre Application.
        Ils ne contiennent aucune information personnelle vous concernant et sont utilisés uniquement à des fins techniques.
      </Text>

      <Text style={styles.sectionHeader}>3. Publicités</Text>
      <Text style={styles.text}>
        L'Application peut afficher des publicités fournies par des partenaires publicitaires tiers.
        Ces partenaires publicitaires peuvent utiliser des cookies et d'autres technologies pour collecter des informations sur vos activités de navigation,
        afin de vous proposer des publicités ciblées en fonction de vos intérêts. Ces informations sont anonymes et ne permettent pas de vous identifier personnellement.
      </Text>

      <Text style={styles.sectionHeader}>4. Liens vers des sites tiers</Text>
      <Text style={styles.text}>
        L'Application peut contenir des liens vers des sites tiers, tels que des sites de nos partenaires ou de nos annonceurs.
        Veuillez noter que cette Politique de confidentialité ne s'applique pas aux pratiques de confidentialité de ces sites tiers.
        Nous vous encourageons à lire les politiques de confidentialité de ces sites avant de fournir des informations les concernant.
      </Text>

      <Text style={styles.sectionHeader}>5. Sécurité</Text>
      <Text style={styles.text}>
        Nous prenons des mesures raisonnables pour protéger les informations que nous collectons et maintenir leur confidentialité.
        Cependant, comme aucune méthode de transmission sur Internet ou de stockage électronique n'est totalement sécurisée,
        nous ne pouvons garantir la sécurité absolue des informations que vous nous transmettez.
      </Text>

      <Text style={styles.sectionHeader}>6. Modifications de la Politique de confidentialité</Text>
      <Text style={styles.text}>
        Nous nous réservons le droit de modifier cette Politique de confidentialité à tout moment, sans préavis.
        Toute modification entrera en vigueur dès sa publication dans l'Application.
        Nous vous recommandons de consulter régulièrement cette page pour rester informé des éventuelles mises à jour.
      </Text>

      <Text style={styles.sectionHeader}>7. Contact</Text>
      <Text style={styles.text}>
        Si vous avez des questions ou des préoccupations concernant cette Politique de confidentialité,
        veuillez nous contacter à l'adresse suivante: lynxvision2013@gmail.com
      </Text>

      <Text style={styles.lastUpdated}>Dernière mise à jour : 06/08/2023</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: 'black',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
    color: 'black',
  },
  text: {
    fontSize: 14,
    marginBottom: 16,
    color: 'black',
  },
  lastUpdated: {
    marginTop: 20,
    color: '#888', // Couleur de texte légèrement grise
  },
});

export default PrivacyPolicyScreen;

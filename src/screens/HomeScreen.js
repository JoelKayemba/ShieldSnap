import React from 'react';
import {View, Text, StyleSheet} from 'react-native';


export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenue sur ShieldSnap 🛡📸</Text>
            <Text style={styles.subtitle}>Protégez vos images contre les captures d'écran et le téléchargement.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        textAlign: "center",
        paddingHorizontal: 20,
    },
});
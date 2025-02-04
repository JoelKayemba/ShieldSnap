import React, { useEffect } from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import * as ScreenCapture from "expo-screen-capture";

const { width } = Dimensions.get("window");

export default function ImagePreview({ imageUri }) {
    useEffect(() => {
        // Empêche les captures d’écran pour cet écran
        ScreenCapture.preventScreenCaptureAsync();

        return () => {
            ScreenCapture.allowScreenCaptureAsync();
        };
    }, []);

    if (!imageUri) {
        return null; // Si aucune image n'est disponible, ne rien afficher
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: imageUri }} style={styles.image} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    image: {
        width: width * 0.9,
        height: width * 0.9,
        borderRadius: 10,
        resizeMode: "contain",
    },
});

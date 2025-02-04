import React, { useState } from "react";
import { View, Button, Image, Alert, Text, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const API_URL = "http://10.0.2.2:5000"; 

export default function UploadScreen() {
    const [image, setImage] = useState(null);
    const [uploadedFileName, setUploadedFileName] = useState(""); 

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
    
        if (!result.canceled) {
            const allowedFormats = ["image/jpeg", "image/png"];
            if (!allowedFormats.includes(result.assets[0].mimeType)) {
                Alert.alert("Format non supporté", "Veuillez sélectionner une image JPG ou PNG.");
                return;
            }
            setImage(result.assets[0].uri);
        }
    };
    

    const uploadImage = async () => {
        if (!image) {
            Alert.alert("Erreur", "Veuillez sélectionner une image !");
            return;
        }

        const formData = new FormData();
        formData.append("image", {
            uri: image,
            name: "image.jpg",
            type: "image/jpeg",
        });

        try {
            const response = await axios.post(`${API_URL}/api/images/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            Alert.alert("Succès", "Image téléversée avec protection !");
            setUploadedFileName(response.data.filename);
        } catch (error) {
            console.error("Erreur lors du téléversement :", error.response?.data || error.message);
            Alert.alert("Erreur", "Le téléversement a échoué.");
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Choisir une image" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={styles.image} />}
            <Button title="Téléverser l'image" onPress={uploadImage} />

            {uploadedFileName !== "" && (
                <Text style={styles.filename}>
                    📄 Image sauvegardée sous : {uploadedFileName}
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 20,
    },
    filename: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: "bold",
        color: "green",
    },
});

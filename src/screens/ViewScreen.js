import React, { useEffect, useState } from "react";
import { 
    View, Text, Image, FlatList, Button, StyleSheet, ActivityIndicator, 
    Modal, TouchableOpacity, Alert 
} from "react-native";
import axios from "axios";
import * as ScreenCapture from "expo-screen-capture";
import * as FileSystem from "expo-file-system";

const API_URL = "http://10.0.2.2:5000"; 

export default function ViewScreen() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showImages, setShowImages] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [blurred, setBlurred] = useState(false);

    useEffect(() => {
        const subscription = ScreenCapture.addScreenshotListener(() => {
            setBlurred(true);
            Alert.alert("Protection", "La capture d’écran est détectée !");
        });

        return () => {
            subscription.remove();
        };
    }, []);

    const fetchImages = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/api/images`);
            setImages(response.data);
            setShowImages(true);
        } catch (error) {
            console.error("Erreur lors de la récupération des images :", error);
        } finally {
            setLoading(false);
        }
    };

    const downloadImage = async (imageName) => {
        try {
            const imageUrl = `${API_URL}/api/images/download/${imageName}`;
            const fileUri = FileSystem.documentDirectory + imageName;
            const { uri } = await FileSystem.downloadAsync(imageUrl, fileUri);

            Alert.alert("Succès", "L'image a été enregistrée avec un filigrane !");
            console.log("Image téléchargée :", uri);
        } catch (error) {
            console.error("Erreur lors du téléchargement :", error);
            Alert.alert("Erreur", "Impossible d'enregistrer l'image.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>📸 Images Protégées</Text>
            <Button title="Afficher les images" onPress={fetchImages} color="#007AFF" />

            {loading && <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 10 }} />}

            {showImages && (
                <FlatList
                    data={images}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => {
                            setSelectedImage(`${API_URL}/uploads/${item}`);
                            setModalVisible(true);
                        }}>
                            <Image
                                source={{ uri: blurred ? "https://via.placeholder.com/300?text=Flou" : `${API_URL}/uploads/${item}` }}
                                style={styles.image}
                            />
                        </TouchableOpacity>
                    )}
                />
            )}

            <Modal visible={modalVisible} transparent={true} animationType="fade">
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                        <Text style={styles.closeText}>✖</Text>
                    </TouchableOpacity>
                    <Image source={{ uri: selectedImage }} style={styles.fullImage} />
                    <Button title="Télécharger avec filigrane" onPress={() => downloadImage(selectedImage.split('/').pop())} color="#28A745" />
                </View>
            </Modal>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
    },
    image: {
        width: 300,
        height: 200,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        justifyContent: "center",
        alignItems: "center",
    },
    fullImage: {
        width: 350,
        height: 500,
        marginBottom: 20,
    },
    closeButton: {
        position: "absolute",
        top: 40,
        right: 20,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 50,
    },
    closeText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
    },
});


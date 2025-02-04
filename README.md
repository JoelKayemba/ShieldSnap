# Image Protect - Protégez Vos Images Contre l'Exploitation IA et la Capture d'Écran

## Description
**Image Protect** est une application qui permet de protéger les images contre l'exploitation abusive par les intelligences artificielles et les captures d’écran.  
L’image reste parfaitement visible à l’œil humain, mais devient floue, déformée ou inutilisable lorsqu’elle est analysée par une IA ou copiée en dehors de l’application.

---

## **Objectif**
- Afficher une image normalement sur les réseaux sociaux.
- Empêcher les IA d’analyser et de générer du contenu à partir d’elle.
- Rendre les captures d’écran inutilisables grâce à un floutage automatique.
- Protéger les images contre le téléchargement et la modification non autorisée.

---

## ⚙️ **Fonctionnalités**
###  **Protection Contre les IA**
- Ajout d’un **bruit dynamique** qui perturbe les algorithmes d’IA.  
- **Légères modifications des couleurs et des pixels** pour empêcher une copie parfaite.  
- **Watermark invisible** qui n’apparaît que lorsqu’un traitement automatique est détecté.

###  **Détection et Blocage des Captures d’Écran**
- **L’image devient floue ou pixelisée** lorsqu’une capture d’écran est détectée.  
- **Un avertissement s’affiche** pour signaler la tentative de capture.  

###  **Protection Contre le Téléchargement**
- **Ajout automatique d’un filigrane invisible** lorsqu’une image est téléchargée.  
- **Empêche l’extraction en dehors de l’application**.  

---

## 🛠 **Installation et Configuration**

###  **Prérequis**
- [Node.js](https://nodejs.org/) installé sur votre machine.
- [Expo](https://expo.dev/) installé pour le développement mobile.  
- Un serveur backend Node.js avec Express et Sharp.

###  **Installation**
#### 1️ **Cloner le projet**
```bash
git clone https://github.com/ton-repo/image-protect.git
cd image-protect

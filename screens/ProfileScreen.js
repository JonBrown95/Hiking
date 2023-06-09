import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import {
    userDocSnapshot,
    exists,
    collection,
    doc,
    getDoc,
    getDocs,
  } from "firebase/firestore";
  import { db } from "../firebase";

const ProfileScreen = () => {
    const navigation = useNavigation();
  const [bio, setBio] = useState([]);

  const handleSignout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("LoginScreen");
      })
      .catch((error) => alert(error.message));
  };

 
  const fetchBio = async () => {
    try {
      const userId = auth.currentUser?.uid;
      console.log(userId, '<---- userId');
  
      const userRef = collection(db, "users");
      const userDocRef = doc(userRef, userId);
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (userDocSnapshot.exists()) {
        const userBio = userDocSnapshot.data().bio;
        setBio(userBio);
        console.log(bio)
      }
    } catch (error) {
      console.error("Error fetching user document:", error);
    }
  };
  
  useEffect(() => {
    fetchBio();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Signed in as: {auth.currentUser?.email},</Text>
      <Text>Bio: {bio}</Text>
      <TouchableOpacity onPress={handleSignout} style={styles.button}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "50%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default ProfileScreen;

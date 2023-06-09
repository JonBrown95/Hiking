import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, firestore } from "../firebase";
import { db } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { collection, addDoc, setDoc, doc } from "@firebase/firestore";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, []);

  const handleSignup = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log("Registered with:", user.email);

        const usersCollectionRef = collection(db, "users");

        try {
          await setDoc(doc(usersCollectionRef, user.uid), {
            email: email,
            bio: bio,
            userId: user.uid,
          });
        } catch (error) {
          console.error("Error adding user document: ", error);
        }
      })
      .catch((error) => {
        console.error("Error creating user: ", error);
      });
  };

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: "Warning",
          text2: "Login!",
          position: "top",
        });
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/login.png")}
        style={styles.imageBackground}
        resizeMode="cover"
      ></ImageBackground>

      <View style={styles.formContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          underlineColorAndroid="transparent"
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
          underlineColorAndroid="transparent"
        />

        <TextInput
          placeholder="Bio"
          value={bio}
          onChangeText={(text) => setBio(text)}
          style={styles.input}
          underlineColorAndroid="transparent"
        />

        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSignup}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: "80%",
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    width: "100%",
  },
  button: {
    backgroundColor: "#2ecc71",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonOutline: {
    backgroundColor: "#2ecc71",
    marginTop: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  imageBackground: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoginScreen;

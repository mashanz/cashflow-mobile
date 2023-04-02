import { useState, useEffect } from "react";
import { getStringData } from "./service/async_storage";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import login from "./api/login";

export default function Login({ navigation }) {
  useEffect(() => {
    const getJwt = async () => {
      const jwt = await getStringData("@jwt");
      if (jwt) navigation.navigate("Tabs");
    };
    getJwt();
  }, []);

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    console.log("submit login");
    await login(identifier, password)
      .then((res) => {
        if (res.jwt) {
          navigation.navigate("Tabs");
        } else Alert.alert("Error", res.error.message);
      })
      .catch((err) => {
        Alert.alert("Error", "Unable connect to the server");
      });
  };
  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        onChangeText={(text) => {
          setIdentifier(text);
        }}
        style={styles.input}
        placeholder="Email"
      />
      <TextInput
        onChangeText={(text) => {
          setPassword(text);
        }}
        style={styles.input}
        secureTextEntry={true}
        placeholder="Password"
      />
      <Pressable
        onPress={async () => await handleLogin()}
        style={styles.button}
      >
        <Text
          style={{ color: "white", textAlign: "center", fontWeight: "bold" }}
        >
          Login
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 10,
  },
  input: {
    backgroundColor: "white",
    padding: 16,
    borderWidth: 1,
  },
  button: {
    padding: 20,
    backgroundColor: "blue",
  },
});

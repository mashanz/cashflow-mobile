import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";

export default function Login() {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Email" />
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Password"
      />
      <Pressable style={styles.button}>
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

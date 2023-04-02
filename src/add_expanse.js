import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import apiAddExpanse from "./api/expanses";

export default function AddExpanse({ route, navigation }) {
  const [date, setDate] = useState(new Date(Date.now()));
  const [show, setShow] = useState(false);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  useEffect(() => {
    console.log("ADD EXPANSE SCREEN");
  });

  console.log(route.params?.item || "");

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate("Cari Item")}>
        <Text style={styles.input}>{route.params?.item || ""}</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("Cari Category")}>
        <Text style={styles.input}>{route.params?.category || ""}</Text>
      </Pressable>

      <TextInput
        keyboardType="numeric"
        style={styles.input}
        placeholder="Harga"
        onChangeText={(text) => {
          setPrice(text);
        }}
      />
      <TextInput
        keyboardType="numeric"
        style={styles.input}
        placeholder="Quantity"
        onChangeText={(text) => {
          setQuantity(text);
        }}
      />
      <Pressable style={styles.input} onPress={() => setShow(true)}>
        <Text>{date.toLocaleString()}</Text>
      </Pressable>

      {show ? (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          onChange={onChange}
        />
      ) : null}

      <Pressable
        style={styles.button}
        onPress={async () => {
          console.log("save");
          const item = route.params?.id || 0;
          const transaction = date.toISOString();
          console.log(item, transaction);
          await apiAddExpanse(item, price, transaction, quantity)
            .then((res) => {
              console.log(res);
              Alert.alert("Success", "Berhasil di simpan");
              navigation.navigate("Tabs", {
                screen: "Home",
              });
            })
            .catch(() => {
              console.log("fail");
              Alert.alert("Error", "Unable to save Expanses");
            });
          console.log("done save");
        }}
      >
        <Text
          style={{ color: "white", textAlign: "center", fontWeight: "bold" }}
        >
          SIMPAN
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

import { useState } from "react";
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
import { getStringData } from "./service/async_storage";

export default function AddExpanse({ route, navigation }) {
  const [date, setDate] = useState(new Date(Date.now()));
  const [show, setShow] = useState(false);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [item_id, setItemId] = useState(0);
  const [item_name, setItemName] = useState("");
  const [category_id, setCategoryId] = useState(0);
  const [category_name, setCategoryName] = useState("");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const getLocalData = async () => {
    const item_id = await getStringData("@item_id");
    const item_name = await getStringData("@item_name");
    const category_id = await getStringData("@category_id");
    const category_name = await getStringData("@category_name");
    setItemId(item_id);
    setItemName(item_name);
    setCategoryId(category_id);
    setCategoryName(category_name);
  };
  getLocalData();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate("Cari Item")}>
        <Text style={styles.input}>{item_name || ""}</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("Cari Category")}>
        <Text style={styles.input}>{category_name || ""}</Text>
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
          if (
            item_id &&
            category_id &&
            price &&
            date.toISOString() &&
            quantity
          ) {
            await apiAddExpanse(
              item_id,
              category_id,
              price,
              date.toISOString(),
              quantity
            )
              .then((res) => {
                Alert.alert("Success", "Berhasil di simpan");
                navigation.navigate("Tabs", {
                  screen: "Home",
                });
              })
              .catch(() => {
                Alert.alert("Error", "Unable to save Expanses");
              });
          } else {
            Alert.alert("Error", "Please fill all the field");
          }
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

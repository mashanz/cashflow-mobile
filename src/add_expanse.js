import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Button,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function AddExpanse() {
  const [date, setDate] = useState(new Date(Date.now()));
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Nama Barang" />
      <TextInput
        keyboardType="numeric"
        style={styles.input}
        placeholder="Harga"
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

      <Pressable style={styles.button}>
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

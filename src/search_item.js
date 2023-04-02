import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { storeStringData } from "./service/async_storage";
import items, { addItems } from "./api/items";

export default function SearchItem({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);

  return (
    <View style={{ flex: 1, padding: 10, gap: 10 }}>
      <TextInput
        style={{ backgroundColor: "white", padding: 16, borderWidth: 1 }}
        placeholder="Cari Item"
        onChangeText={async (text) => {
          setLoading(true);
          setQuery(text);
          await items(text)
            .then((res) => {
              setResult(res["data"]);
            })
            .catch(() => Alert.alert("Error", "Something Error"));
          setLoading(false);
        }}
      />
      {loading ? <Text>Loading...</Text> : null}
      <View>
        {result.map((item, i) => {
          return (
            <Pressable
              key={i}
              style={styles.item}
              onPress={async () => {
                await storeStringData("@item_id", String(item["id"]));
                await storeStringData("@item_name", item["attributes"]["name"]);
                navigation.navigate("Tabs", {
                  screen: "Add Expanse",
                  params: {
                    item_id: item["id"],
                    item: item["attributes"]["name"],
                  },
                });
              }}
            >
              <Text>{item["attributes"]["name"]}</Text>
            </Pressable>
          );
        })}
      </View>

      {result.length == 0 && query !== "" && !loading ? (
        <Pressable
          style={{ padding: 20, backgroundColor: "blue" }}
          onPress={async () => {
            setLoading(true);
            await addItems(query)
              .then(async (res) => {
                if (res["data"]) {
                  await storeStringData("@item_id", String(res["data"]["id"]));
                  await storeStringData(
                    "@item_name",
                    res["data"]["attributes"]["name"]
                  );
                  navigation.navigate("Tabs", {
                    screen: "Add Expanse",
                    params: {
                      id: res["data"]["id"],
                      item: res["data"]["attributes"]["name"],
                    },
                  });
                } else {
                  Alert.alert("Error", res["error"]["message"]);
                }
              })
              .catch(() => {
                Alert.alert("Error", "Unable to save");
              });
            setLoading(false);
          }}
        >
          <Text
            style={{ textAlign: "center", color: "white", fontWeight: "bold" }}
          >
            Tambahkan Item Baru
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "gray",
  },
});

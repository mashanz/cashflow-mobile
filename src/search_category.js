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
import categories, { addCategories } from "./api/categories";

export default function SearchCategory({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);

  return (
    <View style={{ flex: 1, padding: 10, gap: 10 }}>
      <TextInput
        style={{ backgroundColor: "white", padding: 16, borderWidth: 1 }}
        placeholder="Cari Category"
        onChangeText={async (text) => {
          setLoading(true);
          setQuery(text);
          await categories(text)
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
                await storeStringData("@category_id", String(item["id"]));
                await storeStringData(
                  "@category_name",
                  item["attributes"]["name"]
                );
                navigation.navigate("Tabs", {
                  screen: "Add Expanse",
                  params: {
                    category_id: item["id"],
                    category: item["attributes"]["name"],
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
            await addCategories(query)
              .then(async (res) => {
                if (res["data"]) {
                  await storeStringData(
                    "@category_id",
                    String(res["data"]["id"])
                  );
                  await storeStringData(
                    "@category_name",
                    res["data"]["attributes"]["name"]
                  );
                  navigation.navigate("Tabs", {
                    screen: "Add Expanse",
                    params: {
                      category_id: res["data"]["id"],
                      category: res["data"]["attributes"]["name"],
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
            Tambahkan Category Baru
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

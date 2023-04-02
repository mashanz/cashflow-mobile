import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import items from "./api/items";

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
          const res = await items(text);
          console.log(res["data"]);
          setResult(res["data"]);
          setLoading(false);
        }}
      />
      {loading ? <Text>Loading...</Text> : null}
      {result.map((item, i) => {
        console.log("loop", item["attributes"]["name"]);
        return (
          <Pressable
            key={i}
            style={{ padding: 16 }}
            onPress={() =>
              navigation.navigate("Tabs", {
                screen: "Add Expanse",
                params: {
                  id: item["id"],
                  item: item["attributes"]["name"],
                },
              })
            }
          >
            <Text>{item["attributes"]["name"]}</Text>
          </Pressable>
        );
      })}
      {result.length == 0 && query !== "" ? (
        <Pressable
          style={{ padding: 20, backgroundColor: "blue" }}
          onPress={() =>
            navigation.navigate("Tabs", {
              screen: "Add Expanse",
              params: { item: "Nama Item" },
            })
          }
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

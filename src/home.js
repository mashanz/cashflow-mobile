import { useState, useEffect } from "react";

import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Pressable,
} from "react-native";

import { LineChart } from "react-native-chart-kit";

import { getExpanse } from "./api/expanses";

export default function Home() {
  const [total_price, setTotalPrice] = useState(0);
  const [list_name, setListName] = useState([""]);
  const [list_price, setListPrice] = useState([0]);
  function getData() {
    const expanse = async () => {
      getExpanse().then((res) => {
        const data = res["data"];
        const name = data.map((item) => {
          return item["attributes"]["item"]["data"]["attributes"]["name"];
        });
        const price = data.map((item) => {
          return item["attributes"]["price"];
        });
        const total = price.reduce((a, b) => a + b, 0);
        setListName(name);
        setListPrice(price);
        setTotalPrice(total);
      });
    };
    expanse();
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View
          style={{
            flex: 0.3,
            flexDirection: "row",
            height: "100%",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ flexGrow: 1 }}>Total Pengeluaran</Text>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              padding: 20,
            }}
          >
            Rp {total_price}
          </Text>
        </View>

        <LineChart
          data={{
            labels: list_name,
            datasets: [
              {
                data: list_price,
              },
            ],
          }}
          width={Dimensions.get("window").width - 20} // from react-native
          height={Dimensions.get("window").height - 200}
          yAxisLabel={"Rp "}
          verticalLabelRotation={90}
          horizontalLabelRotation={-45}
          chartConfig={{
            backgroundColor: "#1cc910",
            backgroundGradientFrom: "#eff3ff",
            backgroundGradientTo: "#efefef",
            decimalPlaces: 0,
            color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
          }}
          bezier
          style={{
            marginVertical: 8,
          }}
        />
        <Pressable
          style={{ padding: 20, backgroundColor: "blue" }}
          onPress={() => {
            getData();
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>REFRESH</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    textAlign: "center",
    padding: 10,
  },
  header: {
    textAlign: "center",
    fontSize: 18,
    padding: 16,
    marginTop: 16,
  },
});

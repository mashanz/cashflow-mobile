import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import Home from "./src/home";
import AddExpanse from "./src/add_expanse";
import Login from "./src/login";
import SearchItem from "./src/search_item";
import SearchCategory from "./src/search_category";

function TabNav() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name="home" size={24} color={focused ? "blue" : "gray"} />
          ),
        }}
      />
      <Tab.Screen
        name="Add Expanse"
        component={AddExpanse}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="add-circle"
              size={24}
              color={focused ? "red" : "gray"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Tabs"
          options={{ headerShown: false }}
          component={TabNav}
        />
        <Stack.Screen name="Cari Item" component={SearchItem} />
        <Stack.Screen name="Cari Category" component={SearchCategory} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

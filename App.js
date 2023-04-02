import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/home";
import AddExpanse from "./src/add_expanse";
import Login from "./src/login";
import SearchItem from "./src/search_item";

function TabNav() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Add Expanse" component={AddExpanse} />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import Swipper from "./components/Swipper";
import Map from "./components/Map";
import { NavigationContainer } from "@react-navigation/native"
import { QueryClient, QueryClientProvider } from "react-query";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from "./components/Search";


const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="Search" component={Search} />
          <Tab.Screen name="Swipe" component={Swipper} />
          <Tab.Screen name="Map" component={Map} />
        </Tab.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}



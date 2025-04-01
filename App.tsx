import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import CreateAccountScreen from './src/screens/CreateAcountScreen';
import HomeScreen from './src/screens/HomeScreen';
import CreateTopicScreen from './src/screens/CreateTopicScreen';
import InfoTopicScreen from './src/screens/InfoTopicScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreateTopic" component={CreateTopicScreen} />
        <Stack.Screen name="InfoTopic" component={InfoTopicScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



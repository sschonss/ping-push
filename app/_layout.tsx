import { Stack } from 'expo-router';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#000000',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontFamily: 'PressStart2P_400Regular',
          fontSize: 16,
        },

      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
          title: 'Login',
        }}
      />
      <Stack.Screen
        name="create-account"
        options={{
          title: 'Create Account',
        }}
      />
      <Stack.Screen
        name="home"
        options={{
          headerShown: false,
          title: 'Home',
        }}
      />
      <Stack.Screen
        name="create-topic"
        options={{
          title: 'Create Topic',
        }}
      />
      <Stack.Screen
        name="info-topic"
        options={{
          title: 'Topic Info',
        }}
      />
    </Stack>
  );
}

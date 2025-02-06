import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { ThemeProvider } from 'styled-components';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';

import StartScreen from '@/app/Start';
import BottomTabs from '@/app/BottomTabs';
import theme from '@/theme';

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('@/assets/fonts/Inter-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <Stack.Navigator
        screenOptions={{
          animation: 'fade',
          headerShown: false,
          cardStyle: { backgroundColor: theme.high.main },
        }}
      >
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Tabs" component={BottomTabs} />
      </Stack.Navigator>
    </ThemeProvider>
  );
}

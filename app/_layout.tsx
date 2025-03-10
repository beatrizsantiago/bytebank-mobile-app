import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { ThemeProvider } from 'styled-components';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuthContext } from '@/context/Auth';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@/types/routes';
import theme from '@/theme';
import Header from '@/components/Header';

import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';

import StartScreen from './Start';
import LoginScreen from './Login';
import RegistrationScreen from './Registration';
import BottomTabs from './BottomTabs';

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

const Routes = () => {
  const { isAuthenticated } = useAuthContext();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('Tabs');
    }
  }, [isAuthenticated]);

  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'fade',
        cardStyle: { backgroundColor: theme.gray['100'] },
        header: (props) => <Header {...props} />,
      }}
    >
      <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registration" component={RegistrationScreen} />
      <Stack.Screen name="Tabs" component={BottomTabs} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

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
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </AuthProvider>
  );
}

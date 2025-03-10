import { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuthContext } from '@/context/Auth';
import { TransactionProvider } from '@/context/Transactions';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@/types/routes';
import BottomTabBar from '@/components/BottomTabBar';

import DashboardScreen from './Dashboard';
import TransactionsScreen from './Transactions';
import AccountScreen from './Account';

import theme from '../theme';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const { isAuthenticated } = useAuthContext();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.navigate('Start');
    }
  }, [isAuthenticated]);

  return (
    <TransactionProvider>
      <Tab.Navigator
        tabBar={(props) => <BottomTabBar {...props} />}
        screenOptions={{
          animation: 'fade',
          headerShown: false,
          sceneStyle: { backgroundColor: theme.secondary.light },
        }}
      >
        <Tab.Screen
          name="Dashboard"
          component={DashboardScreen}
        />
        <Tab.Screen
          name="Transactions"
          component={TransactionsScreen}
        />
        <Tab.Screen
          name="Account"
          component={AccountScreen}
        />
      </Tab.Navigator>
    </TransactionProvider>
  );
};

export default BottomTabs;

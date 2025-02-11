import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuthContext } from '@/context/Auth';
import BottomTabBar from '@/components/BottomTabBar';

import DashboardScreen from './Dashboard';
import TransactionsScreen from './Transactions';
import AccountScreen from './Account';

import theme from '../theme';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const { isAuthenticated } = useAuthContext();

  const navigation = useNavigation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.navigate('Start');
    }
  }, [isAuthenticated]);

  return (
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
  );
};

export default BottomTabs;

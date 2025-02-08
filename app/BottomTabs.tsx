import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabBar from '@/components/BottomTabBar';

import DashboardScreen from './Dashboard';
import TransactionsScreen from './Transactions';
import AccountScreen from './Account';

import theme from '../theme';

const Tab = createBottomTabNavigator();

const BottomTabs = () => (
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

export default BottomTabs;

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DashboardScreen from './Dashboard';
import TransactionsScreen from './Transactions';

import theme from '../theme';

const Tab = createBottomTabNavigator();

const BottomTabs = () => (
  <Tab.Navigator
    screenOptions={{
      animation: 'fade',
      headerShown: false,
      sceneStyle: { backgroundColor: theme.high.main },
    }}
  >
    <Tab.Screen name="Dashboard" component={DashboardScreen} />
    <Tab.Screen name="Transações" component={TransactionsScreen} />
  </Tab.Navigator>
);

export default BottomTabs;

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';

import DashboardScreen from './Dashboard';
import TransactionsScreen from './Transactions';

import theme from '../theme';

const Tab = createBottomTabNavigator();

const BottomTabs = () => (
  <Tab.Navigator
    screenOptions={{
      animation: 'fade',
      headerShown: false,
      sceneStyle: { backgroundColor: theme.secondary.light },
    }}
  >
    <Tab.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={{
        tabBarIcon: () => <MaterialIcons name="dashboard" size={24} />,
      }}
    />
    <Tab.Screen
      name="Transações"
      component={TransactionsScreen}
      options={{
        tabBarIcon: () => <Entypo name="list" size={24} />,
      }}
    />
  </Tab.Navigator>
);

export default BottomTabs;

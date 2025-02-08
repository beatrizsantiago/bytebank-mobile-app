import { createStackNavigator } from '@react-navigation/stack';
import theme from '@/theme';

import TransactionFormScreen from '../TransactionForm';
import TransactionsListScreen from '../TransactionsList';

const Stack = createStackNavigator();

const Transactions = () => (
  <Stack.Navigator
    screenOptions={{
      animation: 'fade',
      cardStyle: { backgroundColor: theme.secondary.light },
      headerShown: false,
    }}
  >
    <Stack.Screen name="TransactionList" component={TransactionsListScreen} />
    <Stack.Screen name="TransactionForm" component={TransactionFormScreen} />
  </Stack.Navigator>
);

export default Transactions;

import { useState, useContext, createContext, useEffect } from 'react';
import { auth, firestore } from '@/firebase/config';
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  getAggregateFromServer,
  sum,
} from 'firebase/firestore';

type Kind = 'DEPOSIT' | 'DOC_TED' | 'CURRENCY_EXCHANGE' | 'LEASING';

type TransactionType = {
  id: string,
  kind: Kind,
  value: number,
  attach: string,
  date: Timestamp,
};

type TransactionDataType = {
  kind: Kind,
  value: number,
  attach: string,
};

interface ITransactionContext {
  list: TransactionType[],
  listLoading: boolean,
  balance: number,
  balanceLoading: boolean,
  addTransaction: (transaction: TransactionDataType) => Promise<boolean>,
  updateTransaction: (id: string, transaction: TransactionDataType) => Promise<boolean>,
  deleteTransaction: (id: string) => Promise<boolean>,
};

const user = auth.currentUser;

const TransactionContext = createContext<ITransactionContext | undefined>(undefined);

export const TransactionProvider = ({ children }:{ children: React.ReactNode }):JSX.Element => {
  const [list, setList] = useState<TransactionType[]>([]);
  const [listLoading, setListLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [balanceLoading, setBalanceLoading] = useState(false);

  const addTransaction = async (transaction: TransactionDataType) => {
    try {
      await addDoc(collection(firestore, 'transactions'), {
        ...transaction,
        userId: user?.uid,
        date: Timestamp.now(),
      });
      return true;
    } catch (error) {
      return false;
    }
  };

  const updateTransaction = async (id: string, transaction: TransactionDataType) => {
    try {
      await updateDoc(doc(firestore, 'transactions', id), {
        ...transaction,
      });
      return true;
    } catch (error) {
      return false;
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      await deleteDoc(doc(firestore, 'transactions', id));
      return true;
    } catch (error) {
      return false;
    }
  };

  const getTransactions = async () => {
    setListLoading(true);
    try {
      const transactionsQuery = query(
        collection(firestore, 'transactions'),
        where('userId', '==', user?.uid)
      );
      
      const querySnapshot = await getDocs(transactionsQuery);

      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setList(data as TransactionType[]);
      setListLoading(false);
      return true;
    } catch (error) {
      setListLoading(false);
      return false;
    }
  };

  const getBalance = async () => {
    setBalanceLoading(true);
    try {
      const transactionsQuery = query(
        collection(firestore, 'transactions'),
        where('userId', '==', user?.uid)
      );

      const querySnapshot = await getAggregateFromServer(
        transactionsQuery, {
          total: sum('value'),
        }
      );

      const total = querySnapshot.data().total;
      setBalance(total);
      setBalanceLoading(false);

      return true;
    } catch (error) {
      setBalanceLoading(false);
      return false;
    }
  };

  useEffect(() => {
    getTransactions();
    getBalance();
  }, []);

  const value = {
    list,
    listLoading,
    balance,
    balanceLoading,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);

  if (!context) {
      throw new Error('Contexto não encontado, useTransactionContext() deve estar dentro de TransactionProvider!')
  }

  return context
};

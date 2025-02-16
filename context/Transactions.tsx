import { useState, useContext, createContext, useEffect } from 'react';
import { auth, firestore, storage } from '@/firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
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
import * as DocumentPicker from 'expo-document-picker';

export type KindType = 'DEPOSIT' | 'DOC_TED' | 'CURRENCY_EXCHANGE' | 'LEASING';

export type TransactionType = {
  id: string,
  kind: KindType,
  value: number,
  attachUrl: string,
  date: Timestamp,
};

type TransactionDataType = {
  kind: KindType,
  value: number,
  attach: DocumentPicker.DocumentPickerAsset,
};

type UpdatedData = {
  kind: KindType,
  value: number,
  attach: DocumentPicker.DocumentPickerAsset | null,
  attachUrl: string,
};

interface ITransactionContext {
  list: TransactionType[],
  listLoading: boolean,
  balance: number,
  balanceLoading: boolean,
  addTransaction: (transaction: TransactionDataType) => Promise<boolean>,
  updateTransaction: (id: string, transaction: UpdatedData) => Promise<boolean>,
  deleteTransaction: (id: string) => Promise<boolean>,
  refetchData: () => Promise<void>,
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
      const response = await fetch(transaction.attach.uri);
      const blob = await response.blob();
      
      const storageRef = ref(storage, `images/transaction-receipts/${Date.now()}_${transaction.attach.name}`);
      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);
  
      await addDoc(collection(firestore, 'transactions'), {
        kind: transaction.kind,
        value: transaction.value,
        attachUrl: url,
        userId: user?.uid,
        date: Timestamp.now(),
      });
      return true;
    } catch (error) {
      return false;
    }
  };

  const updateTransaction = async (id: string, transaction: UpdatedData) => {
    try {
      let url = transaction.attachUrl;

      if (transaction.attach) {
        const response = await fetch(transaction.attach.uri);
        const blob = await response.blob();
        
        const storageRef = ref(storage, `images/transaction-receipts/${Date.now()}_${transaction.attach.name}`);
        await uploadBytes(storageRef, blob);
        url = await getDownloadURL(storageRef);
      };

      await updateDoc(doc(firestore, 'transactions', id), {
        kind: transaction.kind,
        value: transaction.value,
        attachUrl: url,
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
      // const transactionsQuery = query(
      //   collection(firestore, 'transactions'),
      //   where('userId', '==', user?.uid)
      // );

      // const querySnapshot = await getAggregateFromServer(
      //   transactionsQuery, {
      //     total: sum('value'),
      //   }
      // );

      // const total = querySnapshot.data().total;
      // setBalance(total);
      setBalanceLoading(false);

      return true;
    } catch (error) {
      setBalanceLoading(false);
      return false;
    }
  };

  const refetchData = async () => {
    await getTransactions();
    await getBalance();
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
    refetchData,
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

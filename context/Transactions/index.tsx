import { useState, useContext, createContext, useEffect, useCallback } from 'react';
import { auth, firestore, storage } from '@/firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { KIND_LABEL } from '@/utils/transactionKinds';
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
} from 'firebase/firestore';
import {
  AnalysisData,
  ITransactionContext,
  TransactionDataType,
  TransactionType,
  UpdatedData,
} from './types';

const TransactionContext = createContext<ITransactionContext | undefined>(undefined);

export const TransactionProvider = ({ children }:{ children: React.ReactNode }):JSX.Element => {
  const user = auth.currentUser;
  const userId = user?.uid || '';

  const [list, setList] = useState<TransactionType[]>([]);
  const [listLoading, setListLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [analysisDataLoading, setAnalysisDataLoading] = useState(false);

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
        userId,
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

  const getTransactions = useCallback(async () => {
    setListLoading(true);
    try {
      const transactionsQuery = query(
        collection(firestore, 'transactions'),
        where('userId', '==', userId)
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
  }, [userId]);

  const getBalance = useCallback(async () => {
    setBalanceLoading(true);
    try {
      const transactionsQuery = query(
        collection(firestore, "transactions"),
        where("userId", "==", userId)
      );

      const querySnapshot = await getDocs(transactionsQuery);

      const totalValue = querySnapshot.docs.reduce((acc, doc) => (
        acc + doc.data().value
      ), 0);

      setBalance(totalValue);
      setBalanceLoading(false);

      return true;
    } catch (error) {
      setBalanceLoading(false);
      return false;
    }
  }, [userId]);

  const getFinancialAnalysisData = useCallback(async () => {
    setAnalysisDataLoading(true);
    try {
      const transactionsQuery = query(
        collection(firestore, "transactions"),
        where("userId", "==", userId)
      );

      const querySnapshot = await getDocs(transactionsQuery);

      const totalInvestmentFound = querySnapshot.docs.reduce((acc, doc) => (
        doc.data().kind === 'INVESTMENT_FOUND' ? acc + doc.data().value : acc
      ), 0);

      const totalPublicContracts = querySnapshot.docs.reduce((acc, doc) => (
        doc.data().kind === 'PUBLIC_CONTRACTS' ? acc + doc.data().value : acc
      ), 0);

      const totalPrivateRetirement = querySnapshot.docs.reduce((acc, doc) => (
        doc.data().kind === 'PRIVATE_RETIREMENT' ? acc + doc.data().value : acc
      ), 0);

      const totalStockExchange = querySnapshot.docs.reduce((acc, doc) => (
        doc.data().kind === 'STOCK_EXCHANGE' ? acc + doc.data().value : acc
      ), 0);

      const data = {
        chartData: [
          {
            text: KIND_LABEL.INVESTMENT_FOUND,
            value: totalInvestmentFound * -1,
            color: '#2567F9',
          },
          {
            text: KIND_LABEL.PUBLIC_CONTRACTS,
            value: totalPublicContracts * -1,
            color: '#8F3CFF',
          },
          {
            text: KIND_LABEL.PRIVATE_RETIREMENT,
            value: totalPrivateRetirement * -1,
            color: '#FF3C82',
          },
          {
            text: KIND_LABEL.STOCK_EXCHANGE,
            value: totalStockExchange * -1,
            color: '#F1823D',
          },
        ],
        fixedIncome: (totalInvestmentFound + totalPublicContracts) * -1,
        variableIncome: (totalPrivateRetirement + totalStockExchange) * -1,
      };
      
      setAnalysisData(data);

      setAnalysisDataLoading(false);

      return true;
    } catch (error) {
      setAnalysisDataLoading(false);
      return false;
    }
  }, [userId]);

  const refetchData = async () => {
    await getTransactions();
    await getBalance();
    await getFinancialAnalysisData();
  };

  useEffect(() => {
    getTransactions();
    getBalance();
    getFinancialAnalysisData();
  }, [getTransactions, getBalance]);

  const value = {
    list,
    listLoading,
    balance,
    balanceLoading,
    analysisData,
    analysisDataLoading,
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

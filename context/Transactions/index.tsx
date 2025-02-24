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
  getAggregateFromServer,
  sum,
  orderBy,
  limit,
  startAfter,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import {
  AnalysisData,
  ITransactionContext,
  TransactionDataType,
  TransactionType,
  UpdatedData,
} from './types';

const TransactionContext = createContext<ITransactionContext | undefined>(undefined);

const LIMIT_PER_PAGE = 10;

export const TransactionProvider = ({ children }:{ children: React.ReactNode }):JSX.Element => {
  const user = auth.currentUser;
  const userId = user?.uid || '';

  const [list, setList] = useState<TransactionType[]>([]);
  const [last, setLast] = useState<QueryDocumentSnapshot | null>(null);
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
      let transactionsQuery = query(
        collection(firestore, 'transactions'),
        where('userId', '==', userId),
        orderBy('date', 'desc'),
        limit(LIMIT_PER_PAGE),
      );
      
      const querySnapshot = await getDocs(transactionsQuery);
      
      const data = querySnapshot.docs.map((doc) => (
        { id: doc.id, ...doc.data() }
      )) as TransactionType[];

      setList(data);
      setListLoading(false);
      setLast(querySnapshot.docs[querySnapshot.docs.length - 1]);
      return true;
    } catch (error) {
      setListLoading(false);
      return false;
    }
  }, [userId]);

  const loadMoreTransactions = async () => {
    if (listLoading || !last) return false;
    setListLoading(true);
    try {
      let transactionsQuery = query(
        collection(firestore, 'transactions'),
        where('userId', '==', userId),
        orderBy('date', 'desc'),
        limit(LIMIT_PER_PAGE),
        startAfter(last),
      );
      
      const querySnapshot = await getDocs(transactionsQuery);

      const data = querySnapshot.docs.map((doc) => (
        { id: doc.id, ...doc.data() }
      )) as TransactionType[];

      setList(current => [...current, ...data]);
      setLast(querySnapshot.docs[querySnapshot.docs.length - 1]);
      setListLoading(false);
      return true;
    } catch (error) {
      console.error(error)
      setListLoading(false);
      return false;
    }
  };

  const getBalance = useCallback(async () => {
    setBalanceLoading(true);
    try {
      const transactionsQuery = query(
        collection(firestore, 'transactions'),
        where('userId', '==', userId)
      );

      const querySnapshot = await getAggregateFromServer(transactionsQuery, { total: sum('value') });

      const totalValue = querySnapshot.data().total;

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
        collection(firestore, 'transactions'),
        where('userId', '==', userId)
      );

      const investmentFoundQuery = query(
        transactionsQuery,
        where('kind', '==', 'INVESTMENT_FOUND')
      );
      const investmentFoundSnapshot = await getAggregateFromServer(
        investmentFoundQuery, { total: sum('value') },
      );
      const totalInvestmentFound = investmentFoundSnapshot.data().total;

      const publicContractsQuery = query(
        transactionsQuery,
        where('kind', '==', 'PUBLIC_CONTRACTS')
      );
      const publicContractsSnapshot = await getAggregateFromServer(
        publicContractsQuery, { total: sum('value') },
      );
      const totalPublicContracts = publicContractsSnapshot.data().total;

      const privateRetirementQuery = query(
        transactionsQuery,
        where('kind', '==', 'PRIVATE_RETIREMENT')
      );
      const privateRetirementSnapshot = await getAggregateFromServer(
        privateRetirementQuery, { total: sum('value') },
      );
      const totalPrivateRetirement = privateRetirementSnapshot.data().total;

      const stockExchangeQuery = query(
        transactionsQuery,
        where('kind', '==', 'STOCK_EXCHANGE')
      );
      const stockExchangeSnapshot = await getAggregateFromServer(
        stockExchangeQuery, { total: sum('value') },
      );
      const totalStockExchange = stockExchangeSnapshot.data().total;

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
    loadMoreTransactions
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

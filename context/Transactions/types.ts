import { Timestamp } from 'firebase/firestore';
import * as DocumentPicker from 'expo-document-picker';

export type KindType = 'DEPOSIT'
| 'DOC_TED'
| 'CURRENCY_EXCHANGE'
| 'INVESTMENT_FOUND'
| 'PUBLIC_CONTRACTS'
| 'PRIVATE_RETIREMENT'
| 'STOCK_EXCHANGE';

export type TransactionType = {
  id: string,
  kind: KindType,
  value: number,
  attachUrl: string,
  date: Timestamp,
};

export type TransactionDataType = {
  kind: KindType,
  value: number,
  attach: DocumentPicker.DocumentPickerAsset,
};

export type UpdatedData = {
  kind: KindType,
  value: number,
  attach: DocumentPicker.DocumentPickerAsset | null,
  attachUrl: string,
};

export type AnalysisData = {
  chartData: {
    text: string,
    value: number,
    color: string,
  }[],
  fixedIncome: number,
  variableIncome: number,
};

export interface ITransactionContext {
  list: TransactionType[],
  listLoading: boolean,
  balance: number,
  balanceLoading: boolean,
  analysisData: AnalysisData | null,
  analysisDataLoading: boolean,
  addTransaction: (transaction: TransactionDataType) => Promise<boolean>,
  updateTransaction: (id: string, transaction: UpdatedData) => Promise<boolean>,
  deleteTransaction: (id: string) => Promise<boolean>,
  refetchData: () => Promise<void>,
};

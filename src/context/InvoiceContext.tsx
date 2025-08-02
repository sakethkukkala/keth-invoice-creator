import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Invoice } from '../types/invoice';

interface InvoiceState {
  invoices: Invoice[];
  loading: boolean;
  error: string | null;
}

type InvoiceAction =
  | { type: 'ADD_INVOICE'; payload: Invoice }
  | { type: 'UPDATE_INVOICE'; payload: Invoice }
  | { type: 'DELETE_INVOICE'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'LOAD_INVOICES'; payload: Invoice[] };

const initialState: InvoiceState = {
  invoices: [],
  loading: false,
  error: null,
};

const invoiceReducer = (state: InvoiceState, action: InvoiceAction): InvoiceState => {
  switch (action.type) {
    case 'ADD_INVOICE':
      return {
        ...state,
        invoices: [...state.invoices, action.payload],
      };
    case 'UPDATE_INVOICE':
      return {
        ...state,
        invoices: state.invoices.map(invoice =>
          invoice.id === action.payload.id ? action.payload : invoice
        ),
      };
    case 'DELETE_INVOICE':
      return {
        ...state,
        invoices: state.invoices.filter(invoice => invoice.id !== action.payload),
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'LOAD_INVOICES':
      return {
        ...state,
        invoices: action.payload,
      };
    default:
      return state;
  }
};

interface InvoiceContextType {
  state: InvoiceState;
  dispatch: React.Dispatch<InvoiceAction>;
  addInvoice: (invoice: Invoice) => void;
  updateInvoice: (invoice: Invoice) => void;
  deleteInvoice: (id: string) => void;
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export const useInvoice = () => {
  const context = useContext(InvoiceContext);
  if (context === undefined) {
    throw new Error('useInvoice must be used within an InvoiceProvider');
  }
  return context;
};

interface InvoiceProviderProps {
  children: ReactNode;
}

export const InvoiceProvider: React.FC<InvoiceProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(invoiceReducer, initialState);

  const addInvoice = (invoice: Invoice) => {
    dispatch({ type: 'ADD_INVOICE', payload: invoice });
  };

  const updateInvoice = (invoice: Invoice) => {
    dispatch({ type: 'UPDATE_INVOICE', payload: invoice });
  };

  const deleteInvoice = (id: string) => {
    dispatch({ type: 'DELETE_INVOICE', payload: id });
  };

  const value = {
    state,
    dispatch,
    addInvoice,
    updateInvoice,
    deleteInvoice,
  };

  return (
    <InvoiceContext.Provider value={value}>
      {children}
    </InvoiceContext.Provider>
  );
}; 
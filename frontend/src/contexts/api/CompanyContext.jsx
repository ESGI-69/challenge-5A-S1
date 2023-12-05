import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import apiCall from '@/axios';
import queryBuilder from '@/utils/queryBuilder';

const initialState = {
  companies: [],
  isCompaniesLoading: false,
};

export const CompanyContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case 'companies':
      return {
        ...state,
        companies: action.payload,
      };
    case 'isCompaniesLoading':
      return {
        ...state,
        isCompaniesLoading: action.payload,
      };
    default:
      return state;
  }
};

export default function CompanyProvider({ children }) {
  const [ state, dispatch ] = useReducer(reducer, initialState);

  const get = async ({ queries }) => {
    dispatch({
      type: 'isCompaniesLoading',
      payload: true,
    });
    try {
      const url = queries ? `/companies${queryBuilder(queries)}` : '/companies';
      const { data } = await apiCall.get(url);
      dispatch({
        type: 'companies',
        payload: data,
      });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({
        type: 'isCompaniesLoading',
        payload: false,
      });
    }
  };

  return (
    <CompanyContext.Provider value={{
      companies: state.companies,
      isCompaniesLoading: state.isCompaniesLoading,
      get,
    }}>
      {children}
    </CompanyContext.Provider>
  );
}

CompanyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

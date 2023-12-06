import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import apiCall from '@/axios';
import queryBuilder from '@/utils/queryBuilder';

const initialState = {
  companyEstablishments: [],
  isCompanyEstablishmentsLoading: false,

  companies: [],
  isCompanyLoading: false,
  isCompaniesLoading: false,
};

export const CompanyContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case 'companyEstablishments':
      return {
        ...state,
        companyEstablishments: action.payload,
      };
    case 'isCompanyEstablishmentsLoading':
      return {
        ...state,
        isCompanyEstablishmentsLoading: action.payload,
      };
    case 'company':
      return {
        ...state,
        company: action.payload,
      };
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
    case 'isCompanyLoading':
      return {
        ...state,
        isCompanyLoading: action.payload,
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

  const getCompanyEstablishments = async ({ establishmentId }) => {
    dispatch({
      type: 'isCompanyEstablishmentsLoading',
      payload: true,
    });
    try {
      const { data } = await apiCall.get(`/companies/${establishmentId}/establishments`);
      dispatch({
        type: 'companyEstablishments',
        payload: data,
      });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({
        type: 'isCompanyEstablishmentsLoading',
        payload: false,
      });
    }
  };

  const post = async (payload) => {
    dispatch({
      type: 'isCompanyLoading',
      payload: true,
    });
    try {
      const data = await apiCall.post('/companies', payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      dispatch({
        type: 'company',
        payload: data,
      });
    } catch (error) {
      console.error;
      throw error;
    } finally {
      dispatch({
        type: 'isCompanyLoading',
        payload: false,
      });
    }
  };

  return (
    <CompanyContext.Provider value={{
      getCompanyEstablishments,
      companyEstablishments: state.companyEstablishments,
      isCompanyEstablishmentsLoading: state.isCompanyEstablishmentsLoading,

      get,
      post,
      companies: state.companies,
      isCompaniesLoading: state.isCompaniesLoading,
      isCompanyLoading: state.isCompanyLoading,
    }}>
      {children}
    </CompanyContext.Provider>
  );
}

CompanyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

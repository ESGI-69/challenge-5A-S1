import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import apiCall from '@/axios';
import queryBuilder from '@/utils/queryBuilder';

const initialState = {
  company: null,
  isCompanyLoading: false,

  companyEstablishments: [],
  isCompanyEstablishmentsLoading: false,

  companies: [],
  isCompaniesLoading: false,
};

export const CompanyContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case 'company':
      return {
        ...state,
        company: action.payload,
      };
    case 'isCompanyLoading':
      return {
        ...state,
        isCompanyLoading: action.payload,
      };
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

  const getKbis = async (id) => {
    try {
      const response = await apiCall.get(`/companies/${id}/kbis`, {
        responseType: 'blob',
      });
      return window.URL.createObjectURL(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const adminGetById = async (id) => {
    dispatch({
      type: 'isCompanyLoading',
      payload: true,
    });
    try {
      const { data } = await apiCall.get(`/admin/companies/${id}`);
      dispatch({
        type: 'company',
        payload: data,
      });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({
        type: 'isCompanyLoading',
        payload: false,
      });
    }
  };

  const adminGet = async (queries) => {
    dispatch({
      type: 'isCompaniesLoading',
      payload: true,
    });
    try {
      const url = queries ? `/admin/companies${queryBuilder(queries)}` : '/admin/companies';
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

  const adminValidate = async (id) => {
    try {
      await apiCall.patch(`/admin/companies/${id}/validate`, {}, {
        headers: {
          'Content-Type': 'application/merge-patch+json',
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const adminReject = async (id, reason) => {
    try {
      await apiCall.patch(`/admin/companies/${id}/reject`, { reason }, {
        headers: {
          'Content-Type': 'application/merge-patch+json',
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const prestaGetById = async (id) => {
    dispatch({
      type: 'isCompanyLoading',
      payload: true,
    });
    try {
      const { data } = await apiCall.get(`/companies/${id}`);
      dispatch({
        type: 'company',
        payload: data,
      });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({
        type: 'isCompanyLoading',
        payload: false,
      });
    }
  };

  const get = async (queries) => {
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

  const getCompanyEstablishments = async (companyId) => {
    dispatch({
      type: 'isCompanyEstablishmentsLoading',
      payload: true,
    });
    try {
      const { data } = await apiCall.get(`/companies/${companyId}/establishments`);
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
      adminValidate,
      adminReject,

      prestaGetById,
      adminGetById,
      company: state.company,
      isCompanyLoading: state.isCompanyLoading,

      getCompanyEstablishments,
      companyEstablishments: state.companyEstablishments,
      isCompanyEstablishmentsLoading: state.isCompanyEstablishmentsLoading,

      get,
      post,
      adminGet,
      getKbis,
      companies: state.companies,
      isCompaniesLoading: state.isCompaniesLoading,
    }}>
      {children}
    </CompanyContext.Provider>
  );
}

CompanyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

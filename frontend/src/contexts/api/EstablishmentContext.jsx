import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import apiCall from '@/axios';
import queryBuilder from '@/utils/queryBuilder';

const initialState = {
  establishments: [],
  isEstablishmentsLoading: false,

  establishment: null,
  isEstablishmentLoading: false,
};

export const EstablishmentContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case 'establishments':
      return {
        ...state,
        establishments: action.payload,
      };
    case 'isEstablishmentsLoading':
      return {
        ...state,
        isEstablishmentsLoading: action.payload,
      };
    case 'establishment':
      return {
        ...state,
        establishment: action.payload,
      };
    case 'isEstablishmentLoading':
      return {
        ...state,
        isEstablishmentLoading: action.payload,
      };
    default:
      return state;
  }
};

export default function EstablishmentProvider({ children }) {
  const [ state, dispatch ] = useReducer(reducer, initialState);

  const get = async (queries = null) => {
    dispatch({
      type: 'isEstablishmentsLoading',
      payload: true,
    });
    try {
      const url = queries ? `/establishments${queryBuilder(queries)}` : '/establishments';
      const { data } = await apiCall.get(url);
      dispatch({
        type: 'establishments',
        payload: data,
      });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({
        type: 'isEstablishmentsLoading',
        payload: false,
      });
    }
  };

  const getById = async (id) => {
    dispatch({
      type: 'isEstablishmentLoading',
      payload: true,
    });
    try {
      const { data } = await apiCall.get(`/establishments/${id}`);
      dispatch({
        type: 'establishment',
        payload: data,
      });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({
        type: 'isEstablishmentLoading',
        payload: false,
      });
    }
  };

  return (
    <EstablishmentContext.Provider value={{
      get,
      establishments: state.establishments,
      isEstablishmentsLoading: state.isEstablishmentsLoading,

      getById,
      establishment: state.establishment,
      isEstablishmentLoading: state.isEstablishmentLoading,
    }}>
      {children}
    </EstablishmentContext.Provider>
  );
}

EstablishmentProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

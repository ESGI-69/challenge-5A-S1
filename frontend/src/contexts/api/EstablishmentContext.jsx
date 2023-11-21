import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import apiCall from '@/axios';

const initialState = {
  establishment: null,
  isEstablishmentLoading: false,
};

export const EstablishmentContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
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
      establishment: state.establishment,
      isEstablishmentLoading: state.isEstablishmentLoading,
      getById,
    }}>
      {children}
    </EstablishmentContext.Provider>
  );
}

EstablishmentProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

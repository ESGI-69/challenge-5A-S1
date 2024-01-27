import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import apiCall from '@/axios';
import queryBuilder from '@/utils/queryBuilder';

const initialState = {
  establishmentTypes: [],
  isEstablishmentTypesLoading: false,
};

export const EstablishmentTypeContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case 'establishmentTypes':
      return {
        ...state,
        establishmentTypes: action.payload,
      };
    case 'isEstablishmentTypesLoading':
      return {
        ...state,
        isEstablishmentTypesLoading: action.payload,
      };
    default:
      return state;
  }
};

export default function EstablishmentTypeProvider({ children }) {
  const [ state, dispatch ] = useReducer(reducer, initialState);

  const get = async (queries = null) => {
    dispatch({
      type: 'isEstablishmentTypesLoading',
      payload: true,
    });
    try {
      const url = queries ? `/establishment_types${queryBuilder(queries)}` : '/establishment_types';
      const { data } = await apiCall.get(url);
      dispatch({
        type: 'establishmentTypes',
        payload: data,
      });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({
        type: 'isEstablishmentTypesLoading',
        payload: false,
      });
    }
  };

  return (
    <EstablishmentTypeContext.Provider value={{
      get,
      establishmentTypes: state.establishmentTypes,
      isEstablishmentTypesLoading: state.isEstablishmentTypesLoading,
    }}>
      {children}
    </EstablishmentTypeContext.Provider>
  );
}

EstablishmentTypeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

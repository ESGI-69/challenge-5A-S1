import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import apiCall from '@/axios';
import queryBuilder from '@/utils/queryBuilder';

const initialState = {
  establishments: [],
  isEstablishmentsLoading: false,

  establishment: null,
  isEstablishmentLoading: false,

  isPostEstablishmentLoading: false,
  isPatchEstablishmentLoading: false,

  isPostOpeningHourLoading: false,
  isPatchOpeningHourLoading: false,
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
    case 'isPostEstablishmentLoading':
      return {
        ...state,
        isPostEstablishmentLoading: action.payload,
      };
    case 'isPatchEstablishmentLoading':
      return {
        ...state,
        isPatchEstablishmentLoading: action.payload,
      };
    case 'isPostOpeningHourLoading':
      return {
        ...state,
        isPostOpeningHourLoading: action.payload,
      };
    case 'isPatchOpeningHourLoading':
      return {
        ...state,
        isPatchOpeningHourLoading: action.payload,
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

  const post = async (data) => {
    dispatch({
      type: 'isPostEstablishmentLoading',
      payload: true,
    });
    try {
      await apiCall.post('/establishments', data);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({
        type: 'isPostEstablishmentLoading',
        payload: false,
      });
    }
  };

  const patch = async (id, data) => {
    dispatch({
      type: 'isPatchEstablishmentLoading',
      payload: true,
    });
    try {
      await apiCall.patch(`/establishments/${id}`, data, {
        headers: {
          'Content-Type': 'application/merge-patch+json',
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({
        type: 'isPatchEstablishmentLoading',
        payload: false,
      });
    }
  };

  const postOpeningHour = async (data) => {
    dispatch({
      type: 'isPostOpeningHourLoading',
      payload: true,
    });
    try {
      await apiCall.post('/opening_hours', data);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({
        type: 'isPostOpeningHourLoading',
        payload: false,
      });
    }
  };

  const patchOpeningHour = async (id, data) => {
    dispatch({
      type: 'isPatchOpeningHourLoading',
      payload: true,
    });
    try {
      await apiCall.patch(`/opening_hours/${id}`, data, {
        headers: {
          'Content-Type': 'application/merge-patch+json',
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({
        type: 'isPatchOpeningHourLoading',
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
      isPatchEstablishmentLoading: state.isPatchEstablishmentLoading,

      post,
      patch,
      postOpeningHour,
      isPostOpeningHourLoading: state.isPostOpeningHourLoading,
      patchOpeningHour,
      isPatchOpeningHourLoading: state.isPatchOpeningHourLoading,
    }}>
      {children}
    </EstablishmentContext.Provider>
  );
}

EstablishmentProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

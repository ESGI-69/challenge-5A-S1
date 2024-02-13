import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import apiCall from '@/axios';

const initialState = {
  statistics: {},
  isStatisticsLoading: false,
};

export const AdminStatisticsContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case 'statistics':
      return {
        ...state,
        statistics: action.payload,
      };
    case 'isStatisticsLoading':
      return {
        ...state,
        isStatisticsLoading: action.payload,
      };
    default:
      return state;
  }
};

export default function AdminStatisticsProvider({ children }) {
  const [ state, dispatch ] = useReducer(reducer, initialState);

  const getStatistics = async () => {
    dispatch({
      type: 'isStatisticsLoading',
      payload: true,
    });
    try {
      const { data } = await apiCall.get('/admin/statistics');
      dispatch({
        type: 'statistics',
        payload: data,
      });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({
        type: 'isStatisticsLoading',
        payload: false,
      });
    }
  };

  return (
    <AdminStatisticsContext.Provider value={{
      getStatistics,
      statistics: state.statistics,
      isStatisticsLoading: state.isStatisticsLoading,
    }}>
      {children}
    </AdminStatisticsContext.Provider>
  );
}

AdminStatisticsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

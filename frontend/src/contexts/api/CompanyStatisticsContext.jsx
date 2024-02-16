import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import apiCall from '@/axios';
import i18n from 'i18next';
import toast from 'react-hot-toast';

const initialState = {
  statistics: {},
  isStatisticsLoading: false,
};

export const CompanyStatisticsContext = createContext(initialState);

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

export default function CompanyStatisticsProvider({ children }) {
  const [ state, dispatch ] = useReducer(reducer, initialState);

  const getStatistics = async (companyId) => {
    dispatch({
      type: 'isStatisticsLoading',
      payload: true,
    });
    try {
      const { data } = await apiCall.get(`/companies/${companyId}/statistics`);
      dispatch({
        type: 'statistics',
        payload: data,
      });
    } catch (error) {
      toast.error(i18n.t('statistic.get.error', { ns: 'toastsNotification' }));
      console.error(error);
    } finally {
      dispatch({
        type: 'isStatisticsLoading',
        payload: false,
      });
    }
  };

  return (
    <CompanyStatisticsContext.Provider value={{
      getStatistics,
      statistics: state.statistics,
      isStatisticsLoading: state.isStatisticsLoading,
    }}>
      {children}
    </CompanyStatisticsContext.Provider>
  );
}

CompanyStatisticsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

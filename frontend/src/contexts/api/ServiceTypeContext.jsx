import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import apiCall from '@/axios';
import { toast } from 'react-hot-toast';
import i18n from 'i18next';

const initialState = {
  isDeleteServiceTypeLoading: false,
  isPatchServiceTypeLoading: false,
};

export const ServiceTypeContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case 'isDeleteServiceTypeLoading':
      return {
        ...state,
        isDeleteServiceTypeLoading: action.payload,
      };
    case 'isPatchServiceTypeLoading':
      return {
        ...state,
        isPatchServiceTypeLoading: action.payload,
      };
    default:
      return state;
  }
};

export default function ServiceTypeProvider({ children }) {
  const [ state, dispatch ] = useReducer(reducer, initialState);

  const patchServiceType = async (id, data) => {
    dispatch({ type: 'isPatchServiceTypeLoading', payload: true });
    try {
      const response = await apiCall.patch(`/service_types/${id}`, data, {
        headers: {
          'Content-Type': 'application/merge-patch+json',
        },
      });
      if (response.status === 200) {
        toast.success(i18n.t('serviceType.toast.update.success', { ns: 'establishment' }));
      }
    } catch (error) {
      toast.error(i18n.t('serviceType.toast.update.error', { ns: 'establishment' }));
      throw new Error(error);
    } finally {
      dispatch({ type: 'isPatchServiceTypeLoading', payload: false });
    }
  };

  const deleteServiceType = async (id) => {
    dispatch({ type: 'isDeleteServiceTypeLoading', payload: true });
    try {
      const response = await apiCall.delete(`/service_types/${id}`);
      if (response.status === 204) {
        toast.success(i18n.t('serviceType.toast.deletion.success', { ns: 'establishment' }));
      }
    } catch (error) {
      toast.error(i18n.t('serviceType.toast.deletion.error', { ns: 'establishment' }));
      throw new Error(error);
    } finally {
      dispatch({ type: 'isDeleteServiceTypeLoading', payload: false });
    }
  };

  return (
    <ServiceTypeContext.Provider value={{
      deleteServiceType,
      isDeleteServiceTypeLoading: state.isDeleteServiceTypeLoading,

      patchServiceType,
      isPatchServiceTypeLoading: state.isPatchServiceTypeLoading,
    }} >
      {children}
    </ServiceTypeContext.Provider>
  );
}

ServiceTypeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

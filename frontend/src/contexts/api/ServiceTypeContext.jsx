import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import apiCall from '@/axios';
import { toast } from 'react-hot-toast';
import i18n from 'i18next';

const initialState = {
  isPostServiceTypeLoading: false,
  isDeleteServiceTypeLoading: false,
  isPatchServiceTypeLoading: false,
};

export const ServiceTypeContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case 'isPostServiceTypeLoading':
      return {
        ...state,
        isPostServiceTypeLoading: action.payload,
      };
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

  const postServiceType = async (data) => {
    dispatch({ type: 'isPostServiceTypeLoading', payload: true });
    try {
      const response = await apiCall.post('/service_types', data);
      if (response.status === 201) {
        toast.success(i18n.t('serviceType.toast.creation.success', { ns: 'establishment' }));
      }
      return response.data;
    } catch (error) {
      toast.error(i18n.t('serviceType.toast.creation.error', { ns: 'establishment' }));
      throw new Error(error);
    } finally {
      dispatch({ type: 'isPostServiceTypeLoading', payload: false });
    }
  };

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
      postServiceType,
      isPostServiceTypeLoading: state.isPostServiceTypeLoading,

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

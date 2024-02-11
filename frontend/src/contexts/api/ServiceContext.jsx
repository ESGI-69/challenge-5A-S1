import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import apiCall from '@/axios';
import { toast } from 'react-hot-toast';
import i18n from 'i18next';
import queryBuilder from '@/utils/queryBuilder';

const initialState = {
  isPostServiceLoading: false,
  isDeleteServiceLoading: false,
  isPatchServiceLoading: false,

  services: [],
  isServicesLoading: false,

  service: null,
  isServiceLoading: false,

};

export const ServiceContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case 'services':
      return {
        ...state,
        services: action.payload,
      };
    case 'isServicesLoading':
      return {
        ...state,
        isServicesLoading: action.payload,
      };
    case 'isPostServiceLoading':
      return {
        ...state,
        isPostServiceLoading: action.payload,
      };
    case 'isDeleteServiceLoading':
      return {
        ...state,
        isDeleteServiceLoading: action.payload,
      };
    case 'isPatchServiceLoading':
      return {
        ...state,
        isPatchServiceLoading: action.payload,
      };
    case 'service':
      return {
        ...state,
        service: action.payload,
      };
    case 'isServiceLoading':
      return {
        ...state,
        isServiceLoading: action.payload,
      };
    default:
      return state;
  }
};

export default function ServiceProvider({ children }) {
  const [ state, dispatch ] = useReducer(reducer, initialState);

  const postService = async (data) => {
    dispatch({ type: 'isPostServiceLoading', payload: true });
    try {
      const response = await apiCall.post('/services', data);
      if (response.status === 201) {
        toast.success(i18n.t('toast.creation.success', { ns: 'service' }));
      }
      return response.data;
    } catch (error) {
      toast.error(i18n.t('toast.creation.error', { ns: 'service' }));
      throw new Error(error);
    } finally {
      dispatch({ type: 'isPostServiceLoading', payload: false });
    }
  };

  const patchService = async (id, data) => {
    dispatch({ type: 'isPatchServiceLoading', payload: true });
    try {
      const response = await apiCall.patch(`/services/${id}`, data, {
        headers: {
          'Content-Type': 'application/merge-patch+json',
        },
      });
      if (response.status === 200) {
        toast.success(i18n.t('toast.update.success', { ns: 'service' }));
      }
    } catch (error) {
      toast.error(i18n.t('toast.update.error', { ns: 'service' }));
      throw new Error(error);
    } finally {
      dispatch({ type: 'isPatchServiceLoading', payload: false });
    }
  };

  const deleteService = async (id) => {
    dispatch({ type: 'isDeleteServiceLoading', payload: true });
    try {
      const response = await apiCall.delete(`/services/${id}`);
      if (response.status === 204) {
        toast.success(i18n.t('toast.deletion.success', { ns: 'service' }));
      }
    } catch (error) {
      toast.error(i18n.t('toast.deletion.error', { ns: 'service' }));
      throw new Error(error);
    } finally {
      dispatch({ type: 'isDeleteServiceLoading', payload: false });
    }
  };
  const get = async (queries = null) => {
    dispatch({
      type: 'isServicesLoading',
      payload: true,
    });
    try {
      const url = queries ? `/services${queryBuilder(queries)}` : '/services';
      const { data } = await apiCall.get(url);
      dispatch({
        type: 'services',
        payload: data,
      });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({
        type: 'isServicesLoading',
        payload: false,
      });
    }
  };

  const getById = async (id) => {
    dispatch({
      type: 'isServiceLoading',
      payload: true,
    });
    try {
      const { data } = await apiCall.get(`/services/${id}`);
      dispatch({
        type: 'service',
        payload: data,
      });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({
        type: 'isServiceLoading',
        payload: false,
      });
    }
  };

  return (
    <ServiceContext.Provider value={{
      get,
      services: state.services,
      isServicesLoading: state.isServicesLoading,

      postService,
      isPostServiceLoading: state.isPostServiceLoading,

      deleteService,
      isDeleteServiceLoading: state.isDeleteServiceLoading,

      patchService,
      isPatchServiceLoading: state.isPatchServiceLoading,

      getById,
      service: state.service,
      isServiceLoading: state.isServiceLoading,
    }}>
      {children}
    </ServiceContext.Provider>
  );
}

ServiceProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

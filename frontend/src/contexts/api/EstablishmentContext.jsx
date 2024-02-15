import { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import apiCall from '@/axios';
import queryBuilder from '@/utils/queryBuilder';
import toast from 'react-hot-toast';
import i18n from 'i18next';
import { AppointmentContext } from '@/contexts/api/AppointmentContext';

const initialState = {
  establishments: [],
  isEstablishmentsLoading: false,

  establishment: null,
  isEstablishmentLoading: false,

  isPostEstablishmentLoading: false,
  isPatchEstablishmentLoading: false,

  isPostOpeningHourLoading: false,
  isPatchOpeningHourLoading: false,

  isDeleteEstablishmentLoading: false,

  isPostEstablishmentPictureLoading: false,
  isDeletePictureEstablishmentLoading: false,
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
    case 'clearEstablishment':
      return {
        ...state,
        establishment: null,
      };
    case 'isDeleteEstablishmentLoading':
      return {
        ...state,
        isDeleteEstablishmentLoading: action.payload,
      };
    case 'isPostEstablishmentPicture':
      return {
        ...state,
        isPostEstablishmentLoading: action.payload,
      };
    case 'isDeletePictureEstablishmentLoading':
      return {
        ...state,
        isDeletePictureEstablishmentLoading: action.payload,
      };
    default:
      return state;
  }
};

export default function EstablishmentProvider({ children }) {
  const [ state, dispatch ] = useReducer(reducer, initialState);
  const { refetchAppointments } = useContext(AppointmentContext);

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
      toast.error(i18n.t('events.get.error', { ns: 'establishment' }));
      throw new Error(error);
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
      toast.error(i18n.t('events.get.error', { ns: 'establishment' }));
      throw new Error(error);
    } finally {
      dispatch({
        type: 'isEstablishmentLoading',
        payload: false,
      });
    }
  };

  const getCities = async () => {
    dispatch({
      type: 'isEstablishmentLoading',
      payload: true,
    });

    try {
      const { data } = await apiCall.get('/establishments/cities');
      dispatch({
        type: 'establishments',
        payload: data,
      });
    } catch (error) {
      console.error(error);
      throw new Error(error);
    } finally {
      dispatch({
        type: 'isEstablishmentsLoading',
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
      toast.success(i18n.t('events.creation.success', { ns: 'establishment' }));
    } catch (error) {
      console.error(error);
      toast.error(i18n.t('events.creation.error', { ns: 'establishment' }));
      throw new Error(error);
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
      toast.success(i18n.t('events.update.success', { ns: 'establishment' }));
    } catch (error) {
      console.error(error);
      toast.error(i18n.t('events.update.error', { ns: 'establishment' }));
      throw new Error(error);
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
      toast.success(i18n.t('events.openingHours.success', { ns: 'establishment' }));
    } catch (error) {
      console.error(error);
      toast.error(i18n.t('events.openingHours.error', { ns: 'establishment' }));
      throw new Error(error);
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
      toast.success(i18n.t('events.openingHours.success', { ns: 'establishment' }));
    } catch (error) {
      console.error(error);
      toast.error(i18n.t('events.openingHours.error', { ns: 'establishment' }));
      throw new Error(error);
    } finally {
      dispatch({
        type: 'isPatchOpeningHourLoading',
        payload: false,
      });
    }
  };

  const refetchEstablishment = async () => {
    const { id } = state.establishment;
    dispatch({
      type: 'clearEstablishment',
    });
    await getById(id);
    await refetchAppointments(id);
  };

  const deleteEstablishment = async (id) => {
    dispatch({
      type: 'isDeleteEstablishmentLoading',
      payload: true,
    });
    try {
      await apiCall.delete(`/establishments/${id}`);
      toast.success(i18n.t('events.deletion.success', { ns: 'establishment' }));
    } catch (error) {
      console.error(error);
      toast.error(i18n.t('events.deletion.error', { ns: 'establishment' }));
      throw new Error(error);
    } finally {
      dispatch({
        type: 'isDeleteEstablishmentLoading',
        payload: false,
      });
    }
  };

  const postEstablishmentPicture = async (payload) => {
    dispatch({
      type: 'isPostEstablishmentPictureLoading',
      payload: true,
    });
    try {
      await apiCall.post('/establishment_pictures', payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success(i18n.t('establishmentPicture.events.creation.success', { ns: 'establishment' }));
    } catch (error) {
      console.error(error);
      toast.error(i18n.t('establishmentPicture.events.creation.error', { ns: 'establishment' }));
      throw new Error(error);
    } finally {
      dispatch({
        type: 'isPostEstablishmentPictureLoading',
        payload: false,
      });
    }
  };

  const deleteEstablishmentPicture = async (id) => {
    dispatch({
      type: 'isDeletePictureEstablishmentLoading',
      payload: true,
    });
    try {
      await apiCall.delete(`/establishment_pictures/${id}`);
      toast.success(i18n.t('establishmentPicture.events.deletion.success', { ns: 'establishment' }));
    } catch (error) {
      console.error(error);
      toast.error(i18n.t('establishmentPicture.events.deletion.error', { ns: 'establishment' }));
      throw new Error(error);
    } finally {
      dispatch({
        type: 'isDeletePictureEstablishmentLoading',
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
      refetchEstablishment,
      establishment: state.establishment,
      isEstablishmentLoading: state.isEstablishmentLoading,
      isPatchEstablishmentLoading: state.isPatchEstablishmentLoading,

      getCities,

      post,
      patch,
      postOpeningHour,
      isPostOpeningHourLoading: state.isPostOpeningHourLoading,
      patchOpeningHour,
      isPatchOpeningHourLoading: state.isPatchOpeningHourLoading,

      deleteEstablishment,
      isDeleteEstablishmentLoading: state.isDeleteEstablishmentLoading,

      postEstablishmentPicture,
      isPostEstablishmentPictureLoading: state.isPostEstablishmentPictureLoading,
      deleteEstablishmentPicture,
      isDeletePictureEstablishmentLoading: state.isDeletePictureEstablishmentLoading,
    }}>
      {children}
    </EstablishmentContext.Provider>
  );
}

EstablishmentProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

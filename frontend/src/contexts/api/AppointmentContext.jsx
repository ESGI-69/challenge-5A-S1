import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import apiCall from '@/axios';
import toast from 'react-hot-toast';
import i18n from 'i18next';
import queryBuilder from '@/utils/queryBuilder';

const initialState = {
  myAppointments: [],
  isMyAppointmentsLoading: false,

  appointment: null,
  isPostAppointmentLoading: false,

  establishmentAppointments: [],
  isEstablishmentAppointmentsLoading: false,
};

export const AppointmentContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case 'myAppointments':
      return {
        ...state,
        myAppointments: action.payload,
      };
    case 'isMyAppointmentsLoading':
      return {
        ...state,
        isMyAppointmentsLoading: action.payload,
      };
    case 'clearMyAppointments':
      return {
        ...state,
        myAppointments: [],
      };
    case 'appointment':
      return {
        ...state,
        appointment: action.payload,
      };
    case 'establishmentAppointments':
      return {
        ...state,
        establishmentAppointments: action.payload,
      };
    case 'isEstablishmentAppointmentsLoading':
      return {
        ...state,
        isEstablishmentAppointmentsLoading: action.payload,
      };
    case 'isPostAppointmentLoading':
      return {
        ...state,
        isPostAppointmentLoading: action.payload,
      };
    default:
      return state;
  }
};

export default function AppointmentProvider({ children }) {
  const [ state, dispatch ] = useReducer(reducer, initialState);

  const getAppointments = async (queries) => {
    dispatch({
      type: 'isMyAppointmentsLoading',
      payload: true,
    });
    try {
      const url = queries ? `/appointments${queryBuilder(queries)}` : '/appointments';
      const { data } = await apiCall.get(url);
      dispatch({
        type: 'myAppointments',
        payload: data,
      });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({
        type: 'isMyAppointmentsLoading',
        payload: false,
      });
    }
  };

  const refetchAppointments = async (querry) => {
    dispatch({
      type: 'clearMyAppointments',
    });
    await getAppointments(querry);
  };

  const getEstablishmentAppointments = async (establishmentId) => {
    dispatch({
      type: 'isEstablishmentAppointmentsLoading',
      payload: true,
    });
    try {
      const { data } = await apiCall.get(`/establishments/${establishmentId}/appointments`);
      dispatch({
        type: 'establishmentAppointments',
        payload: data,
      });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({
        type: 'isEstablishmentAppointmentsLoading',
        payload: false,
      });
    }
  };

  const post = async (data) => {
    dispatch({
      type: 'isPostAppointmentLoading',
      payload: true,
    });
    try {
      await apiCall.post('/appointments', data);
      dispatch({
        type: 'appointment',
        payload: data,
      });
    } catch (error) {
      toast.error(i18n.t('appointment.creation.error', { ns: 'toastsNotification' }));
      console.error(error);
    } finally {
      dispatch({
        type: 'isPostAppointmentLoading',
        payload: false,
      });
    }
  };

  const cancelAppointment = async (id) => {
    dispatch({
      type: 'isPostAppointmentLoading',
      payload: true,
    });
    try {
      await apiCall.patch(`/appointments/${id}/cancel`, {}, {
        headers: {
          'Content-Type': 'application/merge-patch+json',
        },
      });
      toast.success(i18n.t('appointment.cancel.success', { ns: 'toastsNotification' }));
    } catch (error) {
      toast.error(i18n.t('appointment.cancel.error', { ns: 'toastsNotification' }));
      console.error(error);
    } finally {
      dispatch({
        type: 'isPostAppointmentLoading',
        payload: false,
      });
    }
  };

  return (
    <AppointmentContext.Provider value={{
      getAppointments,
      getEstablishmentAppointments,
      refetchAppointments,
      cancelAppointment,
      myAppointments: state.myAppointments,
      isMyAppointmentsLoading: state.isMyAppointmentsLoading,
      establishmentAppointments: state.establishmentAppointments,
      isEstablishmentAppointmentsLoading: state.isEstablishmentAppointmentsLoading,

      appointment: state.appointment,
      isPostAppointmentLoading: state.isPostAppointmentLoading,

      post,
    }}>
      {children}
    </AppointmentContext.Provider>
  );
}

AppointmentProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

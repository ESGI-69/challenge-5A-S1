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

  const refetchAppointments = async (establishmentId = null) => {
    dispatch({
      type: 'clearMyAppointments',
    });
    await getMyAppointments(establishmentId);
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
      toast.error(i18n.t('events.creation.error', { ns: 'reservation' }));
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
      refetchAppointments,
      myAppointments: state.myAppointments,
      isMyAppointmentsLoading: state.isMyAppointmentsLoading,

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

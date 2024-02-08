import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import apiCall from '@/axios';

const initialState = {
  myAppointments: [],
  isMyAppointmentsLoading: false,
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
    default:
      return state;
  }
};

export default function AppointmentProvider({ children }) {
  const [ state, dispatch ] = useReducer(reducer, initialState);

  const getMyAppointments = async (establishmentId) => {
    dispatch({
      type: 'isMyAppointmentsLoading',
      payload: true,
    });
    try {
      const { data } = await apiCall.get(`/appointments/me?establishment.id=${establishmentId}`);
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

  const refetchAppointments = async (id) => {
    // je suis pas sur de ca ???
    // review pls
    dispatch({
      type: 'clearMyAppointments',
    });
    await getMyAppointments(id);
  };

  return (
    <AppointmentContext.Provider value={{
      getMyAppointments,
      refetchAppointments,
      myAppointments: state.myAppointments,
      isMyAppointmentsLoading: state.isMyAppointmentsLoading,
    }}>
      {children}
    </AppointmentContext.Provider>
  );
}

AppointmentProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

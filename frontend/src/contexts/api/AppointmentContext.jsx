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
      const { data } = await apiCall.get(`/appointments/${establishmentId}/me`);
      console.log('data', data);
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

  return (
    <AppointmentContext.Provider value={{
      getMyAppointments,
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

import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import apiCall from '@/axios';
import toast from 'react-hot-toast';
import i18n from 'i18next';

const initialState = {
  employee: null,
  isEmployeeLoading: false,

  employees: [],
  isEmployeesLoading: false,

  isPostEmployeeLoading: false,
  isPatchEmployeeLoading: false,

  isPostworkingHoursRangeLoading: false,
  isPatchworkingHoursRangeLoading: false,
};

export const EmployeeContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case 'employee':
      return {
        ...state,
        employee: action.payload,
      };
    case 'employees':
      return {
        ...state,
        employees: action.payload,
      };
    case 'isEmployeeLoading':
      return {
        ...state,
        isEmployeeLoading: action.payload,
      };
    case 'isEmployeesLoading':
      return {
        ...state,
        isEmployeesLoading: action.payload,
      };
    case 'isPostEmployeeLoading':
      return {
        ...state,
        isPostEmployeeLoading: action.payload,
      };
    case 'isPatchEmployeeLoading':
      return {
        ...state,
        isPatchEmployeeLoading: action.payload,
      };
    case 'isPostWorkingHoursRangeLoading':
      return {
        ...state,
        isPostWorkingHoursRangeLoading: action.payload,
      };
    case 'isPatchWorkingHoursRangeLoading':
      return {
        ...state,
        isPatchWorkingHoursRangeLoading: action.payload,
      };
    default:
      return state;
  }
};

export default function EmployeeProvider({ children }) {
  const [ state, dispatch ] = useReducer(reducer, initialState);

  const get = async (idCompany) => {
    dispatch({
      type: 'isEmployeesLoading',
      payload: true,
    });
    try {
      const { data } = await apiCall.get(`/companies/${idCompany}/employees`);
      dispatch({
        type: 'employees',
        payload: data.employees,
      });
    } catch (error) {
      console.error(error);
      toast.error(i18n.t('events.get.error', { ns: 'employee' }));
    } finally {
      dispatch({
        type: 'isEmployeesLoading',
        payload: false,
      });
    }
  };

  const getById = async (id) => {
    dispatch({
      type: 'isEmployeeLoading',
      payload: true,
    });
    try {
      const { data } = await apiCall.get(`/companies/employees/${id}`);
      dispatch({
        type: 'employee',
        payload: data,
      });
    } catch (error) {
      console.error(error);
      toast.error(i18n.t('events.get.errorList', { ns: 'employee' }));
    } finally {
      dispatch({
        type: 'isEmployeeLoading',
        payload: false,
      });
    }
  };

  const post = async (data) => {
    dispatch({
      type: 'isPostEmployeeLoading',
      payload: true,
    });
    try {
      await apiCall.post('/companies/employees', data);
      toast.success(i18n.t('events.creation.success', { ns: 'employee' }));
    } catch (error) {
      console.error(error);
      toast.error(i18n.t('events.creation.error', { ns: 'employee' }));
    } finally {
      dispatch({
        type: 'isPostEmployeeLoading',
        payload: false,
      });
    }
  };

  const patch = async (id, payload) => {
    dispatch({
      type: 'isPatchEmployeeLoading',
      payload: true,
    });
    try {
      await apiCall.patch(`/companies/employees/${id}`, payload, {
        headers: {
          'Content-Type': 'application/merge-patch+json',
        },
      });
      toast.success(i18n.t('events.update.success', { ns: 'employee' }));
    } catch (error) {
      console.error(error);
      toast.error(i18n.t('events.update.error', { ns: 'employee' }));
    } finally {
      dispatch({
        type: 'isPatchEmployeeLoading',
        payload: false,
      });
    }
  };

  const remove = async (id) => {
    dispatch({
      type: 'isEmployeeLoading',
      payload: true,
    });
    try {
      await apiCall.delete(`/companies/employees/${id}`);
      toast.success(i18n.t('events.delete.success', { ns: 'employee' }));
    } catch (error) {
      console.error(error);
      toast.error(i18n.t('events.delete.error', { ns: 'employee' }));
    } finally {
      dispatch({
        type: 'isEmployeeLoading',
        payload: false,
      });
    }
  };

  const postWorkingHoursRange = async (data) => {
    dispatch({
      type: 'isPostWorkingHoursRangeLoading',
      payload: true,
    });
    try {
      await apiCall.post('/working_hours_ranges', data);
      toast.success(i18n.t('events.workingHoursRange.success', { ns: 'establishment' }));
    } catch (error) {
      console.error(error);
      toast.error(i18n.t('events.workingHoursRange.error', { ns: 'establishment' }));
      throw new Error(error);
    } finally {
      dispatch({
        type: 'isPostWorkingHoursRangeLoading',
        payload: false,
      });
    }
  };

  const patchWorkingHoursRange = async (id, data) => {
    dispatch({
      type: 'isPatchWorkingHoursRangeLoading',
      payload: true,
    });
    try {
      await apiCall.patch(`/working_hours_ranges/${id}`, data, {
        headers: {
          'Content-Type': 'application/merge-patch+json',
        },
      });
      toast.success(i18n.t('events.workingHoursRange.success', { ns: 'establishment' }));
    } catch (error) {
      console.error(error);
      toast.error(i18n.t('events.workingHoursRange.error', { ns: 'establishment' }));
      throw new Error(error);
    } finally {
      dispatch({
        type: 'isPatchWorkingHoursRangeLoading',
        payload: false,
      });
    }
  };

  return (
    <EmployeeContext.Provider value={{
      employee: state.employee,
      employees: state.employees,
      isEmployeeLoading: state.isEmployeeLoading,
      isEmployeesLoading: state.isEmployeesLoading,
      isPostEmployeeLoading: state.isPostEmployeeLoading,
      isPatchEmployeeLoading: state.isPatchEmployeeLoading,
      get,
      getById,
      post,
      patch,
      remove,

      postWorkingHoursRange,
      isPostWorkingHoursRangeLoading: state.isPostWorkingHoursRangeLoading,
      patchWorkingHoursRange,
      isPatchWorkingHoursRangeLoading: state.isPatchWorkingHoursRangeLoading,
    }}>
      {children}
    </EmployeeContext.Provider>
  );
}

EmployeeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

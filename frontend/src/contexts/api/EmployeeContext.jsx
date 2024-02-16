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
  isDeleteEmployeeLoading: false,

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
    case 'isDeleteEmployeeLoading':
      return {
        ...state,
        isDeleteEmployeeLoading: action.payload,
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
      toast.error(i18n.t('employee.get.error', { ns: 'toastsNotification' }));
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
      toast.error(i18n.t('employee.get.errorList', { ns: 'toastsNotification' }));
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
      await apiCall.post('/companies/employees', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success(i18n.t('employe.creation.success', { ns: 'toastsNotification' }));
    } catch (error) {
      console.error(error);
      toast.error(i18n.t('employe.creation.error', { ns: 'toastsNotification' }));
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
      const employee = await apiCall.get(`/companies/employees/${id}`);
      dispatch({
        type: 'employee',
        payload: employee.data,
      });
      toast.success(i18n.t('employee.update.success', { ns: 'toastsNotification' }));
    } catch (error) {
      console.error(error);
      toast.error(i18n.t('employee.update.error', { ns: 'toastsNotification' }));
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
    dispatch({
      type: 'isDeleteEmployeeLoading',
      payload: true,
    });
    try {
      await apiCall.delete(`/companies/employees/${id}`);
      toast.success(i18n.t('employee.delete.success', { ns: 'toastsNotification' }));
    } catch (error) {
      console.error(error);
      toast.error(i18n.t('employee.delete.error', { ns: 'toastsNotification' }));
    } finally {
      dispatch({
        type: 'isEmployeeLoading',
        payload: false,
      });
      dispatch({
        type: 'isDeleteEmployeeLoading',
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
      toast.success(i18n.t('employee.workingHoursRange.success', { ns: 'toastsNotification' }));
    } catch (error) {
      console.error(error);
      toast.error(i18n.t('employee.workingHoursRange.error', { ns: 'toastsNotification' }));
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
      toast.success(i18n.t('employee.workingHoursRange.success', { ns: 'toastsNotification' }));
    } catch (error) {
      console.error(error);
      toast.error(i18n.t('employee.workingHoursRange.error', { ns: 'toastsNotification' }));
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
      isDeleteEmployeeLoading: state.isDeleteEmployeeLoading,

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

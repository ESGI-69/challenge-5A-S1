import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import apiCall from '@/axios';
import toast from 'react-hot-toast';

const initialState = {
  employee: null,
  isEmployeeLoading: false,

  employees: [],
  isEmployeesLoading: false,

  isPostEmployeeLoading: false,
  isPatchEmployeeLoading: false,
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
      const data = await apiCall.get(`/employees/${id}`);
      dispatch({
        type: 'employee',
        payload: data,
      });
    } catch (error) {
      console.error(error);
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
      toast.success('Employee created');
    } catch (error) {
      console.error(error);
      toast.error('Employee creation failed');
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
      const data = await apiCall.patch(`/employees/${id}`, payload);
      dispatch({
        type: 'employee',
        payload: data,
      });
    } catch (error) {
      console.error(error);
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
      await apiCall.delete(`/employees/${id}`);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({
        type: 'isEmployeeLoading',
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
    }}>
      {children}
    </EmployeeContext.Provider>
  );
}

EmployeeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

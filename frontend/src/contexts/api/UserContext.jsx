import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import apiCall from '@/axios';

const initialState = {
  user: null,
  users: [],
  isUserLoading: false,
  isUsersLoading: false,
  isPatchUserLoading: false,
  isUserDeleteLoading: false,
};

export const UserContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case 'user':
      return {
        ...state,
        user: action.payload,
      };
    case 'users':
      return {
        ...state,
        users: action.payload,
      };
    case 'isUserLoading':
      return {
        ...state,
        isUserLoading: action.payload,
      };
    case 'isUsersLoading':
      return {
        ...state,
        isUsersLoading: action.payload,
      };
    case 'isPatchUserLoading':
      return {
        ...state,
        isPatchUserLoading: action.payload,
      };
    case 'isUserDeleteLoading':
      return {
        ...state,
        isUserDeleteLoading: action.payload,
      };
    default:
      return state;
  }
};

export default function UserProvider({ children }) {
  const [ state, dispatch ] = useReducer(reducer, initialState);

  const get = async () => {
    dispatch({
      type: 'isUsersLoading',
      payload: true,
    });
    try {
      const { data } = await apiCall.get('/users');
      dispatch({
        type: 'users',
        payload: data,
      });
    } catch (error) {
      console.error(error);
      throw new Error(error);
    } finally {
      dispatch({
        type: 'isUsersLoading',
        payload: false,
      });
    }
  };

  const getById = async (id) => {
    dispatch({
      type: 'isUserLoading',
      payload: true,
    });
    try {
      const data = await apiCall.get(`/users/${id}`);
      dispatch({
        type: 'user',
        payload: data,
      });
    } catch (error) {
      console.error(error);
      throw new Error(error);
    } finally {
      dispatch({
        type: 'isUserLoading',
        payload: false,
      });
    }
  };

  const post = async (payload) => {
    dispatch({
      type: 'isUserLoading',
      payload: true,
    });
    try {
      const data = await apiCall.post('/users', payload);
      dispatch({
        type: 'user',
        payload: data,
      });
    } catch (error) {
      console.error(error);
      throw new Error(error);
    } finally {
      dispatch({
        type: 'isUserLoading',
        payload: false,
      });
    }
  };
  const patch = async (id, payload) => {
    dispatch({
      type: 'isUserLoading',
      payload: true,
    });
    dispatch({
      type: 'isUserPatchLoading',
      payload: true,
    });
    try {
      const data = await apiCall.patch(`/users/${id}`, payload, {
        headers: {
          'Content-Type': 'application/merge-patch+json',
        },
      });
      dispatch({
        type: 'user',
        payload: data,
      });
    } catch (error) {
      console.error(error);
      throw new Error(error);
    } finally {
      dispatch({
        type: 'isUserLoading',
        payload: false,
      });
      dispatch({
        type: 'isUserPatchLoading',
        payload: false,
      });
    }
  };

  const remove = async (id) => {
    dispatch({
      type: 'isUserLoading',
      payload: true,
    });
    try {
      await apiCall.delete(`/users/${id}`);
    } catch (error) {
      console.error(error);
      throw new Error(error);
    } finally {
      dispatch({
        type: 'isUserLoading',
        payload: false,
      });
    }
  };

  const deleteUser = async (id) => {
    dispatch({
      type: 'isUserDeleteLoading',
      payload: true,
    });
    try {
      await apiCall.delete(`/users/${id}`);
    } catch (error) {
      console.error(error);
      throw new Error(error);
    } finally {
      dispatch({
        type: 'isUserDeleteLoading',
        payload: false,
      });
    }
  };

  return (
    <UserContext.Provider value={{
      user: state.user,
      users: state.users,
      isUserLoading: state.isUserLoading,
      isUsersLoading: state.isUsersLoading,
      get,
      getById,
      post,
      patch,
      isPatchUserLoading: state.isPatchUserLoading,
      remove,
      deleteUser,
      isUserDeleteLoading: state.isUserDeleteLoading,
    }}>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

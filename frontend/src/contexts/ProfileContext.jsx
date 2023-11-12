import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import apiCall from '@/axios';
import Cookies from 'js-cookie';

const initialState = {
  profile: null,
  isLoggingIn: false,
};

export const ProfileContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case 'profile':
      return {
        ...state,
        profile: action.payload,
      };
    case 'isLoggingIn':
      return {
        ...state,
        isLoggingIn: action.payload,
      };
    default:
      return state;
  }
};

export default function ProfileProvider({ children }) {
  const [ state, dispatch ] = useReducer(reducer, initialState, (initialState) => {
    // @todo get /me
    const token = Cookies.get('token');
    if (!token) {
      return initialState;
    }
    // Mocking profile until /me is implemented
    return {
      ...initialState,
      profile: {
        firstname: 'Toto',
      },
    };
  },
  );

  const login = async (payload) => {
    dispatch({
      type: 'isLoggingIn',
      payload: true,
    });
    try {
      const { data } = await apiCall.post('/login', payload);
      apiCall.defaults.headers.common.Authorization = `Bearer ${data.token}`;
      Cookies.set('token', data.token);
      // @todo get user profile with /users/me
      // If /me Not Authorized then call logout()
      dispatch({
        type: 'profile',
        payload: {
          firstname: 'Toto',
        },
      });
    } catch (error) {
      dispatch({
        type: 'profile',
        payload: null,
      });
    } finally {
      dispatch({
        type: 'isLoggingIn',
        payload: false,
      });
    }
  };

  const logout = () => {
    Cookies.remove('token');
    apiCall.defaults.headers.common.Authorization = '';
    dispatch({
      type: 'profile',
      payload: null,
    });
  };

  return (
    <ProfileContext.Provider value={{
      profile: state.profile,
      login,
      logout,
    }} >
      {children}
    </ProfileContext.Provider>
  );
}

ProfileProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

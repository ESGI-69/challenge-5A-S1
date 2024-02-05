import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import apiCall from '@/axios';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';

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
    const token = Cookies.get('token');
    if (!token) {
      return initialState;
    }
    apiCall.defaults.headers.common.Authorization = `Bearer ${token}`;
    return {
      ...initialState,
      isLoggingIn: true,
    };
  });

  useEffect(() => {
    verifyToken(Cookies.get('token'));
  }, []);

  /**
   * Verify token and set user data in state if token is valid
   * @param {string} token
   * @returns {void}
  **/
  const verifyToken = async (token) => {
    if (!token) {
      return resetProfileState();
    }
    apiCall.defaults.headers.common.Authorization = `Bearer ${token}`;
    getAndSetUserData();
  };

  /**
   * Get user data and set it in state
   * @returns {void}
   */
  const getAndSetUserData = async () => {
    dispatch({
      type: 'isLoggingIn',
      payload: true,
    });
    try {
      const { data } = await apiCall.get('/users/me');
      dispatch({
        type: 'profile',
        payload: data,
      });
    } catch (error) {
      resetProfileState();
      toast.error('Error while fetching user data');
      throw error;
    } finally {
      dispatch({
        type: 'isLoggingIn',
        payload: false,
      });
    }
  };

  /**
   * Reset profile state & remove token from cookies
   * @returns {void}
   */
  const resetProfileState = () => {
    Cookies.remove('token');
    apiCall.defaults.headers.common.Authorization = '';
    dispatch({
      type: 'profile',
      payload: null,
    });
  };

  const login = async (payload) => {
    dispatch({
      type: 'isLoggingIn',
      payload: true,
    });
    try {
      const { data } = await apiCall.post('/login', payload);
      verifyToken(data.token);
      Cookies.set('token', data.token);
    } catch (error) {
      resetProfileState();
      toast.error('Error while logging in');
      throw error;
    } finally {
      dispatch({
        type: 'isLoggingIn',
        payload: false,
      });
    }
  };

  const logout = () => {
    resetProfileState();
    // This seems counter intuitive but user prefers being "hard" redirected to home page
    window.location.href = '/';
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

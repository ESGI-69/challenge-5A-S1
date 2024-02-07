import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import apiCall from '@/axios';

const initialState = {
  isPostFeedbackLoading: false,
};

export const FeedbackContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case 'isPostFeedbackLoading':
      return {
        ...state,
        isPostFeedbackLoading: action.payload,
      };
    default:
      return state;
  }
};

export default function FeedbackProvider({ children }) {
  const [ state, dispatch ] = useReducer(reducer, initialState);

  const postFeedback = async (feedback) => {
    dispatch({
      type: 'isPostFeedbackLoading',
      payload: true,
    });
    try {
      await apiCall.post('/feedback', feedback);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({
        type: 'isPostFeedbackLoading',
        payload: false,
      });
    }
  };

  return (
    <FeedbackContext.Provider value={{
      postFeedback,
      isPostFeedbackLoading: state.isPostFeedbackLoading,
    }}>
      {children}
    </FeedbackContext.Provider>
  );
}

FeedbackProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import apiCall from '@/axios';

const initialState = {
  isGetAllFeedbackTypesLoading: false,
  feedbackTypes: [],

  isPostFeedbackTypeLoading: false,

  isDeleteFeedbackTypeLoading: false,
};

export const FeedbackTypeContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case 'isGetAllFeedbackTypesLoading':
      return {
        ...state,
        isGetAllFeedbackTypesLoading: action.payload,
      };
    case 'feedbackTypes':
      return {
        ...state,
        feedbackTypes: action.payload,
      };
    case 'isPostFeedbackTypeLoading':
      return {
        ...state,
        isPostFeedbackTypeLoading: action.payload,
      };
    case 'isDeleteFeedbackTypeLoading':
      return {
        ...state,
        isDeleteFeedbackTypeLoading: action.payload,
      };
    default:
      return state;
  }
};

export default function FeedbackTypeProvider({ children }) {
  const [ state, dispatch ] = useReducer(reducer, initialState);

  const getAllFeedbackTypes = async () => {
    dispatch({
      type: 'isGetAllFeedbackTypesLoading',
      payload: true,
    });
    try {
      const response = await apiCall.get('/feedback_types');
      dispatch({
        type: 'feedbackTypes',
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({
        type: 'isGetAllFeedbackTypesLoading',
        payload: false,
      });
    }
  };

  const postFeedbackType = async (feedbackType) => {
    dispatch({
      type: 'isPostFeedbackTypeLoading',
      payload: true,
    });
    try {
      await apiCall.post('/feedback_types', feedbackType);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({
        type: 'isPostFeedbackTypeLoading',
        payload: false,
      });
    }
  };

  const deleteFeedbackType = async (id) => {
    dispatch({
      type: 'isDeleteFeedbackTypeLoading',
      payload: true,
    });
    try {
      await apiCall.delete(`/feedback_types/${id}`);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({
        type: 'isDeleteFeedbackTypeLoading',
        payload: false,
      });
    }
  };

  return (
    <FeedbackTypeContext.Provider value={{
      getAllFeedbackTypes,
      postFeedbackType,
      deleteFeedbackType,
      isGetAllFeedbackTypesLoading: state.isGetAllFeedbackTypesLoading,
      feedbackTypes: state.feedbackTypes,
      isPostFeedbackTypeLoading: state.isPostFeedbackTypeLoading,
      isDeleteFeedbackTypeLoading: state.isDeleteFeedbackTypeLoading,
    }}>
      {children}
    </FeedbackTypeContext.Provider>
  );
}

FeedbackTypeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

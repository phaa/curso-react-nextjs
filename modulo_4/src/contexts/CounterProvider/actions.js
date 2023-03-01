import * as types from './types';

// As action serão enviadas para o reducer dentro do provider
export const incrementCounter = (dispatch) => {
  dispatch({ type: types.INCREMENT_COUNTER });
};

export const decrementCounter = (dispatch) => {
  dispatch({ type: types.DECREMENT_COUNTER });
};

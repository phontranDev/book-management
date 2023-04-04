import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axiosInstance';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  cards: [],
  card: null,
  paymentMethodId: ''
};

const slice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getCardsSuccess(state, action) {
      state.isLoading = false;
      state.cards = action.payload;
    },

    getStripePaymentMethod(state, action) {
      state.isLoading = false;
      state.paymentMethod_Id = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function getCards() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/credit-cards/list-card-customer');
      dispatch(slice.actions.getStripePaymentMethod(response.data.data[0].id));
      dispatch(slice.actions.getCardsSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function attackCardToUser(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/credit-cards/attach-card', data);
      if (response.status === 201) {
        dispatch(setDefaultCard({ paymentMethodId: response.data.id }));
        dispatch(getCards());
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function setDefaultCard(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/credit-cards/default', data);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createSubScription() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const data = {
        stripePriceId: 'price_1M6QmnAOwQFyvQrL3BcnQQnc'
      };
      const response = await axios.post('/subscriptions/monthly', data);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

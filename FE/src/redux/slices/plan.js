import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axiosInstance';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  plan: null
};

const slice = createSlice({
  name: 'plan',
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
    getPlanSuccess(state, action) {
      state.isLoading = false;
      state.plan = action.payload;
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

export function getPlan() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/plans/first-plan');
      dispatch(slice.actions.getPlanSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

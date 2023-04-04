import axiosInstance from '../../utils/axiosInstance';

const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  isLoading: false,
  error: false,
  publishers: [],
  publisher: null
};

const slice = createSlice({
  name: 'publisherSlice',
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

    // GET publishers
    getPublishersSuccess(state, action) {
      state.isLoading = false;
      state.publishers = action.payload;
    },

    // GET publisher
    getPublisherSuccess(state, action) {
      state.isLoading = false;
      state.publisher = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getAllPublishers() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosInstance.get('/publishers');
      dispatch(slice.actions.getPublishersSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

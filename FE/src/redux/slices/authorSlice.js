import axiosInstance from '../../utils/axiosInstance';

const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  isLoading: false,
  error: false,
  authors: [],
  author: null
};

const slice = createSlice({
  name: 'authorSlice',
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

    // GET Authors
    getAuthorsSuccess(state, action) {
      state.isLoading = false;
      state.authors = action.payload;
    },

    // GET Author
    getAuthorSuccess(state, action) {
      state.isLoading = false;
      state.author = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getAllAuthors() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosInstance.get('/authors');
      dispatch(slice.actions.getAuthorsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

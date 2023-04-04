import axiosInstance from '../../utils/axiosInstance';

const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  isLoading: false,
  error: false,
  categories: [],
  category: null,
  index: 0
};

const slice = createSlice({
  name: 'categorySlice',
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

    // GET categories
    getCategoriesSuccess(state, action) {
      state.isLoading = false;
      state.categories = action.payload;
    },

    // GET POST
    getCategorySuccess(state, action) {
      state.isLoading = false;
      state.category = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getAllCategories() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosInstance.get('/categories');
      dispatch(slice.actions.getCategoriesSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

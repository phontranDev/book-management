import axiosInstance from '../../utils/axiosInstance';

const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  isLoading: false,
  error: false,
  tags: [],
  tag: null
};

const slice = createSlice({
  name: 'tagSlice',
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

    // GET TAGS
    getTagsSuccess(state, action) {
      state.isLoading = false;
      state.tags = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getAllTags() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosInstance.get('/tags');
      dispatch(slice.actions.getTagsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

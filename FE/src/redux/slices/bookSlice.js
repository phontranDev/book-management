import axiosInstance from '../../utils/axiosInstance';

const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  isLoading: false,
  error: false,
  books: [],
  book: null,
  hasMore: true,
  take: 5
};

const slice = createSlice({
  name: 'bookSlice',
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

    noHasMore(state) {
      state.hasMore = false;
    },

    // GET Books
    getBooksSuccess(state, action) {
      state.isLoading = false;
      state.books = action.payload;
    },

    // GET Book
    getBookSuccess(state, action) {
      state.isLoading = false;
      state.book = action.payload;
    },

    getMoreBooks(state) {
      state.take += state.take;
    },

    // GET POST INFINITE
    getBooksInitial(state, action) {
      state.isLoading = false;
      state.books = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

export const { getMoreBooks } = slice.actions;
// ----------------------------------------------------------------------

export function getAllBooks(search = '', skip = 0, take = 20) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosInstance.get('/books', {
        params: {
          search,
          skip,
          take
        }
      });
      dispatch(slice.actions.getBooksSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getBooksInitial(take) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosInstance.get('/books', {
        params: { take }
      });

      const { hasNextPage } = response.data.meta;

      dispatch(slice.actions.getBooksInitial(response.data.data));

      if (!hasNextPage) {
        dispatch(slice.actions.noHasMore());
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getBookBySlug(slug) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosInstance.get(`/books/${slug}`);
      dispatch(slice.actions.getBookSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

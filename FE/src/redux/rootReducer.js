import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import mailReducer from './slices/mail';
import chatReducer from './slices/chat';
import blogReducer from './slices/blog';
import userReducer from './slices/user';
import productReducer from './slices/product';
import calendarReducer from './slices/calendar';
import kanbanReducer from './slices/kanban';
import blogSlice from './slices/blogSlice';
import tagSlice from './slices/tagSlice';
import bookSlice from './slices/bookSlice';
import authorSlice from './slices/authorSlice';
import publisherSlice from './slices/publisherSlice';
import categorySlice from './slices/categorySlice';
import postSlice from './slices/postSlice';
import userAppSlice from './slices/userAppSlice';
import payment from './slices/payment';
import plan from './slices/plan';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
};

const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout']
};

const rootReducer = combineReducers({
  mail: mailReducer,
  chat: chatReducer,
  blog: blogReducer,
  user: userReducer,
  calendar: calendarReducer,
  kanban: kanbanReducer,
  product: persistReducer(productPersistConfig, productReducer),
  blogSlice,
  tagSlice,
  bookSlice,
  authorSlice,
  publisherSlice,
  categorySlice,
  postSlice,
  userAppSlice,
  payment,
  plan
});

export { rootPersistConfig, rootReducer };

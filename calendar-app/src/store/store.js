import { createStore } from 'redux';
import { composeWithDevTools} from 'redux-devtools-extension';
import reducer from './reminders';

function configStore() {
  const initialStore = {
    reminders: []
  };
  const store = createStore(reducer, initialStore, composeWithDevTools());
  return store;
};

export default configStore;
import { Provider } from 'react-redux';
import configStore from './store/store';
import Calendar from './components/calendar/index';
import './base.sass';

function App() {
  return (
    <Provider store={configStore()}>
      <div className="App">
        <Calendar />
      </div>
    </Provider>
  );
}

export default App;
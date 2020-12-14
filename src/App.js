import { Fragment } from 'react';
import './App.scss';
import Synthesizer from './components/Synthesizer';
import { Provider } from 'react-redux'; //Connects react with redux
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Fragment>
        <Synthesizer/>
      </Fragment>
    </Provider>
  );
}

export default App;

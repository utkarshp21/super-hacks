import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'
import {configureStore} from './store'
const store = configureStore()

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

ReactDOM.render((
  <Provider store={store}>
    
      <App />
 
  </Provider>
), document.getElementById('root'))
registerServiceWorker()
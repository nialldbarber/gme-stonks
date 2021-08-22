import {StrictMode} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import App from './app';
import {store} from './store';
import './index.css';

render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);

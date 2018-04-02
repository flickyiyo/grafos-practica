import React from 'react';
import { render } from 'react-dom';
import App from './src/App';
import {Provider} from 'mobx-react';
import store from './src/Grafo';
render(
  <Provider store={store} >
    <App />
  </Provider>
  ,
  document.getElementById('app')
);


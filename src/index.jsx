//處理專案的初始化與設定
import React from 'react';
import { createRoot } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App.jsx';
import store from './store/index.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'

//React 18的創建
const root = document.getElementById('root');
const rootContainer = createRoot(root);

rootContainer.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
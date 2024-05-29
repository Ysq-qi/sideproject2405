//處理專案的初始化與設定
import React from 'react';
import { createRoot } from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App.jsx';
import store from './store/index.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'

//React 18的創建
const root = document.getElementById('root');
const rootContainer = createRoot(root);

//QueryClient實例的建立
const queryClient = new QueryClient();

rootContainer.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} /> 
      </QueryClientProvider>
    </ReduxProvider>
  </React.StrictMode>
);
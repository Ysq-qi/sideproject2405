import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { HashRouter  } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App.jsx';
import store from './store/index.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'

//React 18的創建
const root = document.getElementById('root');
const rootContainer = createRoot(root);

//React query實例的建立
const queryClient = new QueryClient();

//生產環境的網址與開發環境的網址切換
// const basename = process.env.REACT_APP_BASENAME || '/';

rootContainer.render(
  <>
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
      <HashRouter>
      <App />
      </HashRouter >
      <ReactQueryDevtools initialIsOpen={false} /> 
      </QueryClientProvider>
    </ReduxProvider>
  </>
);
import React from 'react';
import ReactDOM from 'react-dom/client';
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <FluentProvider theme={teamsLightTheme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </FluentProvider>,
);

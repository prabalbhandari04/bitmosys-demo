import React from 'react';
import ReactDOM from 'react-dom';
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store';

const rootElement = document.getElementById('root');

const renderApp = () => {
  ReactDOM.render(
    <FluentProvider theme={teamsLightTheme}>
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    </FluentProvider>,
    rootElement
  );
};

if (rootElement) {
  renderApp();
} else {
  console.error("Root element with id 'root' not found in the document.");
}

import React from 'react';
// import {ReactDOM} from 'react';
// import {createRoot} from 'react-dom/client';
import App from './App';
import './index.css';
import {legacy_createStore as createStore} from 'redux';
import {reducers} from './reducer';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom/client';

const store = createStore(reducers);

// const container = document.getElementById('root');
// const root = createRoot(container); // createRoot(container!) if you use TypeScript
// root.render(<App />);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

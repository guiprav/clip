import App from './components/App.jsx';
import d from '@dominant/core';
import eruda from 'eruda';

if (process.env.NODE_ENV === 'development') { eruda.init(); window.d = d }

document.querySelector('#app-wrapper').append(<App />);
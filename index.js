import App from './components/App.jsx';
import d from '@dominant/core';

if (process.env.NODE_ENV === 'development') { window.d = d }

document.querySelector('#app-wrapper').append(<App />);
// app/javascript/packs/hello_react.jsx

import React from 'react';
import ReactDOM from 'react-dom';

const Hello = () => (
  <div>
    <h1>Hello from React!</h1>
  </div>
);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Hello />,
    document.body.appendChild(document.createElement('div')),
  );
});

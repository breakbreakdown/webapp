import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

class InitMainPage extends React.Component {
  render() {
    return (
        <h1>Main Page Test</h1>
    )
  }
}

ReactDOM.render(
  <InitMainPage />,
  document.getElementById('root')
);

registerServiceWorker();

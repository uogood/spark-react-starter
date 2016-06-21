import 'react';
import ReactDOM from 'react-dom';
import rootComponent from './components/root';
const rootEl = document.getElementById( 'root' );

const render = () => {
  ReactDOM.render(
    rootComponent(),
    rootEl
  );
};

render();

import Reducers from './reducers.js';
import App from './App.js';

const STORE = Redux.createStore(Reducers);
const APP = React.createElement(App);
const PROVIDER = React.createElement(ReactRedux.Provider, { store: STORE }, APP);

ReactDOM.render(PROVIDER, document.getElementById('root'));

import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import App from './App';
// import {Hello} from './components/Hello';
import { Provider } from 'react-redux';
import WebglComponent from "./components/WebglComponent";
import { Hello } from "./containers/Hello";
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { store,store2 } from "./stores/Hello/index";

//  两个store ，说明有两个store中心
ReactDOM.render(
  <div>
    <Provider store={store}>
        <Hello  />
    </Provider>
    <Provider store={store2}>
        <WebglComponent  />
    </Provider>
    </div>
    ,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

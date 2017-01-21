import React from 'react'
import DocumentTitle from 'react-document-title'
import { RouteHandler, Link } from 'react-router'
// import { config } from 'config'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { reducer as formReducer } from 'redux-form'
import createLogger from 'redux-logger';
import ComposePage from '../components/ComposePage'
// import { reducer as editorReducer } from '../Editor/reducer'

const reducers = {
  // editor: editorReducer
  form: formReducer
};

const logger = createLogger();
const reducer = combineReducers(reducers);
const store = createStore(reducer, applyMiddleware(logger));
//   if (typeof(window) !== 'undefined') {  // http://stackoverflow.com/questions/35374257/error-window-not-defined-in-node-js
// const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()); // https://github.com/zalmoxisus/redux-devtools-extension#usage
// }
// const store = (window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore)(reducer) // https://github.com/erikras/redux-form/blob/master/examples/simple/src/index.js

export default class Composer extends React.Component {

  render () {
    return (
      <Provider store={store}>
        <ComposePage {...this.props}/>
      </Provider>
    );
  }
}
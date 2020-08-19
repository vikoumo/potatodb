import IndexedDB from './IndexedDB.js';
import LocalStorage from './LocalStorage.js';

const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
const DefaultOptions = {
  dbName: 'potatoDB',
  tableName: 'potatoTable',
  driver: indexedDB ? 'indexDB' : 'localStorage'
}

class Store {
  constructor() {}

  _create(options){
    if(typeof options === 'undefined') return this;
    this._options = Object.assign({}, DefaultOptions, this._config(options));
    if (this._options.driver === 'localStorage') {
      return new LocalStorage(this._options);
    } else if(this._options.driver === 'indexDB') {
      return new IndexedDB(this._options);
    }
  }

  createInstance(options) {
    return this._create(options);
  }

  _config(options) {
    if(typeof options !== 'object') {
      return new Error('options is not object');
    }
    for (let i in options) {
      if (i === 'dbName' || i === 'tableName') {
        options[i] = options[i].replace(/\W/g, '_');
      }
    }
    return options;
  }
}

export const store = new Store();

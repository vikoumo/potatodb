import IndexedDB from './IndexedDB';
import LocalStorage from './LocalStorage';
import './window.d.ts';
import { StoreOptions } from './type.d';


const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
const DefaultOptions = {
  dbName: 'potatoDB',
  tableName: 'potatoTable',
  driver: indexedDB ? 'indexDB' : 'localStorage'
}

class Store {
  _options: StoreOptions = DefaultOptions;
  constructor() {}
  _create(options?: StoreOptions){
    this._options = Object.assign({}, DefaultOptions, this._config(options));
    if (this._options.driver === 'localStorage') {
      return new LocalStorage(this._options);
    } else if(this._options.driver === 'indexDB') {
      return new IndexedDB(this._options);
    }
  }

  createInstance(options?: StoreOptions) {
    return this._create(options);
  }

  _config(options?: StoreOptions) {
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

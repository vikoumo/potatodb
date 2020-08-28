import { StoreOptions } from "./type";

export default class IndexedDB {
  _options: StoreOptions;
  db: IDBDatabase;
  _ready: Promise<null>;
  constructor(options: StoreOptions) {
    this._options = options;
    this.db = null;
    this._ready = this._open();
  }

  _open(version?: number):  Promise<null> {
    return new Promise((resolve, reject) => {
      const idb = window.indexedDB;
      if(version) {
        this.db && this.db.close();
      }
      const req = idb.open(this._options.dbName, version);
      req.onerror = () => {
        // console.log('db fail');
        reject();
      };
      req.onsuccess = () => {
        this.db = req.result;
        // console.log('db success');
        if (!this.db.objectStoreNames.contains(this._options.tableName)) {
          const newVersion = this.db.version + 1;
          this._open(newVersion).then(() => {
            resolve();
          });
        } else {
          resolve();
        }
      }
      req.onupgradeneeded = () => {
        // console.log('db upgradeneeded');
        this.db = req.result;
        this.db.createObjectStore(this._options.tableName);
      }
    })
  }

  _getObjectStore() {
    const transaction = this.db.transaction([this._options.tableName], "readwrite");
    const objectStore = transaction.objectStore(this._options.tableName);
    return objectStore;
  }

  setItem(key, val) {
    return new Promise((resolve, reject) => {
      this._ready.then(() => {
        const req = this._getObjectStore().put(val, key);
        req.onsuccess = () => resolve({key, val});
        req.onerror = e => reject(e);
      })
    })
  }

  getItem(key: string) {
    return new Promise((resolve, reject) => {
      this._ready.then(() => {
        const req = this._getObjectStore().get(key);
        req.onsuccess = () => resolve(req.result);
        req.onerror = e => reject(e);
      })
    })
  }

  removeItem(key: string) {
    return new Promise((resolve, reject) => {
      this._ready.then(() => {
        const req = this._getObjectStore().delete(key);
        req.onsuccess = () => resolve();
        req.onerror = e => reject(e);
      })
    })
  }

  clear() {
    return new Promise((resolve, reject) => {
      this._ready.then(() => {
        const req = this._getObjectStore().clear();
        req.onsuccess = () => resolve();
        req.onerror = e => reject(e);
      })
    })
  }

  length() {
    return new Promise((resolve, reject) => {
      this._ready.then(() => {
        const objectStore = this._getObjectStore();
        let count = 0;
        objectStore.openCursor().onsuccess = function(e) {
          const cursor = (e.target as IDBRequest).result;
          if (cursor && cursor !== null) {
            cursor.continue();
            count = count + 1;
          } else {
            resolve(count);
          }
        }
        objectStore.openCursor().onerror = function(e) {
          reject(e);
        }
      })
    })
  }

  keys() {
    return new Promise((resolve, reject) => {
      this._ready.then(() => {
        const objectStore = this._getObjectStore();
        const arr = [];
        objectStore.openCursor().onsuccess = function(e) {
          const cursor = (e.target as IDBRequest).result;
          if (cursor && cursor !== null) {
            cursor.continue();
            arr.push(cursor.key);
          } else {
            resolve(arr);
          }
        }
        objectStore.openCursor().onerror = function(e) {
          reject(e);
        }
      })
    })
  }

  entries() {
    return new Promise((resolve, reject) => {
      this._ready.then(() => {
        const objectStore = this._getObjectStore();
        const obj = {};
        objectStore.openCursor().onsuccess = function(e) {
          const cursor = (e.target as IDBRequest).result;
          if (cursor && cursor !== null) {
            cursor.continue();
            obj[cursor.key] = cursor.value
          } else {
            resolve(obj);
          }
        }
        objectStore.openCursor().onerror = function(e) {
          reject(e);
        }
      })
    })
  }
}

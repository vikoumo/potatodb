export default class LocalStorage {
  constructor(options) {
    this.storage = window.localStorage;
    this._options = options || null;
    this.storageName = this._options && `${this._options.dbName}/${this._options.tableName}/`
  }

  getItem(key) {
    return new Promise((resolve, reject) => {
      try {
        const res = JSON.parse(this.storage.getItem(`${this.storageName}${key}`));
        resolve(res);
      } catch(err) {
        reject(err);
      }
    })
  }

  setItem(key, val) {
    return new Promise((resolve, reject) => {
      try {
        this.storage.setItem(`${this.storageName}${key}`, JSON.stringify(val));
        resolve({ key, val });
      } catch(err) {
        reject(err);
      }
    })
  }

  removeItem(key) {
    return new Promise((resolve, reject) => {
      try {
        this.storage.removeItem(`${this.storageName}${key}`);
        resolve();
      } catch(err) {
        reject(err);
      }
    })
  }

  clear() {
    return new Promise((resolve, reject) => {
      try {
        Object.keys(this.storage).forEach((item) => {
          if(item.includes(this.storageName)) {
            this.storage.removeItem(item);
          }
        });
        resolve();
      } catch(err) {
        reject(err);
      }
    })
  }

  length() {
    return new Promise((resolve, reject) => {
      try {
        let count = 0;
        Object.keys(this.storage).forEach((item) => {
          if(item.includes(this.storageName)) {
            count ++;
          }
        });
        resolve(count);
      } catch(err) {
        reject(err);
      }
    })
  }

  keys() {
    return new Promise((resolve, reject) => {
      try {
        let arr = [];
        Object.keys(this.storage).forEach((item) => {
          if(item.includes(this.storageName)) {
            const reg = RegExp(this.storageName, "g");
            arr.push(item.replace(reg, ''));
          }
        });
        resolve(arr);
      } catch(err) {
        reject(err);
      }
    })
  }

  entries() {
    return new Promise((resolve, reject) => {
      try {
        const obj = {};
        Object.entries(this.storage).forEach((item) => {
          if(item[0].includes(this.storageName)) {
            const reg = RegExp(this.storageName, "g");
            obj[item[0].replace(reg, '')] = JSON.parse(item[1]);
          }
        });
        resolve(obj);
      } catch(err) {
        reject(err);
      }
    })
  }
}

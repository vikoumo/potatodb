# potatodb

### API
**1.createInstance**
store.createInstance方法可以根据dbName，tableName建立出不同的对象进行后续的操作。
不同的数据库建立出来的实例不一样，同一个数据库不同的表格建立的实例也不一样
可以传三个参数，dbName是数据库名字，tableName是表名字，driver是使用indexDB还是localStorage，默认是根据浏览器支持设置的
```js
  const test1 = store.createInstance({
    dbName: 'test1',
    tableName: 'test1',
    driver: 'indexDB'
  })
  const test2 = store.createInstance({
    dbName: 'test1',
    tableName: 'test2',
    driver: 'indexDB'
  })
  const test3 = store.createInstance({
    dbName: 'test3',
    tableName: 'test3',
    driver: 'localStorage'
  })
```

**2.setItem**
createInstance出来后的实例可以调用setItem(key, value)，key, value可以在then中取到
```js
  test1.setItem('test1', 'test1').then(({ key, val }) => {
    console.log('set1', key, val);
  });
```

**3.getItem**
实例可以调用getItem(key)，key对应的value可以在then中取到
```js
  test1.getItem('test1').then((res) => {
    console.log('get1', res);
  });
```

**4.removeItem**
实例可以调用removeItem(key)，可以删除对应数据库对应表格下的对应数据
```js
  test1.removeItem('test1').then(() => {
    console.log('remove');
  });
```

**5.clear**
实例可以调用clear()，可以删除对应数据库对应表格下的全部数据
```js
  test1.clear().then(() => {
    console.log('clear');
  });
```

**6.length**
实例可以调用length()，then中取到对应数据库对应表格下的数据的个数
```js
  test1.length().then((res) => {
    console.log('length', res);
  });
```

**7.keys**
实例可以调用keys()，then中可以获取到实例中所有的键组成的数组
```js
  test1.keys().then((res) => {
    console.log('keys', res); // [key1, key2]
  });
```

**8.entries**
实例可以调用entries()，then中可以获取到实例中所有的键值对组成的对象
```js
  test1.entries().then((res) => {
    console.log('entries', res); // {key1: val1, key2: val2}
  });
```

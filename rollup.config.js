const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const { uglify } = require('rollup-plugin-uglify');

export default {
  input: 'index.js',
  output: [{
    file: 'dist/potatodb.esm.js',
    name: 'potatodb',
    format: 'esm'
  },{
    file: 'dist/potatodb.iife.js',
    name: 'potatodb',
    format: 'iife'
  }],
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
    })
  ]
}
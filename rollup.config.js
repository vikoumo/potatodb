const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
import rollupTypescript from 'rollup-plugin-typescript' 
const babel = require('rollup-plugin-babel');
const { uglify } = require('rollup-plugin-uglify');
import { DEFAULT_EXTENSIONS } from '@babel/core'

import typescript from "rollup-plugin-typescript";

const extentions = ['.js', '.ts'];

export default {
  input: 'index.js',
  output: [{
    file: 'dist/potatodb.esm.js',
    name: 'potatodb',
    format: 'esm',
  },{
    file: 'dist/potatodb.iife.js',
    name: 'potatodb',
    format: 'iife',
  }],
  plugins: [
    resolve(),
    commonjs(),
    rollupTypescript(),
    babel({
      exclude: "node_modules/**",
      extensions: [
        ...DEFAULT_EXTENSIONS,
        '.ts',
      ],
    }),
    // uglify()
  ]
}